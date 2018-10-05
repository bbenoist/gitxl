import mockFs from "mock-fs";
import winston from "winston";
import {
  BranchHelper,
  IBranchHelperConfig,
  IRemoteCollection,
  readConfig,
} from "./index";

beforeAll(async () => {
  // This also makes sure that the schema of the json-schema specification is
  // correctly loaded by ajv before mocking the filesystem.
  // This issue comes from the fact that jest uses its own module resolution
  // algorithm whose fs calls are also mocked by mockfs :-/
  await readConfig();
  // Prevent winston to display multiple errors:
  //  "[winston] Attempt to write logs with no transports"
  winston.configure({ silent: true });
});

interface IGitMockData {
  remotes: IRemoteCollection;
}

interface IExpectedGitMockData extends IGitMockData {
  history: string[];
}

interface IMockConfig {
  fs: mockFs.Config;
  git?: IGitMockData;
}

interface IExpected {
  error?: string;
  config?: IBranchHelperConfig;
  git?: IExpectedGitMockData;
}

interface ITestCase {
  mock: IMockConfig;
  expected: IExpected;
}

function remotesToSimpleGit(remotes: IRemoteCollection) {
  return Object.keys(remotes).map(key => {
    const url = remotes[key];
    return { name: key, refs: { fetch: url, push: url } };
  });
}

async function runTestCase(testCase: ITestCase) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const simplegit = require("simple-git/promise");
  if (testCase.mock.git) {
    simplegit.remotes = remotesToSimpleGit(testCase.mock.git.remotes);
  }

  mockFs(testCase.mock.fs);
  let errStr;
  let config;
  try {
    config = await readConfig();
  } catch (error) {
    errStr = `${error}`;
  }
  expect(errStr).toEqual(testCase.expected.error);
  expect(config).toEqual(testCase.expected.config);
  mockFs.restore();

  if (config) {
    const helper = new BranchHelper(config as IBranchHelperConfig);
    await helper.applyMerge();
    const expectedGit = testCase.expected.git as IExpectedGitMockData;
    expect(simplegit.remotes).toEqual(remotesToSimpleGit(expectedGit.remotes));
    expect(simplegit.getHistory()).toEqual(expectedGit.history);
  }
}

afterEach(() => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const simplegit = require("simple-git/promise");
  simplegit.restore();
});

const testCases: ITestCase[] = [
  {
    mock: { fs: { ".gitxlrc.json": "" } },
    expected: {
      error: "Error: Configuration file is missing or invalid.",
    },
  },
  {
    mock: { fs: { ".gitxlrc.json": "{}" } },
    expected: {
      config: {
        remotes: undefined,
        branches: undefined,
      },
      git: {
        remotes: {},
        history: ["git remote"],
      },
    },
  },
  {
    mock: {
      fs: {
        ".gitxlrc.yml": `remotes:
  scaffold: git@github.com:bbenoist/scaffold.git
  foo: git@foobar:repo.git
branches:
  master:
    track: origin/master
    merge:
      - template/common
  template/js/common:
    track: origin/template/js/common
    merge:
      - template/common
  template/ts/common:
      track: origin/template/ts/common
      merge:
        - template/js/common`,
      },
      git: {
        remotes: {
          foo: "bar",
        },
      },
    },
    expected: {
      config: {
        remotes: {
          scaffold: "git@github.com:bbenoist/scaffold.git",
          foo: "git@foobar:repo.git",
        },
        branches: {
          master: {
            track: "origin/master",
            merge: ["template/common"],
          },
          "template/js/common": {
            track: "origin/template/js/common",
            merge: ["template/common"],
          },
          "template/ts/common": {
            track: "origin/template/ts/common",
            merge: ["template/js/common"],
          },
        },
      },
      git: {
        remotes: {
          scaffold: "git@github.com:bbenoist/scaffold.git",
          foo: "git@foobar:repo.git",
        },
        history: [
          "git remote",
          "git remote add scaffold git@github.com:bbenoist/scaffold.git",
          "git remote remove foo",
          "git remote add foo git@foobar:repo.git",
          "git fetch scaffold foo",
          "git checkout master",
          "git merge template/common",
          "git checkout template/js/common",
          "git merge template/common",
          "git checkout template/ts/common",
          "git merge template/js/common",
        ],
      },
    },
  },
];

test.each(testCases)("%j", runTestCase);

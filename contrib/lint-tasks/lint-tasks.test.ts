import { lintTasks, packageJsonFile, tasksJsonFile } from "./lint-tasks";

import * as mockFs from "mock-fs";

test.each([
  [
    { "package.json": "{}" },
    `Error: Missing scripts property in ${packageJsonFile}`,
  ],
  [
    {
      ".vscode": { "tasks.json": "{}" },
      "package.json": '{"scripts": {}}',
    },
    `Error: Missing tasks property in ${tasksJsonFile}`,
  ],
  [
    {
      ".vscode": { "tasks.json": '{"tasks": []}' },
      "package.json": `{
        "scripts": {
          "foo": "bar"
        }
      }`,
    },
    `Error: ${packageJsonFile} script foo is missing in the tasks property of ${tasksJsonFile}`,
  ],
  [
    {
      ".vscode": {
        "tasks.json": `{
          "tasks": [
            {
              "script": "foo"
            }
          ],
        }`,
      },
      "package.json": `{
        "scripts": {
          "foo": "bar"
        }
      }`,
    },
    `Error: ${packageJsonFile} script foo is missing in the tasks property of ${tasksJsonFile}`,
  ],
  [
    {
      ".vscode": {
        "tasks.json": `{
          "tasks": [
            {
              "type": "npm",
              "script": "foo",
            }
          ],
        }`,
      },
      "package.json": `{
        "scripts": {
          "foo": "bar"
        }
      }`,
    },
    `Error: ${tasksJsonFile} task for script foo is missing a label property`,
  ],
  [
    {
      ".vscode": {
        "tasks.json": `{
          "tasks": [
            {
              "type": "npm",
              "script": "foo",
              "label": "Foo",
            }
          ],
        }`,
      },
      "package.json": `{
        "scripts": {
          "foo": "bar"
        }
      }`,
    },
    `Error: ${tasksJsonFile} task for script foo is missing a problemMatcher property`,
  ],
  [
    {
      ".vscode": {
        "tasks.json": `{
          "tasks": [
            {
              "type": "npm",
              "script": "foo",
              "label": "Foo",
              "problemMatcher": []
            }
          ],
        }`,
      },
      "package.json": `{
        "scripts": {
          "foo": "bar"
        }
      }`,
    },
    undefined,
  ],
])("%j", (fs, error) => {
  mockFs(fs);
  let errStr;
  try {
    lintTasks();
  } catch (err) {
    errStr = `${err}`;
  }
  expect(errStr).toBe(error);
  mockFs.restore();
});

import mockFs from "mock-fs";
import * as lintJson from "./lint-json";

test.each([
  [
    { "file.json": "" },
    "file.json - SyntaxError: Unexpected end of JSON input",
  ],
  [
    { ".vscode": { "file.json": "" } },
    ".vscode/file.json - SyntaxError: JSON5: invalid end of input at 1:1",
  ],
  [{ "file.json - file.json": "{}" }, undefined],
  [{ ".vscode": { "file.json": "{}" } }, undefined],
  [
    {
      ".vscode": {
        "file.json": `
          // Some comment
          {
            "foo": "bar",
          }`,
      },
    },
    undefined,
  ],
  [
    {
      "file.json": `
      // Some comment
      {
        "foo": "bar",
      }`,
    },
    "file.json - SyntaxError: Unexpected token / in JSON at position 7",
  ],
  [
    {
      ".vscode": {
        "file.json": `
          // Some comment
          {
            "foo": "bar",
          }}`,
      },
    },
    ".vscode/file.json - SyntaxError: JSON5: invalid character '}' at 5:12",
  ],
])("%j", (fs: any, error: string) => {
  mockFs(fs);
  let errStr;
  const isOk = lintJson.lintAllJsonFiles(err => {
    errStr = `${err}`;
  });
  expect(isOk).toBe(errStr === undefined);
  expect(errStr).toBe(error);
  mockFs.restore();
});

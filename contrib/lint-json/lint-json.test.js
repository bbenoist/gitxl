import lintJson from "./lint-json";

test.each([
  ["", "SyntaxError: Unexpected end of JSON input",
    "SyntaxError: JSON5: invalid end of input at 1:1"],
  ["{}", undefined, undefined],
  [`// Some comment
    {
      "foo": "bar",
    }`, "SyntaxError: Unexpected token / in JSON at position 0", undefined],
  [`// Some comment
    {
      "foo": "bar",
    }}`, "SyntaxError: Unexpected token / in JSON at position 0",
  "SyntaxError: JSON5: invalid character '}' at 4:6"],
])("%j", (json, expectedError, expectedErrorExt) => {
  function testLintJson(isExtended, expectedErr) {
    let error;
    expect(lintJson.lintJson(json, isExtended, (err) => { error = err; }))
      .toBe(expectedErr === undefined);
    expect(error).toBe(expectedErr);
  }
  testLintJson(false, expectedError);
  testLintJson(true, expectedErrorExt);
});

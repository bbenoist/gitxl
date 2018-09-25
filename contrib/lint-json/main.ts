import * as glob from "glob";
import * as lintJson from "./lint-json";

function main(): number {
  // tslint:disable-next-line:no-console
  return lintJson.lintAllJsonFiles(console.error) ? 0 : 1;
}

process.exit(main());

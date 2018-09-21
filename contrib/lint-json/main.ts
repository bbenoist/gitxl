import * as glob from "glob";
import * as lintJson from "./lint-json";

function main(): number {
  const files: string[] = glob.sync("**/*.json", lintJson.globOptions);
  // tslint:disable-next-line:no-console
  return lintJson.lintJsonFiles(files, console.error) ? 0 : 1;
}

process.exit(main());

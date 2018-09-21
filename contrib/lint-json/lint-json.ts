import { readFileSync } from "fs";
import * as glob from "glob";
import * as json5 from "json5";

export const ignored = ["node_modules/**", "build/**"];

export const extendedJson = [".vscode/**"];

export const globOptions = {
  dot: true,
  ignore: ignored,
};

export function parseJson(content: string, isExtended: boolean): any {
  return (isExtended ? json5.parse : JSON.parse)(content);
}

export function lintJson(
  content: string,
  isExtended: boolean,
  onError: (error: string) => void,
): boolean {
  try {
    parseJson(content, isExtended);
  } catch (exception) {
    onError(exception.toString());
    return false;
  }
  return true;
}

export function lintJsonFile(
  file: string,
  isExtended: boolean,
  onError: (error: string) => void,
): boolean {
  const content = readFileSync(file);
  const errCallback = (error: string) => onError(`${file} - ${error}`);
  return lintJson(content.toString(), isExtended, errCallback);
}

export function lintJsonFiles(
  files: string[],
  onError: (error: string) => void,
): boolean {
  const extendedFiles = ([] as string[]).concat(
    ...extendedJson.map((pattern) => glob.sync(pattern, globOptions)),
  );
  return !files
    .map((file) => {
      const isExtended = extendedFiles.includes(file);
      return lintJsonFile(file, isExtended, onError);
    })
    .includes(false);
}

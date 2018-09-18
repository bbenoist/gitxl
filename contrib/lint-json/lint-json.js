import glob from 'glob';
import json5 from 'json5';
import { readFileSync } from 'fs';

const ignored = [
  'node_modules/**',
  'build/**',
];

const extendedJson = [
  '.vscode/**',
];

const globOptions = {
  ignore: ignored,
  dot: true,
};

function parseJson(content, isExtended) {
  return (isExtended ? json5.parse : JSON.parse)(content);
}

function lintJson(content, isExtended, onError) {
  try {
    parseJson(content, isExtended);
  } catch (exception) {
    onError(exception.toString());
    return false;
  }
  return true;
}

function lintJsonFile(file, isExtended, onError) {
  const content = readFileSync(file);
  const errCallback = error => onError(`${file} - ${error}`);
  return lintJson(content, isExtended, errCallback);
}

function lintJsonFiles(files, onError) {
  const extendedFiles = [].concat(...extendedJson.map(pattern => glob.sync(pattern, globOptions)));
  return !files.map((file) => {
    const isExtended = extendedFiles.includes(file);
    return lintJsonFile(file, isExtended, onError);
  }).includes(false);
}

module.exports = {
  ignored,
  extendedJson,
  globOptions,
  parseJson,
  lintJson,
  lintJsonFile,
  lintJsonFiles,
};

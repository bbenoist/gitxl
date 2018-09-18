import glob from 'glob';
import lintJson from './lint-json';

function main() {
  const files = glob.sync('**/*.json', lintJson.globOptions);
  // eslint-disable-next-line no-console
  return lintJson.lintJsonFiles(files, console.error) ? 0 : 1;
}

process.exit(main());

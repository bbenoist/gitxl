import * as glob from "glob";
import { lintTasks } from "./lint-tasks";

function main(): number {
  try {
    lintTasks();
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(error);
    return 1;
  }
  return 0;
}

process.exit(main());

import { readFileSync } from "fs";
import * as json5 from "json5";
import * as path from "path";

export const packageJsonFile = "package.json";
export const tasksJsonFile = path.join(".vscode", "tasks.json");

function readPackageJson() {
  const data = readFileSync(packageJsonFile).toString();
  return JSON.parse(data);
}

function readTasksJson() {
  const data = readFileSync(tasksJsonFile).toString();
  return json5.parse(data);
}

function getScripts() {
  const packageData = readPackageJson();
  if (!packageData.scripts) {
    throw new Error(`Missing scripts property in ${packageJsonFile}`);
  }
  return Object.keys(packageData.scripts);
}

function getTasks() {
  const tasksData = readTasksJson();
  if (!tasksData.tasks) {
    throw new Error(`Missing tasks property in ${tasksJsonFile}`);
  }
  return tasksData.tasks as any[];
}

export function lintTasks() {
  const scripts = getScripts();
  const tasks = getTasks();
  scripts.forEach(script => {
    const task = tasks.find(t => t.type === "npm" && t.script === script);
    if (!task) {
      throw new Error(
        `${packageJsonFile} script ${script} is missing in the tasks property of ${tasksJsonFile}`
      );
    }
    if (!task.label) {
      throw new Error(
        `${tasksJsonFile} task for script ${script} is missing a label property`
      );
    }
    if (!task.problemMatcher) {
      throw new Error(
        `${tasksJsonFile} task for script ${script} is missing a problemMatcher property`
      );
    }
  });
}

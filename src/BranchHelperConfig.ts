import Ajv from "ajv";
import camelCaseKeys from "camelcase-keys";
import cosmiconfig from "cosmiconfig";
import { EOL } from "os";

export interface IRemoteCollection {
  [key: string]: string;
}

export interface IBranch {
  track?: string;
  merge?: string[];
}

export interface IBranchCollection {
  [key: string]: IBranch;
}

export interface IBranchHelperConfig {
  remotes?: IRemoteCollection;
  branches?: IBranchCollection;
  depends?: string[];
}

function formatAjvError(error: Ajv.ErrorObject) {
  const prefix = error.dataPath.length > 0 ? `${error.dataPath}: ` : "";
  const message = error.message ? error.message : "Unknown error.";
  return `${prefix}${message}`;
}

function formatAjvErrors(errors: Ajv.ErrorObject[] | null | undefined) {
  if (!errors) {
    throw new Error(
      "An unknown error occurred while validating configuration file."
    );
  }
  return errors.map(formatAjvError).join(EOL);
}

async function validateConfig(config: any) {
  const ajv = new Ajv();
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const configSchema = require("./config.schema.json");
  const validate = ajv.compile(configSchema);
  const ok = await validate(config);
  if (!ok) {
    throw new Error(formatAjvErrors(validate.errors));
  }
}

async function findConfig() {
  const result = await cosmiconfig("gitxl").search();
  if (!result || result.isEmpty || !result.config) {
    throw new Error("Configuration file is missing or invalid.");
  }
  return result.config;
}

export async function readConfig() {
  const config = await findConfig();
  await validateConfig(config);
  return camelCaseKeys(config) as IBranchHelperConfig;
}

import {
  CommandLineAction,
  CommandLineStringParameter,
  ICommandLineActionOptions,
} from "@microsoft/ts-command-line";
import { BranchHelper, readConfig } from "./index";

export abstract class BranchHelperAction extends CommandLineAction {
  protected helper!: BranchHelper;

  private configFile!: CommandLineStringParameter;

  protected constructor(options: ICommandLineActionOptions) {
    super(options);
  }

  protected onDefineParameters(): void {
    this.configFile = this.defineStringParameter({
      parameterLongName: "--config",
      parameterShortName: "-c",
      argumentName: "CONFIG",
      description:
        "Specify a configuration file to load instead of searching for it.",
    });
  }

  protected async onExecute(): Promise<void> {
    const config = await readConfig();
    this.helper = new BranchHelper(config);
  }
}

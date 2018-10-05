import { CommandLineAction } from "@microsoft/ts-command-line";
import logger from "winston";

export class VersionAction extends CommandLineAction {
  private version: string;

  public constructor(version: string) {
    const summary = "Print the application version and exit.";
    super({
      actionName: "version",
      summary,
      documentation: summary,
    });
    this.version = version;
  }

  protected onDefineParameters(): void {
    // No parameters.
  }

  protected async onExecute(): Promise<void> {
    logger.info(this.version);
  }
}

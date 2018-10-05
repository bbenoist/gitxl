import {
  CommandLineAction,
  CommandLineFlagParameter,
  CommandLineParameter,
  CommandLineParameterWithArgument,
  CommandLineStringParameter,
} from "@microsoft/ts-command-line";
import fs from "fs";
import { EOL } from "os";
import logger from "winston";
import { App } from "./App";

// Important note: @microsoft/ts-command-line requires the use of actions
// and does not seems to support positional arguments.
// As such, this generators has been simplified and does not supports extra
// argparse use cases.
export class GenerateMarkdownHelpAction extends CommandLineAction {
  private outFile!: CommandLineStringParameter;
  private app: App;

  public constructor(app: App) {
    super({
      actionName: "help-md",
      summary: "Generates help in a Markdown file",
      documentation: [
        "This action generates a Markdown documentation of the full",
        " command-line usage at the specified location.",
      ].join(" "),
    });
    this.app = app;
  }

  protected onDefineParameters(): void {
    this.outFile = this.defineStringParameter({
      description: "Output Markdown file.",
      parameterLongName: "--out",
      parameterShortName: "-o",
      argumentName: "FILE",
      required: true,
    });
  }

  protected async onExecute(): Promise<void> {
    logger.verbose("Generating command-line Markdown documentation...");
    const params = this.app.parameters.concat(
      new CommandLineFlagParameter({
        parameterShortName: "-h",
        parameterLongName: "--help",
        description: "Show command-line help and exit.",
      })
    );
    const lines: string[] = [
      `# ${App.parserOptions.toolFilename} - Command-Line Interface Documentation`,
      "",
      App.parserOptions.toolDescription,
      "",
      "## Usage",
      "",
      ...this.generateUsage(params, App.parserOptions.toolFilename, [
        "<command>",
        "...",
      ]),
      "",
      "## Arguments",
      "",
      ...this.generateArgumentList(params),
      "",
      "## Commands",
      "",
      ...this.generateCommandList(),
    ];
    logger.verbose(`Writing file ${this.outFile.value}...`);
    fs.writeFileSync(this.outFile.value as string, lines.join(EOL));
    logger.info(
      `Successfully written Markdown help file at location ${this.outFile.value}.`
    );
  }

  private generateUsage(
    params: CommandLineParameter[],
    command: string,
    extraArgs: string[] = []
  ) {
    logger.verbose(`Generating usage for command ${command}...`);
    const appArgs = params.map(p =>
      [
        p.required ? "" : "[",
        p.shortName ? p.shortName : p.longName,
        p instanceof CommandLineParameterWithArgument
          ? " " + (p as CommandLineParameterWithArgument).argumentName
          : "",
        p.required ? "" : "]",
      ].join("")
    );
    return [
      "```text",
      [command].concat(...appArgs, ...extraArgs).join(" "),
      "```",
    ];
  }

  private formatParameter(param: CommandLineParameter) {
    const shortName = param.shortName ? `\`${param.shortName}\`, ` : "";
    const required = param.required ? " (_Required_)" : "";
    return `* ${shortName}\`${param.longName}\` - ${param.description}${required}`;
  }

  private formatAndSortParameters(params: CommandLineParameter[]) {
    const sortedNames = params.map(p => p.longName).sort();
    return sortedNames
      .map(name => {
        return params.find(p => p.longName === name) as CommandLineParameter;
      })
      .map(this.formatParameter);
  }

  private generateArgumentList(params: CommandLineParameter[]) {
    return this.formatAndSortParameters(params.filter(p => p.required)).concat(
      this.formatAndSortParameters(params.filter(p => !p.required))
    );
  }

  private generateCommandList() {
    const sortedActions = this.app.actions
      .map(action => action.actionName)
      .sort()
      .map(
        name =>
          this.app.actions.find(
            action => action.actionName === name
          ) as CommandLineAction
      );
    return [].concat(
      sortedActions.map(
        cmd => `* [${cmd.actionName}](#${cmd.actionName})`
      ) as any,
      [""] as any,
      ...(sortedActions.map(cmd => {
        logger.verbose(
          `Generating Markdown documentation for command ${cmd.actionName}...`
        );
        const params = cmd.parameters.concat(
          new CommandLineFlagParameter({
            parameterShortName: "-h",
            parameterLongName: "--help",
            description: "Show command-line help for this action and exit",
          })
        );
        return [
          `### <a id="${cmd.actionName}"></a> ${cmd.actionName}`,
          "",
          cmd.summary,
          "",
          "#### Usage",
          "",
          ...this.generateUsage(
            params,
            `${App.parserOptions.toolFilename} ${cmd.actionName}`
          ),
          "",
          "#### Details",
          "",
          cmd.documentation,
          "",
          "#### Arguments",
          "",
          ...this.generateArgumentList(params),
          "",
        ];
      }) as any[])
    );
  }
}

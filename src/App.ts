import {
  CommandLineFlagParameter,
  CommandLineParser,
  CommandLineStringParameter,
  ICommandLineParserOptions,
} from "@microsoft/ts-command-line";
import readPkgUp from "read-pkg-up";
import winston from "winston";
import { ApplyMergeAction } from "./ApplyMergeAction";
import { GenerateMarkdownHelpAction } from "./MarkdownHelpAction";
import { UpdateRemotesAction } from "./UpdateRemotesAction";
import { VersionAction } from "./VersionAction";
import { PullDependenciesAction } from "./PullDependenciesAction";

export class App extends CommandLineParser {
  // Small workaround since the corresponding properties are undefined when
  // calling GenerateMarkdownHelpAction.onExecute().
  public static parserOptions: ICommandLineParserOptions;

  private verbose!: CommandLineFlagParameter;

  private silent!: CommandLineFlagParameter;

  private logFile!: CommandLineStringParameter;

  public constructor() {
    const pkg = readPkgUp.sync({ cwd: __dirname }).pkg;
    App.parserOptions = {
      toolFilename: "gitxl",
      toolDescription: pkg.description as string,
    };
    super(App.parserOptions);
    [
      new VersionAction(pkg.version),
      new GenerateMarkdownHelpAction(this),
      new UpdateRemotesAction(),
      new ApplyMergeAction(),
      new PullDependenciesAction(),
    ].forEach(this.addAction.bind(this));
  }

  protected onDefineParameters(): void {
    this.verbose = this.defineFlagParameter({
      parameterLongName: "--verbose",
      parameterShortName: "-v",
      description: "Show extra logging detail.",
    });
    this.silent = this.defineFlagParameter({
      parameterLongName: "--silent",
      parameterShortName: "-s",
      description: "Do not output log to console.",
    });
    this.logFile = this.defineStringParameter({
      parameterLongName: "--log",
      parameterShortName: "-l",
      argumentName: "LOG",
      description: "Write verbose log file.",
    });
  }

  protected async onExecute(): Promise<void> {
    const logLevel = this.verbose.value
      ? "verbose"
      : this.silent.value
      ? "warning"
      : "info";
    winston.remove(winston.transports.Console);
    winston.add(
      new winston.transports.Console({
        // Disable `<level>:` prefixes on console output.
        format: winston.format.printf(info => `${info.message}`),
        level: logLevel,
        silent: this.silent.value,
        handleExceptions: true,
      })
    );
    if (this.logFile.value) {
      winston.add(
        new winston.transports.File({
          filename: this.logFile.value,
          format: winston.format.printf(info => {
            const timestamp = new Date().toLocaleString();
            return `[${timestamp}][${info.level}] ${info.message}`;
          }),
          level: "verbose",
          handleExceptions: true,
        })
      );
    }
    try {
      await super.onExecute();
    } catch (error) {
      winston.error(`${error}`);
    }
  }
}

import { BranchHelperAction } from "./BranchHelperAction";
import { CommandLineFlagParameter } from "@microsoft/ts-command-line";

export class PullDependenciesAction extends BranchHelperAction {
  private allowUnrelatedHistories!: CommandLineFlagParameter;

  constructor() {
    super({
      actionName: "pull",
      summary: "Fetch then Merge the list of Git dependencies.",
      documentation: [
        "This action merges the Git branch dependencies listed in the",
        "configuration file into HEAD.",
      ].join(" "),
    });
  }

  protected onDefineParameters(): void {
    super.onDefineParameters();
    this.allowUnrelatedHistories = this.defineFlagParameter({
      parameterLongName: "--allow-unrelated-histories",
      description: [
        "By default, git merge command refuses to merge histories that do not",
        "share a common ancestor. This option can be used to override this",
        "safety when merging histories of two projects that started their",
        "lives independently. As that is a very rare occasion, no",
        "configuration variable to enable this by default exists and will not",
        "be added.",
      ].join(" "),
    });
  }

  protected async onExecute(): Promise<void> {
    await super.onExecute();
    await this.helper.pullDependencies(this.allowUnrelatedHistories.value);
  }
}

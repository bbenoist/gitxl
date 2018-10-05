import { BranchHelperAction } from "./BranchHelperAction";

export class ApplyMergeAction extends BranchHelperAction {
  public constructor() {
    super({
      actionName: "apply-merge",
      summary: "Applies the list of branch merge.",
      documentation: [
        "Merge every dependency of each branch specified in the configuration",
        "file.",
      ].join(" "),
    });
  }

  protected async onExecute(): Promise<void> {
    await super.onExecute();
    await this.helper.applyMerge();
  }
}

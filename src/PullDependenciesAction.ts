import { BranchHelperAction } from "./BranchHelperAction";

export class PullDependenciesAction extends BranchHelperAction {
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

  protected async onExecute(): Promise<void> {
    await super.onExecute();
    await this.helper.pullDependencies();
  }
}

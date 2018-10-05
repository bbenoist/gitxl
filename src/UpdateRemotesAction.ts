import { BranchHelperAction } from "./BranchHelperAction";

export class UpdateRemotesAction extends BranchHelperAction {
  public constructor() {
    super({
      actionName: "update-remotes",
      summary: "Updates the list of Git remotes.",
      documentation: [
        "This action ensures that the Git remotes listed in the configuration",
        "are correctly defined in the current local Git repository.",
      ].join(" "),
    });
  }

  protected async onExecute(): Promise<void> {
    await super.onExecute();
    await this.helper.updateRemotes();
  }
}

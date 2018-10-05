/* eslint-disable @typescript-eslint/no-unused-vars */
import simplegitBase from "simple-git/promise";
import simplegitResponseBase from "simple-git/typings/response";

function simplegit(basePath?: string): simplegitBase.SimpleGit {
  return new simplegit.SimpleGit();
}

namespace simplegit {
  export let remotes: simplegitResponseBase.RemoteWithRefs[] = [];

  let history: string[] = [];

  export function restore() {
    remotes = [];
    history = [];
  }

  export function getHistory(): ReadonlyArray<string> {
    return history;
  }

  function addHistory(
    gitAction: string,
    ...gitArgs: Array<string | undefined>
  ) {
    const args = gitArgs.filter(arg => arg !== undefined) as string[];
    history.push([`git ${gitAction}`].concat(args).join(" "));
  }

  export class SimpleGit implements simplegitBase.SimpleGit {
    private static findRemote(name: string) {
      return remotes.findIndex(remote => remote.name === name);
    }

    public add(files: string | string[]): Promise<void> {
      throw new Error("Method not implemented.");
    }

    public addAnnotatedTag(tagName: string, tagMessage: string): Promise<void> {
      throw new Error("Method not implemented.");
    }

    public addConfig(key: string, value: string): Promise<string> {
      throw new Error("Method not implemented.");
    }

    public async addRemote(
      remoteName: string,
      remoteRepo: string
    ): Promise<void> {
      addHistory("remote add", remoteName, remoteRepo);
      const value = {
        name: remoteName,
        refs: { fetch: remoteRepo, push: remoteRepo },
      };
      const index = SimpleGit.findRemote(remoteName);
      if (index > -1) {
        remotes[index] = value;
      } else {
        remotes.push(value);
      }
    }

    public addTag(name: string): Promise<string> {
      throw new Error("Method not implemented.");
    }

    public binaryCatFile(options: string[]): Promise<any> {
      throw new Error("Method not implemented.");
    }

    public branch(
      options: string[] | simplegitBase.Options
    ): Promise<simplegitBase.BranchSummary> {
      throw new Error("Method not implemented.");
    }

    public branchLocal(): Promise<simplegitBase.BranchSummary> {
      throw new Error("Method not implemented.");
    }

    public catFile(options: string[]): Promise<string> {
      throw new Error("Method not implemented.");
    }

    public checkIgnore(pathnames: string[] | string | any): Promise<string[]> {
      throw new Error("Method not implemented.");
    }

    public checkIsRepo(): Promise<boolean> {
      throw new Error("Method not implemented.");
    }

    public async checkout(what: string | string[]): Promise<void> {
      addHistory("checkout", what instanceof Array ? what.join(" ") : what);
    }

    public checkoutBranch(
      branchName: string,
      startPoint: string
    ): Promise<void> {
      throw new Error("Method not implemented.");
    }

    public checkoutLatestTag(
      branchName: string,
      startPoint: string
    ): Promise<void> {
      throw new Error("Method not implemented.");
    }

    public checkoutLocalBranch(branchName: string): Promise<void> {
      throw new Error("Method not implemented.");
    }

    public clean(
      mode: "d" | "f" | "i" | "n" | "q" | "x" | "X",
      options?: string[]
    ): Promise<string> {
      throw new Error("Method not implemented.");
    }

    public clearQueue(): this {
      throw new Error("Method not implemented.");
    }

    public clone(
      repoPath: string,
      localPath: string,
      options?: string[]
    ): Promise<string> {
      throw new Error("Method not implemented.");
    }

    public commit(
      message: string | string[],
      files?: string | string[],
      options?: {}
    ): Promise<simplegitBase.CommitSummary> {
      throw new Error("Method not implemented.");
    }

    public customBinary(command: string): this {
      throw new Error("Method not implemented.");
    }

    public cwd<path extends string>(workingDirectory: path): Promise<path> {
      throw new Error("Method not implemented.");
    }

    public deleteLocalBranch(
      branchName: string
    ): Promise<simplegitResponseBase.BranchDeletionSummary> {
      throw new Error("Method not implemented.");
    }

    public diff(options?: string[]): Promise<string> {
      throw new Error("Method not implemented.");
    }

    public diffSummary(options?: string[]): Promise<simplegitBase.DiffResult> {
      throw new Error("Method not implemented.");
    }

    public env(name: string, value: string): this;

    public env(env: object): this;

    public env(name: any, value?: any): this {
      throw new Error("Method not implemented.");
    }

    public async fetch(
      remote?: string | string[],
      branch?: string,
      options?: simplegitBase.Options
    ): Promise<simplegitBase.FetchResult> {
      const rems =
        remote instanceof Array ? (remote as string[]) : [remote as string];
      addHistory("fetch", ...rems, branch);
      return {
        branches: [],
        raw: "",
        remote: "",
        tags: [],
      };
    }

    public getRemotes(
      verbose: false
    ): Promise<simplegitResponseBase.RemoteWithoutRefs[]>;

    public getRemotes(
      verbose: true
    ): Promise<simplegitResponseBase.RemoteWithRefs[]>;

    public async getRemotes(
      verbose: any
    ): Promise<simplegitResponseBase.RemoteWithoutRefs[]> {
      addHistory("remote");
      return remotes;
    }

    public init(bare?: boolean): Promise<void> {
      throw new Error("Method not implemented.");
    }

    public listRemote(args: string[]): Promise<string> {
      throw new Error("Method not implemented.");
    }

    public log<T = simplegitResponseBase.DefaultLogFields>(
      options?: simplegitBase.LogOptions<T>
    ): Promise<simplegitResponseBase.ListLogSummary<T>> {
      throw new Error("Method not implemented.");
    }

    public async merge(
      options: string[] | simplegitBase.Options
    ): Promise<any> {
      const opts =
        options instanceof Array
          ? (options as string[])
          : Object.keys(options).map(key => `--${key} ${options[key]}`);
      addHistory("merge", ...opts);
    }

    public async mergeFromTo(
      from: string,
      to: string,
      options?: string[]
    ): Promise<string> {
      const args = [from, to].concat(options ? options : []);
      addHistory("merge", ...args);
      return "";
    }

    public mirror(repoPath: string, localPath: string): Promise<string> {
      throw new Error("Method not implemented.");
    }

    public mv(
      from: string | string[],
      to: string
    ): Promise<simplegitResponseBase.MoveSummary> {
      throw new Error("Method not implemented.");
    }

    public outputHandler(handler: void | simplegitBase.outputHandler): this {
      throw new Error("Method not implemented.");
    }

    public pull(
      remote?: string,
      branch?: string,
      options?: simplegitBase.Options
    ): Promise<simplegitBase.PullResult> {
      throw new Error("Method not implemented.");
    }

    public push(
      remote?: string,
      branch?: string,
      options?: simplegitBase.Options
    ): Promise<void> {
      throw new Error("Method not implemented.");
    }

    public pushTags(remote?: string): Promise<string> {
      throw new Error("Method not implemented.");
    }

    public raw(commands: string | string[]): Promise<string> {
      throw new Error("Method not implemented.");
    }

    public rebase(options?: {} | string[]): Promise<string> {
      throw new Error("Method not implemented.");
    }

    public remote(options: string[]): Promise<string | void> {
      throw new Error("Method not implemented.");
    }

    public async removeRemote(remote: string): Promise<void> {
      addHistory("remote remove", remote);
      const index = SimpleGit.findRemote(remote);
      if (index === -1) {
        throw new Error(`Mocked Git remote "${remote}" does not exists.`);
      }
      remotes.splice(index, 1);
    }

    public reset(
      mode?: "soft" | "mixed" | "hard" | "merge" | "keep"
    ): Promise<null>;

    public reset(commands?: string[]): Promise<void>;

    public reset(commands?: any): Promise<any> {
      throw new Error("Method not implemented.");
    }

    public revert(commit: string, options: {}): Promise<void> {
      throw new Error("Method not implemented.");
    }

    public revparse(options?: string[]): Promise<string> {
      throw new Error("Method not implemented.");
    }

    public rm(paths: string | string[]): Promise<void> {
      throw new Error("Method not implemented.");
    }

    public rmKeepLocal(paths: string | string[]): Promise<void> {
      throw new Error("Method not implemented.");
    }

    public show(options?: string[]): Promise<string> {
      throw new Error("Method not implemented.");
    }

    public silent(silence?: boolean): simplegitBase.SimpleGit {
      throw new Error("Method not implemented.");
    }

    public stash(options?: {} | any[]): Promise<string> {
      throw new Error("Method not implemented.");
    }

    public stashList(
      options?: {} | string[]
    ): Promise<
      simplegitResponseBase.ListLogSummary<
        simplegitResponseBase.DefaultLogFields
      >
    > {
      throw new Error("Method not implemented.");
    }

    public status(): Promise<simplegitBase.StatusResult> {
      throw new Error("Method not implemented.");
    }

    public subModule(options: string[]): Promise<string> {
      throw new Error("Method not implemented.");
    }

    public submoduleAdd(repo: string, path: string): Promise<void> {
      throw new Error("Method not implemented.");
    }

    public submoduleInit(options?: string[]): Promise<string> {
      throw new Error("Method not implemented.");
    }

    public submoduleUpdate(options?: string[]): Promise<string> {
      throw new Error("Method not implemented.");
    }

    public tag(options?: {} | string[]): Promise<string> {
      throw new Error("Method not implemented.");
    }

    public tags(
      options?: simplegitBase.Options
    ): Promise<simplegitBase.TagResult> {
      throw new Error("Method not implemented.");
    }

    public updateServerInfo(): Promise<string> {
      throw new Error("Method not implemented.");
    }
  }
}

module.exports = simplegit;

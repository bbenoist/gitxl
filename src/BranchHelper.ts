import simplegit from "simple-git/promise";
import toposort from "toposort";
import logger from "winston";
import {
  IBranchCollection,
  IBranchHelperConfig,
  IRemoteCollection,
} from "./BranchHelperConfig";

export class BranchHelper {
  private config: IBranchHelperConfig;
  private git: simplegit.SimpleGit;

  constructor(config: IBranchHelperConfig) {
    this.config = config;
    this.git = simplegit();
    try {
      this.git.silent(true);
    } catch {
      // simplegit fails with "Method not implemented" when running from jest.
    }
  }

  public async updateRemotes() {
    logger.verbose("Updating list of Git remotes...");
    const existing = await this.git.getRemotes(true);
    if (!this.config.remotes || Object.keys(this.config.remotes).length === 0) {
      return;
    }
    await Promise.all(
      Object.keys(this.config.remotes).map(async name => {
        const repo = (this.config.remotes as IRemoteCollection)[name];
        const found = existing.find(rem => rem.name === name);
        if (found) {
          if (found.refs.fetch === repo && found.refs.push === repo) {
            logger.verbose(`Git remote ${name} is up to date.`);
            return;
          }
          logger.verbose(`Removing Git remote ${name}...`);
          await this.git.removeRemote(name);
        }
        logger.verbose(`Adding Git remote ${name} with repository ${repo}...`);
        await this.git.addRemote(name, repo);
        logger.info(`Updated git remote ${name} with repository ${repo}.`);
      })
    );
  }

  public async pullDependencies() {
    await this.updateRemotes();
    await this.fetchAll();
    if (!this.config.depends || this.config.depends.length === 0) {
      logger.verbose("No dependency found. Exiting...");
      return;
    }
    await this.mergeDependencies(undefined, this.config.depends);
  }

  public async applyMerge() {
    await this.updateRemotes();
    await this.fetchAll();
    await this.mergeAll();
  }

  private sortBranchByDependency() {
    logger.verbose("Resolving branch dependencies...");
    if (!this.config.branches || this.config.branches.length === 0) {
      logger.verbose("No branch found in the configuration.");
      return [];
    }
    const branches: IBranchCollection = this.config.branches;
    const graph = Object.keys(this.config.branches)
      .filter(branch => branches[branch].merge)
      .map(branch => {
        const dependencies = branches[branch].merge;
        if (!dependencies) {
          return;
        } // This should never happen.
        return dependencies.map(dependency => {
          return [dependency, branch] as [string, string];
        });
      });
    const flattenedGraph = [].concat(...(graph as any[]));
    return toposort(flattenedGraph);
  }

  private async fetchAll() {
    if (!this.config.remotes || Object.keys(this.config.remotes).length === 0) {
      logger.verbose("No remotes found in the configuration.");
      return;
    }
    const remoteNames = Object.keys(this.config.remotes);
    if (remoteNames.length === 0) {
      logger.verbose("No Git remote to fetch.");
      return;
    }
    logger.verbose(`Fetching Git remotes ${remoteNames.join(", ")}...`);
    await this.git.fetch(remoteNames);
  }

  private async mergeDependencies(
    branch: string | undefined,
    dependencies: string[]
  ) {
    for (const dependency of dependencies) {
      if (branch !== undefined) {
        logger.verbose(`Checking out branch ${branch}...`);
        await this.git.checkout(branch);
      }
      logger.verbose(`Merging ${dependency}...`);
      await this.git.merge([dependency]);
      const branchTxt = branch === undefined ? "HEAD" : branch;
      logger.info(`Merged ${dependency} into ${branchTxt}.`);
    }
  }

  private async mergeAll() {
    if (!this.config.branches || this.config.branches.length === 0) {
      logger.verbose("No branch found in the configuration.");
      return;
    }
    const branchDependenciesKeys = Object.keys(this.config.branches);
    const branches = this.sortBranchByDependency().filter(branch =>
      branchDependenciesKeys.includes(branch)
    );
    for (const branch of branches) {
      const dependencies = this.config.branches[branch].merge;
      if (!dependencies || dependencies.length === 0) {
        logger.verbose(`Branch ${branch} has no dependency.`);
        continue;
      }
      await this.mergeDependencies(branch, dependencies);
    }
  }
}

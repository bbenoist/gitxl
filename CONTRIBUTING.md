# Contributing

When contributing to this repository, please first discuss the change you wish to make via issues before making a change.

## Recommended Tools

* [Visual Studio Code](https://code.visualstudio.com/) - A lightweight code editor.  
  The list of recommended VS Code extensions can be seen by opening the root directory of this repository in VS Code and entering the following command:

  ```text
  > Extensions: Show Recommended Extensions
  ```

## Developer Setup

Install [Node.js](https://nodejs.org/) then run `npm install` at the root of this repository to install the npm development dependencies.

## Git Workflow

We use the [Gitflow workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) to ensure a reliable and consistent branching model.

## Directory Structure

Please try to respect the following directories at the root of this repository:

* `build` - Build output
* `cache` - Cache files
* `conf` - Toolchains and configuration files.
* `doc` - Documentation and its resources. _`README.md` remains the main entry point._
* `ext` - External libraries and resources. _Please use alternatives (e.g. package manager, Git LFS, Git submodules, Git subtree) whenever possible._
* `log` - Log files
* `src` - Source code
* `test` - Tests
* `tmp` - Temporary files
* `**/res` - Resources (e.g. images)

When you have resources to regroup, create a `res` directory wherever its context makes sense.

## Style Guides

### Git Branches

* Use hyphens (`-`) to separate words instead of underscores (`_`).

* Try to prefix your Git branches according to these rules:
  * `feature/` - The branch adds a new feature.
  * `bugfix/` - The branch fixes a bug which is not yet deployed to production or not critical.
  * `hotfix/` - The branch fixes a critical bug already deployed to production.
  * `release/X.Y.Y` - The branch includes a new release.

### Git Commit Messages

We have very precise rules over how our git commit messages can be formatted.  
This leads to **more readable messages** that are easy to follow when looking through the **project history**.

#### Commit Message Format

Each commit message consists of a **header**, a **body** and a **footer**.  The header has a special format that includes a **type**, a **scope** and a **subject**:

```text
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message cannot be longer than 80 characters!
This allows the message to be easier to read on GitHub as well as in various git tools.

The footer should contain a [closing reference to an issue](https://docs.gitlab.com/ee/user/project/issues/automatic_issue_closing.html) if any.

Samples:

```text
docs(changelog): Update changelog to beta.5
```

```text
fix(release): Need to depend on latest rxjs and zone.js

The version in our package.json gets copied to the one we publish, and users need the latest of these.
```

#### Revert

If the commit reverts a previous commit, it should begin with `revert:`, followed by the header of the reverted commit.
In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

#### Type

Must be one of the following:

* **build**: Changes that affect the build system or external dependencies.
* **ci**: Changes to our CI configuration files and scripts.
* **doc**: Documentation only changes.
* **feat**: A new feature.
* **fix**: A bug fix.
* **perf**: A code change that improves performance.
* **refactor**: A code change that neither fixes a bug nor adds a feature.
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).
* **test**: Adding missing tests or correcting existing tests.

#### Scope

The scope should be the name of the file or module affected (as perceived by the person reading the changelog generated from commit messages.

#### Subject

The subject contains a succinct description of the change:

* Use the imperative, present tense: "change" not "changed" nor "changes".
* Don't capitalize the first letter.
* No dot (.) at the end.

#### Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

#### Footer

The footer should contain any information about **Breaking Changes** and is also the place to reference GitHub/GitLab issues that this commit **Closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.


**Important:** When only changing documentation, include `[skip ci]` in the commit title.

### Markdown

Markdown syntax is verified with [markdownlint](https://github.com/DavidAnson/markdownlint).

Most of the configuration is common sense but the following rules are important to notice:

* Markdown files have no column limit to ease the writing.
  When editing, make sure the _word wrap_ feature of your code editor is enabled so that you feel more confortable with it.

* Use asterisks for bullet point lists.

* Surround code blocks and titles by empty lines.

The markdownlint rules configuration for this repository can be seen at [`.markdownlint.json`](.markdownlint.json).
See [markdownlint rules](https://github.com/DavidAnson/markdownlint/blob/master/doc/Rules.md) for more details about each available rule.

### JSON

* Use 2 spaces for indentation.

* Use double quotes.

### YAML

* Use 2 spaces for indentation.

* When possible, use underscores `_` instead of hyphen `-` for key naming.

* Indent hyphen of lists by 2 spaces.  
  e.g.:
  Do:

  ```yaml
  list:
    - a
    - b
  ```

  Don't:

  ```yml
  list:
  - a
  - b
  ```

### JavaScript

Our JavaScript coding guidelines are verified with [eslint](https://eslint.org/) and based on [`airbnb/javascript`](https://github.com/airbnb/javascript) which we recommend reading before working on the JS code of this repository.

## Versioning

We use [Semantic Versioning](https://semver.org/) to track our releases in a consistent manner.

Given a version number `MAJOR.MINOR.PATCH`, increment the:

* MAJOR version when you make incompatible API changes,
* MINOR version when you add functionality in a backwards-compatible manner, and
* PATCH version when you make backwards-compatible bug fixes.

Additional labels for pre-release and build metadata are available as extensions to the `MAJOR.MINOR.PATCH` format.

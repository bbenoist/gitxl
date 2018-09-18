# Contributing

When contributing to this repository, please first discuss the change you wish to make via issues before making a change.

## Recommended Tools

* [Visual Studio Code](https://code.visualstudio.com/) - A lightweight code editor.  
  The following VS Code extensions are also recommended:
  * `editorconfig.editorconfig`
  * `davidanson.vscode-markdownlint`

## Git Workflow

We use the [Gitflow workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) to ensure a reliable and consistent branching model.

## Style Guides

### Git Branches

* Use hyphens (`-`) to separate words instead of underscores (`_`).

* Try to prefix your Git branches according to these rules:
  * `feature/` - The branch adds a new feature.
  * `bugfix/` - The branch fixes a bug which is not yet deployed to production or not critical.
  * `hotfix/` - The branch fixes a critical bug already deployed to production.
  * `release/X.Y.Y` - The branch includes a new release.

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature").
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...").
* Limit the first line to 72 characters or less.
* Reference issues and merge requests liberally after the first line.
* When only changing documentation, include `[skip ci]` in the commit title.

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

* When possible, use undescores `_` instead of hyphen `-` for key naming.

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

## Versioning

We use [Semantic Versioning](https://semver.org/) to track our releases in a consistent manner.

Given a version number `MAJOR.MINOR.PATCH`, increment the:

* MAJOR version when you make incompatible API changes,
* MINOR version when you add functionality in a backwards-compatible manner, and
* PATCH version when you make backwards-compatible bug fixes.

Additional labels for pre-release and build metadata are available as extensions to the `MAJOR.MINOR.PATCH` format.

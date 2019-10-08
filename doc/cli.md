# gitxl - Command-Line Interface Documentation

A handy tool to help working with Git repositories.

## Usage

```text
gitxl [-v] [-s] [-l LOG] [-h] <command> ...
```

## Arguments

* `-h`, `--help` - Show command-line help and exit.
* `-l`, `--log` - Write verbose log file.
* `-s`, `--silent` - Do not output log to console.
* `-v`, `--verbose` - Show extra logging detail.

## Commands

* [apply-merge](#apply-merge)
* [help-md](#help-md)
* [pull](#pull)
* [update-remotes](#update-remotes)
* [version](#version)

### <a id="apply-merge"></a> apply-merge

Applies the list of branch merge.

#### Usage

```text
gitxl apply-merge [-c CONFIG] [-h]
```

#### Details

Merge every dependency of each branch specified in the configuration file.

#### Arguments

* `-c`, `--config` - Specify a configuration file to load instead of searching for it.
* `-h`, `--help` - Show command-line help for this action and exit

### <a id="help-md"></a> help-md

Generates help in a Markdown file

#### Usage

```text
gitxl help-md -o FILE [-h]
```

#### Details

This action generates a Markdown documentation of the full  command-line usage at the specified location.

#### Arguments

* `-o`, `--out` - Output Markdown file. (_Required_)
* `-h`, `--help` - Show command-line help for this action and exit

### <a id="pull"></a> pull

Fetch then Merge the list of Git dependencies.

#### Usage

```text
gitxl pull [-c CONFIG] [--allow-unrelated-histories] [-h]
```

#### Details

This action merges the Git branch dependencies listed in the configuration file into HEAD.

#### Arguments

* `--allow-unrelated-histories` - By default, git merge command refuses to merge histories that do not share a common ancestor. This option can be used to override this safety when merging histories of two projects that started their lives independently. As that is a very rare occasion, no configuration variable to enable this by default exists and will not be added.
* `-c`, `--config` - Specify a configuration file to load instead of searching for it.
* `-h`, `--help` - Show command-line help for this action and exit

### <a id="update-remotes"></a> update-remotes

Updates the list of Git remotes.

#### Usage

```text
gitxl update-remotes [-c CONFIG] [-h]
```

#### Details

This action ensures that the Git remotes listed in the configuration are correctly defined in the current local Git repository.

#### Arguments

* `-c`, `--config` - Specify a configuration file to load instead of searching for it.
* `-h`, `--help` - Show command-line help for this action and exit

### <a id="version"></a> version

Print the application version and exit.

#### Usage

```text
gitxl version [-h]
```

#### Details

Print the application version and exit.

#### Arguments

* `-h`, `--help` - Show command-line help for this action and exit

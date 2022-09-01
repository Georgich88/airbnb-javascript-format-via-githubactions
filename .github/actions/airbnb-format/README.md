# Airbnb JavaScript Format Action

Automatically format your Java files using [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).

This action can format your files and push the changes, or just check the formatting without committing anything.

You must checkout your repository with `actions/checkout` before calling this action (see the example).

## Examples

Format all JavaScript files in the repository and commit the changes:

```yml
# Example workflow
name: Format

on:
  push:
    branches:
      - master

jobs:

  formatting:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2 # v2 minimum required
      - uses: ./.github/actions/airbnb-format
        with:
          args: "--fix"
          # Recommended if you use MacOS:
          # githubToken: ${{ secrets.GITHUB_TOKEN }}
```

Check if the formatting is correct without pushing anything:

```yml
# Example workflow
name: Format

on: [push, pull_request]

jobs:

  formatting:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2 # v2 minimum required
      - uses: ./.github/actions/airbnb-format
        with:
          args: ""
```

## Inputs

None of these inputs is required, but you can add them to change the behavior of this action.

### `githubToken`

**Recommended if you execute this action on MacOS**. Due to [this issue](https://github.com/actions/virtual-environments/issues/602), calling the GitHub API from a MacOS machine can result in an error because of a rate limit. To overcome this, provide the [`GITHUB_TOKEN`](https://docs.github.com/en/actions/configuring-and-managing-workflows/authenticating-with-the-github_token) to authenticate these calls. If you provide it, it will also be used to authenticate the commits made by this action.

### `skipCommit`

Set to `true` if you don't want the changes to be committed by this action. Default: `false`.

### `commitMessage`

You can specify a custom commit message. Default: `Airbnb JavaScript Format`.

### `args`

The arguments to pass to the Airbnb JavaScript Format executable.
By default, only `--fix` is used.
const core = require('@actions/core');
const exec = require('@actions/exec');

const githubToken = core.getInput('githubToken', {required: false});
const commitMessage = core.getInput('commitMessage', {required: false});

class ExecResult {
  constructor(exitCode, stdOut, stdErr) {
    this.exitCode = exitCode;
    this.stdOut = stdOut;
    this.stdErr = stdErr;
  }
}

async function executeEslintFix(args = []) {
  const arguments = [];
  arguments.push(...args);
  const options = {
    cwd: process.env.GITHUB_WORKSPACE,
    ignoreReturnCode: true
  }
  const exitCode = await exec.exec('npm run lint:eslint', arguments, options);
  if (exitCode !== 0) {
    throw `Airbnb JS Format failed with exit code ${ exitCode }`;
  }
}

async function execute(command, {silent = false, ignoreReturnCode = false} = {}) {
  let stdErr = '';
  let stdOut = '';
  const options = {
    silent: silent,
    ignoreReturnCode: true,
    listeners: {
      stdout: (data) => stdOut += data.toString(),
      stderr: (data) => stdErr += data.toString(),
    }
  };
  core.debug(`Executing: ${ command }`);
  const exitCode = await exec.exec(command, null, options);
  core.debug(`Exit code: ${ exitCode }`);
  if (!ignoreReturnCode && exitCode !== 0) {
    command = command.split(' ')[0];
    throw `The command '${ command }' failed with exit code ${ exitCode }`;
  }
  return new ExecResult(exitCode, stdOut, stdErr);
}

async function push() {
  if (!githubToken) await execute('git push');
  else {
    const env = process.env;
    const remote = `https://${ env.GITHUB_ACTOR }:${ githubToken }@github.com/${ env.GITHUB_REPOSITORY }.git`;
    await execute(`git push ${ remote }`);
  }
}

async function run() {
  try {
    // Execute Airbnb JS Format with provided arguments
    const args = core.getInput('args').split(' ');
    await executeEslintFix(args);

    // Commit changed files if there are any and if skipCommit != true
    if (core.getInput('skipCommit').toLowerCase() !== 'true') {
      await core.group('Committing changes', async () => {
        await execute('git config user.name github-actions', {silent: true});
        await execute("git config user.email ''", {silent: true});
        const diffIndex = await execute('git diff-index --quiet HEAD', {ignoreReturnCode: true, silent: true});
        if (diffIndex.exitCode !== 0) {
          await execute(`git commit --all -m "${ commitMessage ? commitMessage : 'Airbnb JS Format' }"`);
          await push();
        } else core.info('Nothing to commit!')
      });
    }
  } catch (message) {
    core.setFailed(message);
  }
}

run().then(r => core.info('Running is finished'))
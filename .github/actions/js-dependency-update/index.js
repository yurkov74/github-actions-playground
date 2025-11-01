const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
  /*
  1. Parse inputs:
    - base-branch from which to check for updates
    - target branch to use to create a PR with updates
    - Github token for authentication purposes (to create PRs)
    - Working directory where package.json and package-lock.json/yarn.lock are located
  2. Execute 'npm update' within the working directory
    For real action we would use 'npx npm-check-updates' to update package.json first, then 'npm install' to update package-lock.json
  3. If package*.json file was not modified, exit. Else
    - Add commit to the target branch
    - Create a PR to the base branch from the target branch using octokit API
  */
  core.info('I am a custom JS action');

  // 1 Parse inputs
  const baseBranch = core.getInput('base-branch') || 'main';
  const targetBranch = core.getInput('target-branch') || 'dependency-updates';
  const ghToken = core.getInput('ghToken');
  const workingDirectory = core.getInput('working-directory') || '.';
  const DEBUG = core.getBooleanInput('debug') || false;

  // validate inputs

  // Branch names should contain only letters, digits, underscores, hyphens, dots, and forward slashes
  const branchNamePattern = /^[a-zA-Z0-9_.-]+$/;

  if (!branchNamePattern.test(baseBranch)) {
    core.setFailed(`Invalid base branch name: ${baseBranch}`);
    return;
  }

  if (!branchNamePattern.test(targetBranch)) {
    core.setFailed(`Invalid target branch name: ${targetBranch}`);
    return;
  }

  // Directory paths should contain only letters, digits, underscores, hyphens, and forward slashes
  const directoryPathPattern = /^[a-zA-Z0-9_./-]+$/;

  if (!directoryPathPattern.test(workingDirectory)) {
    core.setFailed(`Invalid working directory path: ${workingDirectory}`);
    return;
  }

  core.info(`Base branch: ${baseBranch}`);
  core.info(`Target branch: ${targetBranch}`);
  core.info(`Working directory: ${workingDirectory}`);

  // 2. Execute 'npm update' within the working directory

  await exec.exec('npm', ['update'], { cwd: workingDirectory });

  // 3. Check if there are changes
  let gitStatusOutput = exec.getExecOutput('git', ['status', '--porcelain'], { cwd: workingDirectory });

  if (await gitStatusOutput) {
    // There are changes, proceed with the next steps
    core.info('Dependency updates found. Proceeding to create a pull request...');
  } else {
    core.info('No dependency updates found. Exiting.');
    return;
  }

}

run();

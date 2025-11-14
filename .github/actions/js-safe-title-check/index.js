const core = require("@actions/core")

async function run() {
  // 1. Parse inputs

  const prTitle = core.getInput("pr-title", { required: true }) || "";

  if (!prTitle) {
    const msg = "PR title is empty!";
    core.error(msg);
    core.setFailed(msg);
  } else {
    core.info(`PR title: ${prTitle}`);
  }

  // 2. Print PR is a feature if the pr-title starts with the substring feat.
  //    Print PR is not a feature otherwise.
  if (prTitle.startsWith("feat")) {
    core.info("PR is a feature.");
  } else {
    const msg = "PR is not a feature.";
    core.info(msg);
    core.setFailed(msg);
  }
}

run();


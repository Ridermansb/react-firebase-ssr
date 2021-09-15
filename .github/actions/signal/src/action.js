const core = require('@actions/core');
// const github = require('@actions/github');

async function run() {
    const dependencies = core.getInput('dependencies');
    console.log('Hello, world! => ' + dependencies);
}

run();
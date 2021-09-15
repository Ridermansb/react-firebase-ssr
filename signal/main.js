async function run() {
    const dependencies = core.getInput('DEPENDENCIES');
    console.log('Hello, world! => ' + dependencies);
}

run();
const ArgumentParser = require('argparse').ArgumentParser;

var parser = new ArgumentParser({
    version: '1.0.0',
    addHelp: true,
    description: 'Nodejs DDoser',
    usage: 'ddoser -t http://localhost -n 1000 -c 50 -p 20'
});

parser.addArgument(
    ['-c'], {
        help: 'Concurrency request',
        defaultValue: 8,
        type: 'int',
        dest: 'concurrency'
    }
);

parser.addArgument(
    ['-t'], {
        help: 'Your Target, Example: http://localhost',
        required: true,
        dest: 'target'
    }
);

parser.addArgument(
    ['-n'], {
        help: 'Number of requests to made',
        defaultValue: 100,
        type: 'int',
        dest: 'number'
    }
);

parser.addArgument(
    ['-p'], {
        help: 'Count of child process',
        defaultValue: 8,
        type: 'int',
        dest: 'process'
    }
);

module.exports = parser.parseArgs();
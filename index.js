#!/usr/bin/env node
const path = require('path');
const asyncLimiter = require('async-limiter');
const request = require('request-promise');
const ProgressBar = require('progress');
const cluster = require('cluster');
const args = require('./args');

args.number = args.number - (args.number % args.process);

if (cluster.isMaster) {
    const bar = new ProgressBar(':bar :current/:total', {
        width: 20,
        total: args.number
    });

    // Fork workers.
    for (let i = 0; i < args.process; i++) {
        cluster.fork({
            number: args.number / args.process
        });
    }

    for (const id in cluster.workers) {
        cluster.workers[id].on('message', msg => {
            if (msg.cmd == 'tick') {
                bar.tick();
            }
        });
    }
} else {
    const limiter = new asyncLimiter({
        concurrency: args.concurrency
    });

    Array.from(Array(parseInt(process.env.number)).keys()).forEach(i => {
        limiter.push(cb => {
            request(args.target)
                .then(() => {
                    process.send({cmd: 'tick'});
                    cb();
                })
                .catch(() => {
                    process.send({cmd: 'tick'});
                    cb();
                });
        });
    });

    limiter.onDone(() => {
        process.exit(22);
    });
}
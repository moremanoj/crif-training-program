const envfile = require('./node-environment.json');

export const config = {
    BASES: envfile.BASES | 'localhost:39000',
    REPL_PORT: envfile.REPL_PORT | 10020
};
import Seneca from 'seneca';
import webServer from "../web-server";
import { logger } from '../logger';
const BASES = process.env.BASES.split(',').trim();


/**
 * Load environment configuration values
 * Enable logging here and exception handling
 */

/* Copyright (c) 2014-2017 Richard Rodger and other contributors, MIT License */
logger.info(`environmentVariables BASES : ${process.env.BASES}`);
logger.info(`environmentVariables foramted BASES : ${JSON.stringify(BASES)}`);
logger.info(`environmentVariables MESH_HOST: ${process.env.MESH_HOST}`);
logger.info(`environmentVariables REPL_PORT: ${process.env.REPL_PORT}`);

process.on('uncaughtException', (error) => {

    logger.error('UNCAUGHT EXCEPTION',error);

});

process.on('unhandledRejection', (error) => {

    logger.error('UNHANDLED REJECTION',error);

});

Seneca({ 
    tag: 'web',
    log: {
        map: [
          {
            level: "all",
            handler: function () {

              logger.log(arguments[1], Array.prototype.join.call(arguments, "\t"));
            
},
          },
        ]}
    })
    .test('print')
    .use("monitor")
    .use("mesh",{
        pin: 'role:webapi,format:exposed',
        bases: BASES,
        host: process.env.MESH_HOST,
    })
    .use('seneca-as-promised')
    .use('seneca-repl', { port: process.env.REPL_PORT })

    .ready(function () {

        // Build the frontend server using the hapi framework.
         webServer({ seneca: this });

        this.log.info("server is started");
    
});






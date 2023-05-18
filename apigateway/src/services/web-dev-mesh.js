import Seneca from 'seneca';
import webServer from "./../web-server";
import { logger } from '../logger';
import { CONSTANT } from "../constants";
// import { BASES } from '../../config/node-dev-environment.json';
/**
 * Load environment configuration values
 * Enable logging here and exception handling
 */

/* Copyright (c) 2014-2017 Richard Rodger and other contributors, MIT License */


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
        bases: [CONSTANT.BASES]
     })
    .use('seneca-as-promised')
    .use('seneca-repl', { port: CONSTANT.REPL_PORT })

    .ready(function () {

        // Build the frontend server using the hapi framework.
         webServer({ seneca: this });

        this.log.info("server is started");
    
});
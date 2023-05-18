import Seneca from "seneca";
import courseDetails from "../course";
import { logger } from "../logger";
import { BASES } from '../../config/node-environment.json';

process.on('uncaughtException', (error) => {

    logger.error('UNCAUGHT EXCEPTION',error);

});

process.on('unhandledRejection', (error) => {

    logger.error('UNHANDLED REJECTION',error);

});

Seneca({
  tag: "course",
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
  .test("print")
  .use("monitor")
  .use("mesh", {
    listen: [
      { pin: "role:course,cmd:list", module: "consume" },
      { pin: "role:course,cmd:insert", module: "consume" },
      { pin: "role:course,cmd:update", module: "consume" },
      { pin: "role:course,cmd:delete", module: "consume" },
    ],
    bases: [BASES]
  })
  .use('seneca-as-promised')
  .use(courseDetails)
  .use("seneca-repl", { port: 10030 });

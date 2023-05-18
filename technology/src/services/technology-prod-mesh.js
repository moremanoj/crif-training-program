import Seneca from "seneca";
import technologyDetails from "../technology";
import { logger } from "../logger";
import { BASES } from '../../config/node-environment.json';

process.on('uncaughtException', (error) => {

    logger.error('UNCAUGHT EXCEPTION');
    logger.error(error);

});

process.on('unhandledRejection', (error) => {

    logger.error('UNHANDLED REJECTION');
    logger.error(error);

});

Seneca({
  tag: "technology",
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
      { pin: "role:tech,cmd:list", module: "consume" },
      { pin: "role:tech,cmd:insert", module: "consume" },
      { pin: "role:tech,cmd:update", module: "consume" },
      { pin: "role:tech,cmd:delete", module: "consume" },
    ],
    bases: [BASES],
    host: '@eth0'
  })
  .use('seneca-as-promised')
  .use(technologyDetails)
  .use("seneca-repl", { port: 10000 });

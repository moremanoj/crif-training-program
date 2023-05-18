import Seneca from "seneca";
import courseDetails from "../course";
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
    ],
    bases: [BASES],
    host: '192.168.49.2'
  })
  .use('seneca-as-promised')
  .use(courseDetails)
  .use("seneca-repl", { port: 10000 });

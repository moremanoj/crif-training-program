import Seneca from "seneca";
import courseDetails from "../course";
import { logger } from "../logger";
// import { BASES } from '../../config/node-environment.json';

process.on('uncaughtException', (error) => {

    logger.error('UNCAUGHT EXCEPTION',error);

});

process.on('unhandledRejection', (error) => {

    logger.error('UNHANDLED REJECTION',error);

});
logger.info(`environmentVariables BASES : ${process.env.BASES}`);
logger.info(`environmentVariables MESH_HOST: ${process.env.MESH_HOST}`);
logger.info(`environmentVariables REPL_PORT: ${process.env.REPL_PORT}`);

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
    bases: [process.env.BASES],
    host: process.env.MESH_HOST
  })
  .use('seneca-as-promised')
  .use(courseDetails)
  .use("seneca-repl", { port: process.env.REPL_PORT });

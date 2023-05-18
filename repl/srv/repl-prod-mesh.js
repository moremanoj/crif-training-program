/* Copyright (c) 2014-2017 Richard Rodger and other contributors, MIT License */
import {logger } from './logger';
// import { PORT } from '../config/node-environment.json';

var Seneca = require('seneca');

process.on('uncaughtException', (error) => {

  logger.error('UNCAUGHT EXCEPTION',error);

});

process.on('unhandledRejection', (error) => {

  logger.error('UNHANDLED REJECTION',error);

});

logger.info(`environmentVariables BASES : ${process.env.BASES}`);
logger.info(`environmentVariables MESH_HOST: ${process.env.MESH_HOST}`);
logger.info(`environmentVariables REPL_PORT: ${process.env.REPL_PORT}`);
logger.info(`environmentVariables MESH_PORT: ${process.env.MESH_PORT}`);

Seneca({tag: 'repl'})
  // .test('print')
  .use('monitor', {collect: true})

  // p-2-p service discovery
  .use('mesh', {
    isbase: true,
    port: process.env.MESH_PORT,
  })

  .use('entity')

  .use('seneca-repl', {
    port: process.env.REPL_PORT
  })

  .ready(function () {

    this.sub('role:transport,type:balance,remove:client', function (msg) {

      this.act('role:monitor,cmd:update', {data:['D',msg.meta.instance]});
    
});
  
});

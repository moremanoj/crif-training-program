/* Copyright (c) 2014-2017 Richard Rodger and other contributors, MIT License */
import {logger} from './logger';
import { PORT } from '../config/node-environment.json';

var Seneca = require('seneca');

process.on('uncaughtException', (error) => {

  logger.error('UNCAUGHT EXCEPTION',error);

});

process.on('unhandledRejection', (error) => {

  logger.error('UNHANDLED REJECTION',error);

});

Seneca({tag: 'repl'})
  // .test('print')
  .use('monitor', {collect: true})

  .use('mesh', {
    isbase: true,    
    host: 'localhost',
    port: 39000
  })

  .use('entity')

  .use('seneca-repl', {
    port: PORT
  })

  .ready(function () {

    this.sub('role:transport,type:balance,remove:client', function (msg) {

      this.act('role:monitor,cmd:update', {data:['D',msg.meta.instance]});
    
});
  
});

// bases: [BASES],
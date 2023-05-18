
import express from "express";
import cors from "cors";
import { logger } from '../logger';
import  * as responseHandler from '../responseHandler';
import {CONSTANT} from '../constants';

export default function (options) {

    const app = express();
    app.use(
        express.urlencoded({
            parameterLimit: 5000,
            extended: true,
            limit: "100kb",
        })
    );

    app.use(
        express.json({
            type: "application/json",
            limit: "100kb",
            extended: true,
            strict: true,
        })
    );
    app.use(
        express.json({
            type: "application/csp-report",
            limit: "100kb",
            extended: true,
            strict: true,
        })
    );
    app.use(
        cors()
    );


    const seneca = options.seneca;

    // course
    app.get('/api/courses', async (request, response, next) => {

        const result = await seneca.actAsync('role:course,cmd:list', responseHandler.getCourse);
        response.json(result);

    });


    app.post('/api/courses',async (request, response, next) => {

        // console.log(request.body);
        const result = await seneca.actAsync('role:course,cmd:insert', { body: request.body }, responseHandler.addCourse);
        response.json(result);
    
    });

    app.post('/api/courses/:id',async (request, response, next) => {

        // console.log(request.body);
        const body = {
            ...request.body,
            ...request.params
        };
        const result = await seneca.actAsync('role:course,cmd:update', { body: body }, responseHandler.updateCourse);
        response.json(result);

    });

    app.delete('/api/courses/:id',async (request, response, next) => {

        console.log(request.params);
        const result = await seneca.actAsync('role:course,cmd:delete', { body: request.params }, responseHandler.deleteCourse);
        response.json(result);

    });
    

    // technology 
    app.get('/api/technology', async (request, response, next) => {

        const result = await seneca.actAsync('role:tech,cmd:list', responseHandler.getCourse);
        response.json(result);

    });

    app.post('/api/technology',async (request, response, next) => {

        // console.log(request.body);
        const result = await seneca.actAsync('role:tech,cmd:insert', { body: request.body }, responseHandler.addCourse);
        response.json(result);
    
    });

    app.post('/api/technology/:id',async (request, response, next) => {

        // console.log(request.body);
        const body = {
            ...request.body,
            ...request.params
        };
        const result = await seneca.actAsync('role:tech,cmd:update', { body: body }, responseHandler.updateCourse);
        response.json(result);

    });

    app.delete('/api/technology/:id',async (request, response, next) => {

        console.log(request.params);
        const result = await seneca.actAsync('role:tech,cmd:delete', { body: request.params }, responseHandler.deleteCourse);
        response.json(result);

    });
    
    var server = app.listen(CONSTANT.PORT , () => {

        process.on('uncaughtException', (error) => {

            logger.error('UNCAUGHT EXCEPTION',error);

        });
        
        process.on('unhandledRejection', (error) => {
        
            logger.error('UNHANDLED REJECTION',error);

        });
        logger.info(`Example app listening `);
        var host = server.address().address;
        var port = server.address().port;
        logger.info(`Example app listening at http:\\${host}:${port}`);

    });

    return server;

};

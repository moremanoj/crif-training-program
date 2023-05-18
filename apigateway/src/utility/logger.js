// Imports
import winston, { createLogger, transports } from 'winston';
// import { Loggly } from 'winston-loggly-bulk';
import 'winston-daily-rotate-file';
import * as logform from 'logform';
import environmentConfiguration from './../environment/index';
// import path from "path";



const loggerConfiguration = () => {
    const { combine, timestamp, label, printf } = logform.format;
    var logger = null;
    const ENV_DATA = environmentConfiguration.getConfigurationDetails();
    function initializeLogger() {

        try {

            const dailyRotateTransport = new winston.transports.DailyRotateFile(
                {
                    filename: 'server-access-%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    zippedArchive: true,
                    maxSize: '20m',
                    maxFiles: '14d',
                    dirname: 'logs',
                }
            );
            dailyRotateTransport.on('rotate', (oldFileName, newFileName) => {

                console.info(
                    `oldfileName ${oldFileName}, newFileName ${newFileName}`
                );

            });

            const _winstonInstance = createLogger({
                level: ENV_DATA.WINSTON_FILE_LOG_LEVEL,
                format: combine(
                    label({
                        label: ENV_DATA.WINSTON_LABEL,
                    }),
                    timestamp(),
                    printf((nfo) => {

                        return `${nfo.timestamp} [${nfo.label}] ${nfo.level}: ${nfo.message}`;

                    })
                ),
                transports: [
                    new transports.Console({
                        options: {
                            level: ENV_DATA.WINSTON_CONSOLE_LOG_LEVEL,
                        },
                    }),
                    dailyRotateTransport
                ],
                exitOnError: false,
            });

            logger = _winstonInstance;
            return logger;

        } catch (error) {

            console.error(
                `loggerConfiguration: runtime error ocurred while initializing logger ${error} ${error.stack
                } ${JSON.stringify(error)}`
            );

            throw Error(error.message);
        }
    }
    function getLoggerInstance() {
        try {
            if (!logger) {
                logger = initializeLogger();
                return logger
            }
            return logger;
        } catch (error) {
            console.error(
                `getLoggerInstance: runtime error ${error} ${error.stack
                } ${JSON.stringify(error)}`
            );

            throw Error(error.message);
        }
    }

    return {

        getLoggerInstance
    }


}

export default loggerConfiguration();

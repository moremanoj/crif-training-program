import environmentConfiguration from "./environment/index";
import loggerObject from "./utility/logger";
import senecaConfiguration from "./services/seneca-configuration";

const initializeServer = () => {

    try {
        const ENV_DATA = environmentConfiguration.getConfigurationDetails();
        const logger = loggerObject.getLoggerInstance();
        process.on('uncaughtException', (error) => {

            logger.error(
                `uncaughtException:: ${error} ${error.stack} ${error.message}`
            );

        });
        process.on('unhandledRejection', (error) => {

            logger.error(
                `unhandledRejection:: ${error} ${error.stack} ${error.message}`
            );

        });
        logger.info(
            `initializeServer:: initialization started ${ENV_DATA.PORT}`
        );
        return senecaConfiguration.init().then(()=>{
          
        logger.info(
            `initializeServer:: api gateway started`
        );  

        }).catch((error)=>{
            logger.error(`initializeServer: runtime error ${error} ${error.message} ${error.stack}`)
        })
    }
    catch (error) {
        console.error(
            `initializeServer: runtime error ocurred while initializing apigateway ${error} ${error.stack
            } ${JSON.stringify(error)}`
        );

    }




    /**
     * Todo initialize environment configuration and logger and then seneca based on environment
     */



};

module.export = initializeServer();

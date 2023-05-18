import fs from "fs";
import path from "path";

/**
 * 
 */
const environmentConfiguration = () => {

    let ENV_DATA = {};
    function initializeConfiguration() {
        try {
            const _configurationFileName = "node-environment.json";


            let fileContent = {};
            if (!fs.existsSync(path.join(__dirname, `./../../config/${_configurationFileName}`))) {
                console.error("environmentConfiguration:initializeConfiguration:: node configuration file doesnot exists");
                throw Error("environmentConfiguration:initializeConfiguration:: node configuration file doesnot exists");
            }
            fileContent = Object.assign(fileContent,
                JSON.parse(Buffer.from(fs.readFileSync(path.join(__dirname, `./../../config/${_configurationFileName}`)))))

            if (!(Object.keys(fileContent).length > 0)) {
                console.error("environmentConfiguration:initializeConfiguration:: node configuration file seems to be empty");
                throw Error("environmentConfiguration:initializeConfiguration:: node configuration file seems to be empty");
            }

            ENV_DATA.ENVIRONMENT = Object.hasOwnProperty.call(fileContent, "ENVIRONMENT") ? fileContent.ENVIRONMENT : "development";
            ENV_DATA.PORT = Object.hasOwnProperty.call(fileContent, "PORT") ? fileContent.PORT : 8000;
            ENV_DATA.SENECA_REPL_POD_HOST = Object.hasOwnProperty.call(fileContent, "SENECA_REPL_POD_HOST") ? fileContent.SENECA_REPL_POD_HOST : 10000;
            ENV_DATA.SENECA_BASES = Object.hasOwnProperty.call(fileContent, "SENECA_BASES") ? fileContent.SENECA_BASES : "localhost:39000";
            ENV_DATA.SENECA_REPL_PORT = Object.hasOwnProperty.call(fileContent, "SENECA_REPL_PORT") ? fileContent.SENECA_REPL_PORT : 10020;
            ENV_DATA.SENECA_MESH_HOST = Object.hasOwnProperty.call(fileContent, "SENECA_MESH_HOST") ? fileContent.SENECA_MESH_HOST : 'localhost';
            ENV_DATA.WINSTON_FILE_LOG_LEVEL = Object.hasOwnProperty.call(fileContent, "WINSTON_FILE_LOG_LEVEL") ? fileContent.WINSTON_FILE_LOG_LEVEL : "debug";
            ENV_DATA.WINSTON_CONSOLE_LOG_LEVEL = Object.hasOwnProperty.call(fileContent, "WINSTON_CONSOLE_LOG_LEVEL") ? fileContent.WINSTON_CONSOLE_LOG_LEVEL : "debug";
            ENV_DATA.WINSTON_LABEL = Object.hasOwnProperty.call(fileContent, "WINSTON_LABEL") ? fileContent.WINSTON_LABEL : "web-server";
            ENV_DATA.SENECA_TAG = Object.hasOwnProperty.call(fileContent, "SENECA_TAG") ? fileContent.SENECA_TAG : 'web';
            ENV_DATA.SENECA_LOG_LEVEL= Object.hasOwnProperty.call(fileContent, "SENECA_LOG_LEVEL") ? fileContent.SENECA_LOG_LEVEL : 'all';
            ENV_DATA.SENECA_MESH_PIN= Object.hasOwnProperty.call(fileContent, "SENECA_MESH_PIN") ? fileContent.SENECA_MESH_PIN : 'role:webapi,format:exposed';
            return ENV_DATA;
        } catch (error) {
            console.error(
                `environmentConfiguration:initializeConfiguration:: runtime error ocurred while initializing logger ${error} ${error.stack
                } ${JSON.stringify(error)}`
            );

            throw Error(error.message);
        }
    }
    function getConfigurationDetails() {
        if (!Object.keys(ENV_DATA).length) {
            ENV_DATA = initializeConfiguration();
            return ENV_DATA;
        }

        return ENV_DATA;
    }
    return {
        getConfigurationDetails
    }

}
export default environmentConfiguration();

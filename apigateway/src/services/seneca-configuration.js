import Seneca from 'seneca';
import webServer from "../express-configuration/web-server";
import loggerObject from './../utility/logger';
import environmentConfiguration from "./../environment/index";

const senecaConfiguration = () => {
    const logger = loggerObject.getLoggerInstance();
    const ENV_DATA = environmentConfiguration.getConfigurationDetails();

    function init() {

        return new Promise((resolve, reject) => {

            Seneca({
                tag: ENV_DATA.SENECA_TAG,
                log: {
                    map: [
                        {
                            level: ENV_DATA.SENECA_LOG_LEVEL,
                            handler: logger.info,
                        },
                    ]
                }
            })
                .test('print')
                .use("monitor")
                .use("mesh", {
                    bases: [ENV_DATA.SENECA_BASES],
                    host: ENV_DATA.SENECA_MESH_HOST,
                })
                .use('seneca-as-promised')
                .use('seneca-repl', { port: ENV_DATA.SENECA_REPL_PORT })

                .ready(function () {

                    // Build the frontend server using the hapi framework.
                    webServer({ seneca: this });

                    logger.info("server is started");
                    return resolve();

                });

        });
    }
    return {
        init,
    }
};

export default senecaConfiguration();

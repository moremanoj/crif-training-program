import * as logger from '../logger';


const getCourse = async (err, reply ) => {

        if (err) {

            logger.error({success: false, message: `role:course;cmd:list; ${err.message}`, err });
        
        }
        logger.info({ success: true, message: "role:course;cmd:list; course data fetch successful", data: JSON.stringify(reply) });
        return {message: "course data", data: reply};

};

const addCourse = async (err, reply ) => {
    
    if (err) {

        logger.error({success: false, message: `role:course;cmd:insert; ${err.message}`, err });
    
    }
    logger.info({ success: true, message: "role:course;cmd:insert; course data inserted successful", data: JSON.stringify(reply) });
    return reply;

};
const updateCourse = async (err, reply ) => {

    if (err) {

        logger.error({success: false, message: `role:course;cmd:list; ${err.message}`, err });
    
    }
    logger.info({ success: true, message: "role:course;cmd:list; course data fetch successful", data: JSON.stringify(reply) });
    return reply;

};
const deleteCourse = async (err, reply ) => {

    if (err) {

        logger.error({success: false, message: `role:course;cmd:list; ${err.message}`, err });
    
    }
    logger.info({ success: true, message: "role:course;cmd:list; course data deleted successful" });
    return reply;

};

export default { getCourse, addCourse, updateCourse, deleteCourse };
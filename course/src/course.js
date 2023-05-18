// import lruCache from "lru-cache";

// import { logger } from './logger';

function couseConfiguration(options) {

    const seneca = this;
    seneca.use(require('seneca-entity'));
    
    options = seneca.util.deepextend({
        size: 9999,
        wait: 222
    }, options);

const fetchCourseList  = async (msg, reply) => {

    const course = seneca.make('course');

    await course.list$( function (err, result){

        if(err) return reply(err.message);
    
        reply(null,result);

});

};

const insertCourseDetails = async (msg, reply) => {

    const {name, description, version, mentorName } = msg.body;

    const course = seneca.make('course');

    course.name = name;
    course.description = description;
    course.version = version;
    course.mentorName = mentorName;

    const response = await course.save$(function(err,result) {

        if(err) return err.message;
        console.log(result);
        return result;
    
});
    reply({ message: "data saved", response });

};

const updateCourseDetails = async (msg, reply) => {

    const { id, name, description, version, mentorName } = msg.body;

    const course = seneca.make('course');

    const data = course.data$({id:id, name: name, description: description, version: version, mentorName: mentorName});
    course.name = name;
    course.description = description;
    course.version = version;

    const response = await data.save$(function(err,result) {

        if(err) return err.message;
        console.log(result);
        return result;
    
    });
    reply({ message: "data saved", response });

};
const deleteCourse = async (msg, reply) => {

    const { id } = msg.body;

    const course = seneca.make('course');

    const response = await course.remove$({ id:id },function(err,result) {

        if(err) return err.message;
        console.log(result);
        return result;
    
    });
    reply({ message: "record deleted", response });

};

seneca.addAsync("role:course,cmd:list", fetchCourseList);
seneca.addAsync("role:course,cmd:insert", insertCourseDetails);
seneca.addAsync("role:course,cmd:update", updateCourseDetails);
seneca.addAsync("role:course,cmd:delete", deleteCourse);

}
export default couseConfiguration;

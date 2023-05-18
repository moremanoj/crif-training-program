// import lruCache from "lru-cache";

// import { logger } from './logger';

function technologyConfiguration(options) {

    const seneca = this;
    seneca.use(require('seneca-entity'));
    
    options = seneca.util.deepextend({
        size: 9999,
        wait: 222
    }, options);

const fetchTechnologyList  = async (msg, reply) => {

    const tech = seneca.make('technology');

    await tech.list$( function (err, result){

        if(err) return reply(err.message);
    
        reply(null,result);

});

};

const insertTechnologyDetails = async (msg, reply) => {

    const {name, description, version, mentorName } = msg.body;

    const tech = seneca.make('technology');

    tech.name = name;
    tech.description = description;
    tech.version = version;
    tech.mentorName = mentorName;

    const response = await tech.save$(function(err,result) {

        if(err) return err.message;
        console.log(result);
        return result;
    
});
    reply({ message: "data saved", response });

};

const updateTechnologyDetails = async (msg, reply) => {

    const { id, name, description, version, mentorName } = msg.body;

    const tech = seneca.make('course');

    tech.name = name;
    tech.description = description;
    tech.version = version;
    tech.mentorName = mentorName;

    const response = await tech.save$({ id:id },function(err,result) {

        if(err) return err.message;
        console.log(result);
        return result;
    
});
    reply({ message: "data saved", response });

};
const deleteTechnology = async (msg, reply) => {

    const { id } = msg.body;

    const tech = seneca.make('technology');

    const response = await tech.remove$({ id:id },function(err,result) {

        if(err) return err.message;
        console.log(result);
        return result;
    
});
    reply({ message: "data saved", response });

};

seneca.addAsync("role:tech,cmd:list", fetchTechnologyList);
seneca.addAsync("role:tech,cmd:insert", insertTechnologyDetails);
seneca.addAsync("role:tech,cmd:update", updateTechnologyDetails);
seneca.addAsync("role:tech,cmd:delete", deleteTechnology);

}
export default technologyConfiguration;

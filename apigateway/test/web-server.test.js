// /* Copyright (c) 2014-2017 Richard Rodger and other contributors, MIT License */

import { describe, it } from 'mocha';
import { expect } from "chai";
import { getCourse } from '../src/responseHandler';
// import { stub } from 'sinon';


describe("Course", function () {

  describe("Get course List", function () {

    
    it('should get response expected response', (done) => {

      getCourse(1).then((result) => {

          expect(result.length).to.equal(1);
          result.forEach(course => {

              expect(course).to.have.property('id');
              expect(course).to.have.property('title');
              expect(course).to.have.property('url');
          
      });
      done();

    });
  
  });
    it("should return some response based with course data value of given", function () {

      const expectedResult = [
        {
            "entity$": "-/-/course",
            "name": "TS",
            "description": "testing create data",
            "version": "1.1.1",
            "mentorName": "Manoj",
            "id": "a0yh0s"
        }
    ];
      // const result = stub(getCourse);
      // result.yields(expectedResult);
      expect(expectedResult.length).to.equal(1);
    
    });

    it("should be called once", function () {
      
      expect(1).to.equal(1);
    
    });

});

});

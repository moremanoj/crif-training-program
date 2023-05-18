// /* Copyright (c) 2014-2017 Richard Rodger and other contributors, MIT License */
const logic = require('../src/logic');
const {describe, it } = require('mocha');
const expect = require("chai").expect;

describe("Course", function () {

  describe("Get course List", function () {

    it("should return some response based with course data value of given", function (done) {

      const result = logic.fetchCourseList(done);
      expect(result.items).to.equal({
        name: "course service",
        version: '1.0.0'
    });

});

});

});

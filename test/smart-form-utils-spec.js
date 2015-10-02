'use strict';

var expect = require('chai').expect;
var SmartFormUtils = require('../src/utils/smart-form-utils');
var simpleForm = require('./smart-form-utils-test-data');

describe('SmartFormUtils', function () {

  describe('#countMaxStepsToEnd', function () {
    it('counts the max steps', function () {
      expect(SmartFormUtils.countMaxStepsToEnd(simpleForm, 'q1')).to.equal(4);
      expect(SmartFormUtils.countMaxStepsToEnd(simpleForm, 'q2')).to.equal(3);
      expect(SmartFormUtils.countMaxStepsToEnd(simpleForm, 'q3')).to.equal(2);
      expect(SmartFormUtils.countMaxStepsToEnd(simpleForm, 'q4')).to.equal(1);
    });
  });

  describe('#getNextQuestionName', function () {
    it('finds the next question ID', function () {
      var responseQuestions = [{ name: 'q1', answers: [{ name: 'q1_a1' }] }];
      expect(SmartFormUtils.getNextQuestionName(simpleForm, responseQuestions, 'q1')).to.equal('q2');

      responseQuestions.push({ name: 'q2', answers: [{ name: 'q2_a1' }, { name: 'q2_a2' }] });
      expect(SmartFormUtils.getNextQuestionName(simpleForm, responseQuestions, 'q2')).to.equal('q3');

      responseQuestions.push({ name: 'q3', answers: [{ name: 'q3_a1', userInput: 3 }] });
      expect(SmartFormUtils.getNextQuestionName(simpleForm, responseQuestions, 'q3')).to.equal('q4');
    });
  });

  describe('#getQuestionText', function () {
    it('gets the question text', function () {

      var responseQuestions = [{ name: 'q1', answers: [{ name: 'q1_a1' }] }];
      expect(SmartFormUtils.getQuestionText(simpleForm, responseQuestions, 'q2')).to.equal('When do you want to start?');

      responseQuestions.push({ name: 'q2', answers: [{ name: 'q2_a1' }, { name: 'q2_a2' }] });
      expect(SmartFormUtils.getQuestionText(simpleForm, responseQuestions, 'q3')).to.equal('What needs installing?');

      responseQuestions.push({ name: 'q3', answers: [{ name: 'q3_a1', userInput: 3 }] });
      expect(SmartFormUtils.getQuestionText(simpleForm, responseQuestions, 'q4')).to.equal('How many electrical panels needs installing?');

      responseQuestions.push({ name: 'q4', answers: [{ name: 'q4_a1' }] });
    });
  });

});

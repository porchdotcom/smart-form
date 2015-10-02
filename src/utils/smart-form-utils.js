/*
This is BSD 3-Clause licensed, please see the LICENSE file
*/

'use strict';

// Note: we are not including dependencies in this file, so that this file can be adopted into any environment that just
// runs JavaScript

var ERROR_NEXT_QUESTION_NAME_NOT_FOUND = 'ERROR_NEXT_QUESTION_NAME_NOT_FOUND';
var ERROR_QUESTION_NAME_NOT_FOUND = 'ERROR_QUESTION_NAME_NOT_FOUND';

var smartFormUtils = {
  _getItemFromListByName: function (list, name) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].name === name) {
        return list[i];
      }
    }
    return null;
  },

  _logError: function (msg) {
    if (window && window.console) {
      window.console.error(msg);
    }
  },

  /**
   * Get the next question name based on the current question name and the user response to the questions so far
   *
   * @param formDefinition defines the smart form
   * @param responseQuestions is the user response to the questions so far
   * @param questionName is the current question that the user has just responded
   * @returns the next question name
   */
  getNextQuestionName: function (formDefinition, responseQuestions, questionName) {
    var nextQuestionName;
    var question = formDefinition.questions[questionName];
    // we can't find a question by the question name because of bad smart form definition
    if (!question) {
      smartFormUtils._logError(ERROR_QUESTION_NAME_NOT_FOUND + ': questionName: ' + questionName);
    }

    if (question.nextQuestionName) {

      // when next question does not depend on the answers provided
      nextQuestionName = question.nextQuestionName;

    } else if (question.conditions) {

      for (var i = 0; i < question.conditions.length; i++) {
        var condition = question.conditions[i];
        var dependents = condition.dependents;

        // condition without dependents is invalid
        if (!dependents || dependents.length === 0) {
          break;
        }

        // All dependents have to be true in order for the condition to be true
        var conditionIsTrue = true;
        for (var j = 0; j < dependents.length; j++) {
          var dependent = dependents[j];

          var responseQuestion = smartFormUtils._getItemFromListByName(responseQuestions, dependent.questionName);
          if (!responseQuestion) {
            conditionIsTrue = false;
            break;
          }

          // To keep the design simple, condition will not be based on the answer of a multi select question
          // Thus, we are just looking at the first selected answer
          if (responseQuestion.answers[0].name !== dependent.answerName) {
            conditionIsTrue = false;
            break;
          }
        }

        if (conditionIsTrue) {
          nextQuestionName = condition.nextQuestionName;
          break;
        }
      }
    } else {
      // we can't find the next question name from the current question name because there is no nextQuestionName field
      // nor conditions field defined in the smart form definition
      smartFormUtils._logError(ERROR_NEXT_QUESTION_NAME_NOT_FOUND + ': questionName: ' + questionName);
    }
    return nextQuestionName;
  },

  /**
   * The typical usage of this method is to display a progress bar of how many questions were answered
   *
   * Note: By design, to keep things simple, all paths end up to the same end question.  In the future, we can consider
   * multiple end questions.
   *
   * @param formDefinition defines the smart form
   * @param fromQuestionName is the question name of the start node of the paths to the end node
   * @returns the max number of steps to the end question
   */
  countMaxStepsToEnd: function (formDefinition, fromQuestionName) {
    var maxSteps = 0;

    function countSteps(questionName, steps) {
      // found the end question name
      if (questionName === formDefinition.endQuestionName) {
        // let's see if it's the longest path
        if (steps > maxSteps) {
          maxSteps = steps;
        }
        // need to return, no matter if it has the max steps or not
        return;
      }

      var question = formDefinition.questions[questionName];
      // we can't find a question by the question name because of bad smart form definition
      if (!question) {
        smartFormUtils._logError(ERROR_QUESTION_NAME_NOT_FOUND + ': questionName: ' + questionName);
        return;
      }

      // recurs if we have a next question name
      if (question.nextQuestionName) {
        countSteps(question.nextQuestionName, steps + 1);
      } else if (question.conditions) {
        for (var i = 0; i < question.conditions.length; i++) {
          countSteps(question.conditions[i].nextQuestionName, steps + 1);
        }
      } else {
        // we can't find the next question name from the current question name because of bad smart form definition
        smartFormUtils._logError(ERROR_NEXT_QUESTION_NAME_NOT_FOUND + ': questionName: ' + questionName);
        return;
      }
    }

    // enters the recursive method. It counts itself as a step
    countSteps(fromQuestionName, 1);

    return maxSteps;
  },

  /**
   * The typical usage is to call getNextQuestionName to get the next question name, and then use this method to get the
   * text of the next question with replacement text when it finds the characters %s in the question description
   *
   * @param formDefinition defines the smart form
   * @param responseQuestions is the user response to the questions so far
   * @param questionName is the question name of the question text we want to get
   * @returns the question text displayed to the user
   */
  getQuestionText: function (formDefinition, responseQuestions, questionName) {
    var question = formDefinition.questions[questionName];
    if (!question) {
      smartFormUtils._logError(ERROR_QUESTION_NAME_NOT_FOUND + ': questionName: ' + questionName);
      return null;
    }

    var questionDescription = question.description;
    if (questionDescription) {
      // if replacements doesn't exist then we don't do string replacement
      if (question.replacements) {
        for (var i = 0; i < question.replacements.length; i++) {
          var replacement = question.replacements[i];

          if (replacement.questionName && replacement.property) {
            var responseQuestion = smartFormUtils._getItemFromListByName(responseQuestions, replacement.questionName);

            if (responseQuestion) {
              // the current design is to restrict to single answer questions
              var responseAnswer = responseQuestion.answers[0];

              var replacementQuestion = formDefinition.questions[replacement.questionName];

              var replacementAnswer = smartFormUtils._getItemFromListByName(replacementQuestion.answers, responseAnswer.name);

              if (replacementAnswer) {
                questionDescription = questionDescription.replace(/%s/, replacementAnswer[replacement.property]);
              }
            }
          }
        }
      }
    }

    return questionDescription;
  }
};

module.exports = {
  getNextQuestionName: smartFormUtils.getNextQuestionName,
  countMaxStepsToEnd: smartFormUtils.countMaxStepsToEnd,
  getQuestionText: smartFormUtils.getQuestionText
};

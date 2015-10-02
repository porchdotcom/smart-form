# Smart Form

Smart Forms are dynamic forms in which the next questions are based on the previous answers responded by the users of the forms

## Download

https://github.com/porchdotcom/smart-form/tree/master/releases/0.1.0/smart-form-utils.js

## Features
This project makes it easy for developers to build dynamic forms with these features: 

* Get the next question based on the current question and the response from the user
* Get the question text can be dynamically changed according to the user response
* Count the number of steps to the end, so that we can generate a progress bar

## Usage

### Without Node.js (HTML)

You can just include the JavaScript file and use it in the HTML.  An example is in /examples/html/example.html

    <script src="https://github.com/porchdotcom/smart-form/tree/master/releases/0.1.0/smart-form-utils.js"></script>
    <script>
        SmartFormUtils.getNextQuestionName()
        SmartFormUtils.getQuestionText()
        SmartFormUtils.countMaxStepsToEnd()
    </script>

### With Node.js
    
    var SmartFormUtils  = require('smart-form').utils;
    SmartFormUtils.getNextQuestionName()
    SmartFormUtils.getQuestionText()
    SmartFormUtils.countMaxStepsToEnd()
  

## Live Examples

Porch uses Smart Forms to build dynamic forms such as the home project form: https://porch.com/home/project/electricians

## Installation

Install npm from https://www.npmjs.com/

Install the dependencies:

    npm install 

## Make Changes and Build

Build the JavaScript file used by browser:

    npm run build-js

Automatically build the JavaScript file used by browser whenever there is any change to the source file:

    npm run watch-js

The target file being built for the use in browser: target/utils/smart-form-utils.js    

## Testing

Make sure npm is installed.

### Unit Test
Run this in command line:
  
    npm test

### Check the JavaScript style
Run this in command line:
  
    npm run lint

## JSON schema validation
If your smart form definition data is in a JSON file, you can run a JSON validation against it using the included schema
file, src/schema/smart-form-schema.json, by simply running this command:

    npm run validate-form <mySmartFormJson.json>

## Licensing

BSD 3-Clause License: http://opensource.org/licenses/BSD-3-Clause

## Contributing

Create fork and create a pull request for merging back to the main repo. 

## Support

File an issue: https://github.com/porchdotcom/smart-form/issues

## Contact

David Long <davidlong@porch.com>

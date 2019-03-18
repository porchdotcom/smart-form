# Smart Form

Smart Forms are dynamic forms in which the next questions are based on the previous answers responded by the users of the forms

## Features
This project makes it easy for developers to build dynamic forms with these features: 

* Get the next question based on the current question and the user's previous responses
* Get the question text which can be dynamically changed based on the user's previous responses
* Count the number of steps to the end question. This number can be used to build a progress bar.

## Live Examples

* Demo page: http://porchdotcom.github.io/smart-form/
* Porch uses Smart Forms to build dynamic forms such as the home project form: https://porch.com

## Download

http://porchdotcom.github.io/smart-form/releases/0.1.0/smart-form-utils.js

## Usage

### Without Node.js (HTML)

You can include the JavaScript file and use it in the HTML.  An example is in examples/html/example.html

    <script src="http://porchdotcom.github.io/smart-form/releases/0.1.0/smart-form-utils.js"></script>
    <script>
        SmartFormUtils.getNextQuestionName();
        SmartFormUtils.getQuestionText();
        SmartFormUtils.countMaxStepsToEnd();
    </script>

### With Node.js
    
You can include the node module into your application and start using it:
    
    var SmartFormUtils = require('smart-form').utils;
    SmartFormUtils.getNextQuestionName();
    SmartFormUtils.getQuestionText();
    SmartFormUtils.countMaxStepsToEnd();

## Installation

Install npm from https://www.npmjs.com/

Install the dependencies of this project:

    npm install 

## Make Changes and Build

Build the JavaScript file used by the browser:

    npm run build-js

Automatically build the JavaScript file used by the browser whenever there is a change to the source file:

    npm run watch-js

The target file being built to be used by the browser: target/utils/smart-form-utils.js    

## Testing

Make sure npm is installed.

### Unit Test
Run this in command line:
  
    npm test

### Check the JavaScript style
Run this in command line:
  
    npm run lint

## JSON schema validation
If your smart form definition data is in a JSON file, you can run a JSON validation against it using the included schema file, src/schema/smart-form-schema.json, by simply running this command:

    npm run validate-form <mySmartFormJson.json>

If you don't want to install npm, you can run any json validator using the schema file src/schema/smart-form-schema.json

## Licensing

BSD 3-Clause License: http://opensource.org/licenses/BSD-3-Clause

## Contributing

Create fork and create a pull request for merging back to the main repo. 

## Support

File an issue: https://github.com/porchdotcom/smart-form/issues

## Contact

David Long <davidlong@porch.com>

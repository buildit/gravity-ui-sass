const sass = require('node-sass');
const eyeglass = require('eyeglass');
const gravityBldApi = require('@buildit/gravity-ui-web/build-api');

const testUtils = require('../test-utils');

testUtils.doIntro('Compile @buildit/gravity-ui-web SASS using Eyeglass', gravityBldApi);

sass.render(
  eyeglass({
    file: './test.scss'
  }),
  testUtils.getSassTestCompletionCallback(gravityBldApi),
);


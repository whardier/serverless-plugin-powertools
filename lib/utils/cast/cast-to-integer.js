'use strict';

const ensureString = require('type/string/ensure');
const ensureInteger = require('type/integer/ensure');

const { ServerlessPluginError } = require('../../errors');

module.exports = function (anyValue) {
  const lowerStrValue = ensureString(anyValue, {
    Error: ServerlessPluginError,
    errorMessage: 'Non-string "castToInteger" input: Received: %v',
    errorCode: 'INVALID_CAST_TO_INTEGER_SOURCE_VALUE',
  })
    .trim()
    .toLowerCase();

  const integerValue = ensureInteger(lowerStrValue, {
    Error: ServerlessPluginError,
    errorMessage: 'Non-integer "castToInteger" input: Received: $v',
    errorCode: 'INVALID_CAST_TO_INTEGER_SOURCE_VALUE',
  });

  return integerValue;
};

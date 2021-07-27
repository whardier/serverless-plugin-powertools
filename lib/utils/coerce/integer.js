'use strict';

const ensureString = require('type/string/ensure');
const ensureInteger = require('type/integer/ensure');

const { ServerlessPluginError } = require('../../errors');

function coerceToInteger(value) {
  const lowerStrValue = ensureString(value, {
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
}

module.exports = {
  coerceToInteger,
};

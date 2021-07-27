'use strict';

const ensureString = require('type/string/ensure');

const { ServerlessPluginError } = require('../../errors');

module.exports = function (anyValue) {
  const strValue = ensureString(anyValue, {
    Error: ServerlessPluginError,
    errorMessage: 'Non-string "castToString" input: Received: %v',
    errorCode: 'INVALID_CAST_TO_STRING_SOURCE_VALUE',
  });

  return strValue;
};

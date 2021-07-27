'use strict';

const ensureString = require('type/string/ensure');

const { ServerlessPluginError } = require('../../errors');

function coerceToString(value) {
  const strValue = ensureString(value, {
    Error: ServerlessPluginError,
    errorMessage: 'Non-string "castToString" input: Received: %v',
    errorCode: 'INVALID_CAST_TO_STRING_SOURCE_VALUE',
  });

  return strValue;
}

module.exports = {
  coerceToString,
};

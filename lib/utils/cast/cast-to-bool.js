'use strict';

const ensureString = require('type/string/ensure');

const { ServerlessPluginError } = require('../../errors');

module.exports = function (anyValue) {
  const lowerStrValue = ensureString(anyValue, {
    Error: ServerlessPluginError,
    errorMessage: 'Non-string "castToBool" input:. Received: %v',
    errorCode: 'INVALID_CAST_TO_BOOL_SOURCE_VALUE',
  })
    .trim()
    .toLowerCase();

  switch (lowerStrValue) {
    case 'true':
    case 'yes':
    case '1':
      return true;
    case 'false':
    case 'no':
    case '0':
      return false;
    default:
      throw new ServerlessPluginError(
        'Unable to cast value to boolean',
        'INVALID_CAST_TO_BOOL_SOURCE_VARIABLE'
      );
  }
};

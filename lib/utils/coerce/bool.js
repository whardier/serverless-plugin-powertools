'use strict';

const ensureString = require('type/string/ensure');

const { ServerlessPluginError } = require('../../errors');

function coerceToBool(value) {
  const lowerStrValue = ensureString(value, {
    Error: ServerlessPluginError,
    errorMessage: 'Non-string "castToBool" input:. Received: %v',
    errorCode: 'INVALID_CAST_TO_BOOL_SOURCE_VALUE',
  })
    .trim()
    .toLowerCase();

  switch (lowerStrValue) {
    case 'true':
    case '1':
      return true;
    case 'false':
    case '0':
      return false;
    default:
      throw new ServerlessPluginError(
        'Unable to cast value to boolean',
        'INVALID_CAST_TO_BOOL_SOURCE_VARIABLE'
      );
  }
}

module.exports = {
  coerceToBool,
};

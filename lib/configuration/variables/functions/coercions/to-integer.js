'use strict';

const { ServerlessPluginError } = require('../../../../errors');

const { coerceToInteger } = require('../../../../utils/coerce/integer');

module.exports = {
  resolve({ params }) {
    if (!params || params[0] == null) {
      throw new ServerlessPluginError(
        'Missing "ptInteger" input',
        'MISSING_PT_INTEGER_INPUT_VALUE'
      );
    }
    const value = coerceToInteger(params[0]);
    return { value };
  },
};

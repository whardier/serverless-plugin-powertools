'use strict';

const { ServerlessPluginError } = require('../../../../errors');

const { coerceToString } = require('../../../../utils/coerce/string');

module.exports = {
  resolve({ params }) {
    if (!params == null) {
      throw new ServerlessPluginError('Missing "ptString" input', 'MISSING_PT_STRING_INPUT_VALUE');
    }
    const value = coerceToString(params[0]);
    return { value };
  },
};

'use strict';

const { ServerlessPluginError } = require('../../../../errors');

const { coerceToBool } = require('../../../../utils/coerce/bool');

module.exports = {
  resolve({ params }) {
    if (!params || params[0] == null) {
      throw new ServerlessPluginError('Missing "ptBool" input', 'MISSING_PT_BOOL_INPUT_VALUE');
    }
    const value = coerceToBool(params[0]);
    return { value };
  },
};

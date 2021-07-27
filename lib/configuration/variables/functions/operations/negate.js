'use strict';

const ServerlessError = require('serverless/lib/serverless-error');
const { coerceToBool } = require('../../../../utils/coerce/bool');

module.exports = {
  resolve({ params }) {
    if (!params) {
      throw new ServerlessError('Missing "ptNegate" input', 'MISSING_PT_NEGATE_INPUT_VALUE');
    }

    const value = !coerceToBool(params[0]);

    return { value };
  },
};

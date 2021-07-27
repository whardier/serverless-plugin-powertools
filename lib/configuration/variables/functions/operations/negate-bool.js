'use strict';

const ServerlessError = require('serverless/lib/serverless-error');
const castToBool = require('../../../../utils/cast/cast-to-bool');

module.exports = {
  resolve: ({ params }) => {
    if (!params) {
      throw new ServerlessError('Missing "negateBool" input', 'MISSING_NEGATE_BOOL_INPUT_VALUE');
    }

    const value = !castToBool(params[0]);

    return { value };
  },
};

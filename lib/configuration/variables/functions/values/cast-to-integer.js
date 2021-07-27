'use strict';

const { ServerlessPluginError } = require('../../../../errors');

const castToInteger = require('../../../../utils/cast/cast-to-integer');

module.exports = {
  resolve: ({ params }) => {
    if (!params || params[0] == null) {
      throw new ServerlessPluginError(
        'Missing "castToInteger" input',
        'MISSING_CAST_TO_INTEGER_INPUT_VALUE'
      );
    }
    const value = castToInteger(params[0]);
    return { value };
  },
};

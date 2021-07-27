'use strict';

const { ServerlessPluginError } = require('../../../../errors');

const castToString = require('../../../../utils/cast/cast-to-string');

module.exports = {
  resolve: ({ params }) => {
    if (!params == null) {
      throw new ServerlessPluginError(
        'Missing "castToString" input',
        'MISSING_CAST_TO_STRING_INPUT_VALUE'
      );
    }
    const value = castToString(params[0]);
    return { value };
  },
};

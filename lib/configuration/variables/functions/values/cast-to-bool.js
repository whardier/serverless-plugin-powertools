'use strict';

const { ServerlessPluginError } = require('../../../../errors');

const castToBool = require('../../../../utils/cast/cast-to-bool');

module.exports = {
  resolve: ({ params }) => {
    if (!params || params[0] == null) {
      throw new ServerlessPluginError(
        'Missing "castToBool" input',
        'MISSING_CAST_TO_BOOL_INPUT_VALUE'
      );
    }
    const value = castToBool(params[0]);
    return { value };
  },
};

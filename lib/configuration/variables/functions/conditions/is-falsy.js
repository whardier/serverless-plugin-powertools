'use strict';

const { ServerlessPluginError } = require('../../../../errors');

const castToBool = require('../../../../utils/cast/cast-to-bool');

module.exports = {
  resolve: ({ params }) => {
    if (!params || params[0] == null) {
      throw new ServerlessPluginError('Missing "isFalsy" input', 'MISSING_IS_FALSY_INPUT_VALUE');
    }

    let value = false;

    try {
      value = castToBool(params[0]);
    } catch (error) {
      // ... do nothing
    }

    return { value: !value ? null : '' };
  },
};

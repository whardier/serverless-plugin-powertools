'use strict';

const castToBool = require('./cast-to-bool');
const castToInteger = require('./cast-to-integer');
const castToString = require('./cast-to-string');

const resolverOrNull = require('../../../../utils/resolve-or-null');

module.exports = {
  castToBool,
  castToBoolOrContinue: resolverOrNull(castToBool),
  castToInteger,
  castToIntegerOrContinue: resolverOrNull(castToInteger),
  castToString,
  castToStringOrContinue: resolverOrNull(castToString),
};

'use strict';

const negateBool = require('./negate-bool');
const resolverOrNull = require('../../../../utils/resolve-or-null');

module.exports = {
  negateBool,
  negateBoolOrContinue: resolverOrNull(negateBool),
};

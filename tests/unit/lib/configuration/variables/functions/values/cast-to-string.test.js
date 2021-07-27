'use strict';

const { expect } = require('chai');

const resolveMeta = require('serverless/lib/configuration/variables/resolve-meta');
const resolve = require('serverless/lib/configuration/variables/resolve');
const {
  castToString,
  castToStringOrContinue,
} = require('../../../../../../../lib/configuration/variables/functions/values');

describe('tests/unit/lib/configuration/variables/functions/values/cast-to-string.test.js', () => {
  let configuration;
  let variablesMeta;
  before(async () => {
    configuration = {
      integer: '${castToString(1234)}',
      trueBool: '${castToString(true)}',
      floatHigh: '${castToString(2.6)}',
      floatLong: '${castToString(25502.200600)}',
      continueUndefined: "${castToStringOrContinue(null), 'continued'}",
    };
    variablesMeta = resolveMeta(configuration);
    await resolve({
      serviceDir: process.cwd(),
      configuration,
      variablesMeta,
      sources: { castToString, castToStringOrContinue },
      options: {},
      fulfilledSources: new Set(['castToString', 'castToStringOrContinue']),
    });
  });

  it('should resolve integer', () => expect(configuration.integer).to.equal('1234'));
  it('should resolve float (high)', () => expect(configuration.floatHigh).to.equal('2.6'));
  it('should resolve float long', () => expect(configuration.floatLong).to.equal('25502.2006'));
  it('should resolve true bool', () => expect(configuration.trueBool).to.equal('true'));
  it('should resolve invalid input and continue', () =>
    expect(configuration.continueUndefined).to.equal('continued'));
});

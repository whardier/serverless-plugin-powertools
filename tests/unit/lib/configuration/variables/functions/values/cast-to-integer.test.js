'use strict';

const { expect } = require('chai');

const resolveMeta = require('serverless/lib/configuration/variables/resolve-meta');
const resolve = require('serverless/lib/configuration/variables/resolve');
const {
  castToInteger,
  castToIntegerOrContinue,
} = require('../../../../../../../lib/configuration/variables/functions/values');

describe('tests/unit/lib/configuration/variables/functions/values/cast-to-integer.test.js', () => {
  let configuration;
  let variablesMeta;
  before(async () => {
    configuration = {
      wholeString: "${castToInteger('1')}",
      floatLowString: "${castToInteger('2.1')}",
      floatMidString: "${castToInteger('2.5')}",
      floatHighString: "${castToInteger('2.6')}",
      floatLongString: "${castToInteger('255.200689010')}",
      continueString: "${castToIntegerOrContinue('asdf'), 'continued'}",
      noContinueString: "${castToIntegerOrContinue('1234'), 'continued'}",
    };
    variablesMeta = resolveMeta(configuration);
    await resolve({
      serviceDir: process.cwd(),
      configuration,
      variablesMeta,
      sources: { castToInteger, castToIntegerOrContinue },
      options: {},
      fulfilledSources: new Set(['castToInteger', 'castToIntegerOrContinue']),
    });
  });

  it('should resolve whole string', () => expect(configuration.wholeString).to.equal(1));
  it('should resolve float (low) string', () => expect(configuration.floatLowString).to.equal(2));
  it('should resolve float (mid) string', () => expect(configuration.floatLowString).to.equal(2));
  it('should resolve float (high) string', () => expect(configuration.floatHighString).to.equal(2));
  it('should resolve float long string', () => expect(configuration.floatLongString).to.equal(255));
  it('should resolve invalid input and continue', () =>
    expect(configuration.continueString).to.equal('continued'));
  it('should resolve invalid input and not continue', () =>
    expect(configuration.noContinueString).to.equal(1234));
});

'use strict';

const { expect } = require('chai');

const resolveMeta = require('serverless/lib/configuration/variables/resolve-meta');
const resolve = require('serverless/lib/configuration/variables/resolve');
const {
  negateBool,
  negateBoolOrContinue,
} = require('../../../../../../../lib/configuration/variables/functions/operations');

describe('tests/unit/lib/configuration/variables/functions/operations/negage-bool.test.js', () => {
  let configuration;
  let variablesMeta;
  before(async () => {
    configuration = {
      trueBool: '${negateBool(true)}',
      // falseBool: '${negateBool(false)}',
      trueString: '${negateBool("true")}',
      falseString: '${negateBool("false")}',
      continueString: "${negateBoolOrContinue('nope'), 'continued'}",
      noContinueString: "${negateBoolOrContinue('no'), 'continued'}",
    };
    variablesMeta = resolveMeta(configuration);
    await resolve({
      serviceDir: process.cwd(),
      configuration,
      variablesMeta,
      sources: { negateBool, negateBoolOrContinue },
      options: {},
      fulfilledSources: new Set(['negateBool', 'negateBoolOrContinue']),
    });
  });

  it('should resolve true', () => expect(configuration.trueBool).to.equal(false));
  // it('should resolve false', () => expect(configuration.falseBool).to.equal(true));
  it('should resolve "true"', () => expect(configuration.trueString).to.equal(false));
  it('should resolve "false"', () => expect(configuration.falseString).to.equal(true));
  it('should resolve invalid input and continue', () =>
    expect(configuration.continueString).to.equal('continued'));
  it('should resolve invalid input and not continue', () =>
    expect(configuration.noContinueString).to.equal(true));
});

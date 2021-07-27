'use strict';

const { expect } = require('chai');

const resolveMeta = require('serverless/lib/configuration/variables/resolve-meta');
const resolve = require('serverless/lib/configuration/variables/resolve');
const {
  castToBool,
  castToBoolOrContinue,
} = require('../../../../../../../lib/configuration/variables/functions/values');

describe('tests/unit/lib/configuration/variables/functions/values/cast-to-bool.test.js', () => {
  let configuration;
  let variablesMeta;
  before(async () => {
    configuration = {
      trueBool: '${castToBool(true)}',
      // falseBool: "${castToBool(false)}",
      trueString: "${castToBool('true')}",
      falseString: "${castToBool('false')}",
      TrueString: "${castToBool('True')}",
      FalseString: "${castToBool('False')}",
      yesString: "${castToBool('yes')}",
      noString: "${castToBool('no')}",
      oneString: '${castToBool("1")}',
      zeroString: '${castToBool("0")}',
      oneInteger: '${castToBool(1)}',
      // zeroInteger: '${castToBool(0)}',
      continueString: "${castToBoolOrContinue('invalid'), 'continued'}",
      trueNoContinueString: "${castToBoolOrContinue('true'), 'continued'}",
      falseNoContinueString: "${castToBoolOrContinue('false'), 'continued'}",
    };
    variablesMeta = resolveMeta(configuration);
    await resolve({
      serviceDir: process.cwd(),
      configuration,
      variablesMeta,
      sources: { castToBool, castToBoolOrContinue },
      options: {},
      fulfilledSources: new Set(['castToBool', 'castToBoolOrContinue']),
    });
  });

  it('should resolve true input', () => expect(configuration.trueBool).to.equal(true));
  // it('should resolve false input', () => expect(configuration.falseBool).to.equal(false));
  it('should resolve "true" input', () => expect(configuration.trueString).to.equal(true));
  it('should resolve "false" input', () => expect(configuration.falseString).to.equal(false));
  it('should resolve "True" input', () => expect(configuration.TrueString).to.equal(true));
  it('should resolve "False" input', () => expect(configuration.FalseString).to.equal(false));
  it('should resolve "yes" input', () => expect(configuration.yesString).to.equal(true));
  it('should resolve "no" input', () => expect(configuration.noString).to.equal(false));
  it('should resolve "1" input', () => expect(configuration.oneString).to.equal(true));
  it('should resolve "0" input', () => expect(configuration.zeroString).to.equal(false));
  it('should resolve 1 input', () => expect(configuration.oneInteger).to.equal(true));
  // it('should resolve 0 input', () => expect(configuration.oneInteger).to.equal(false));
  it('should resolve invalid input and continue', () =>
    expect(configuration.continueString).to.equal('continued'));
  it('should resolve truthy input and not continue', () =>
    expect(configuration.trueNoContinueString).to.equal(true));
  it('should resolve falsy input and not continue', () =>
    expect(configuration.falseNoContinueString).to.equal(false));
});

'use strict';

const { expect } = require('chai');

const resolveMeta = require('serverless/lib/configuration/variables/resolve-meta');
const resolve = require('serverless/lib/configuration/variables/resolve');
const ptToBoolFunction = require('../../../../../../../lib/configuration/variables/functions/coercions/to-bool');

describe('tests/unit/lib/configuration/variables/functions/coercions/to-bool.test.js', () => {
  let configuration;
  let variablesMeta;
  before(async () => {
    configuration = {
      trueBool: '${ptToBool(true)}',
      // falseBool: "${ptToBool(false)}",
      trueString: "${ptToBool('true')}",
      falseString: "${ptToBool('false')}",
      TrueString: "${ptToBool('True')}",
      FalseString: "${ptToBool('False')}",
      oneString: '${ptToBool("1")}',
      zeroString: '${ptToBool("0")}',
      oneInteger: '${ptToBool(1)}',
      // zeroInteger: '${ptToBool(0)}',
    };
    variablesMeta = resolveMeta(configuration);
    await resolve({
      serviceDir: process.cwd(),
      configuration,
      variablesMeta,
      sources: { ptToBool: ptToBoolFunction },
      options: {},
      fulfilledSources: new Set(['ptToBool']),
    });
  });

  it('should resolve true input', () => expect(configuration.trueBool).to.equal(true));
  // it('should resolve false input', () => expect(configuration.falseBool).to.equal(false));
  it('should resolve "true" input', () => expect(configuration.trueString).to.equal(true));
  it('should resolve "false" input', () => expect(configuration.falseString).to.equal(false));
  it('should resolve "True" input', () => expect(configuration.TrueString).to.equal(true));
  it('should resolve "False" input', () => expect(configuration.FalseString).to.equal(false));
  it('should resolve "1" input', () => expect(configuration.oneString).to.equal(true));
  it('should resolve "0" input', () => expect(configuration.zeroString).to.equal(false));
  it('should resolve 1 input', () => expect(configuration.oneInteger).to.equal(true));
  // it('should resolve 0 input', () => expect(configuration.oneInteger).to.equal(false));
});

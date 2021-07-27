'use strict';

const { expect } = require('chai');

const resolveMeta = require('serverless/lib/configuration/variables/resolve-meta');
const resolve = require('serverless/lib/configuration/variables/resolve');
const ptNegateFunction = require('../../../../../../../lib/configuration/variables/functions/operations/negate');

describe('tests/unit/lib/configuration/variables/functions/operations/negage.test.js', () => {
  let configuration;
  let variablesMeta;
  before(async () => {
    configuration = {
      trueBool: '${ptNegate(true)}',
      // falseBool: '${ptNegate(false)}',
      trueString: '${ptNegate("true")}',
      falseString: '${ptNegate("false")}',
    };
    variablesMeta = resolveMeta(configuration);
    await resolve({
      serviceDir: process.cwd(),
      configuration,
      variablesMeta,
      sources: { ptNegate: ptNegateFunction },
      options: {},
      fulfilledSources: new Set(['ptNegate']),
    });
  });

  it('should resolve true', () => expect(configuration.trueBool).to.equal(false));
  // it('should resolve false', () => expect(configuration.falseBool).to.equal(true));
  it('should resolve "true"', () => expect(configuration.trueString).to.equal(false));
  it('should resolve "false"', () => expect(configuration.falseString).to.equal(true));
});

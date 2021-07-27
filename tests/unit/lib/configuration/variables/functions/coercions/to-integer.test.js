'use strict';

const { expect } = require('chai');

const resolveMeta = require('serverless/lib/configuration/variables/resolve-meta');
const resolve = require('serverless/lib/configuration/variables/resolve');
const ptToIntegerFunction = require('../../../../../../../lib/configuration/variables/functions/coercions/to-integer');

describe('tests/unit/lib/configuration/variables/functions/coercions/to-integer.test.js', () => {
  let configuration;
  let variablesMeta;
  before(async () => {
    configuration = {
      wholeString: "${ptToInteger('1')}",
      floatLowString: "${ptToInteger('2.1')}",
      floatMidString: "${ptToInteger('2.5')}",
      floatHighString: "${ptToInteger('2.6')}",
      floatLongString: "${ptToInteger('255.200689010')}",
    };
    variablesMeta = resolveMeta(configuration);
    await resolve({
      serviceDir: process.cwd(),
      configuration,
      variablesMeta,
      sources: { ptToInteger: ptToIntegerFunction },
      options: {},
      fulfilledSources: new Set(['ptToInteger']),
    });
  });

  it('should resolve whole string', () => expect(configuration.wholeString).to.equal(1));
  it('should resolve float (low) string', () => expect(configuration.floatLowString).to.equal(2));
  it('should resolve float (mid) string', () => expect(configuration.floatLowString).to.equal(2));
  it('should resolve float (high) string', () => expect(configuration.floatHighString).to.equal(2));
  it('should resolve float long string', () => expect(configuration.floatLongString).to.equal(255));
});

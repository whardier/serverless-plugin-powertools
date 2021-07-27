'use strict';

const { expect } = require('chai');

const resolveMeta = require('serverless/lib/configuration/variables/resolve-meta');
const resolve = require('serverless/lib/configuration/variables/resolve');
const ptToStringFunction = require('../../../../../../../lib/configuration/variables/functions/coercions/to-string');

describe('tests/unit/lib/configuration/variables/functions/coercions/to-string.test.js', () => {
  let configuration;
  let variablesMeta;
  before(async () => {
    configuration = {
      integer: '${ptToString(1234)}',
      trueBool: '${ptToString(true)}',
      floatHigh: '${ptToString(2.6)}',
      floatLong: '${ptToString(25502.200600)}',
    };
    variablesMeta = resolveMeta(configuration);
    await resolve({
      serviceDir: process.cwd(),
      configuration,
      variablesMeta,
      sources: { ptToString: ptToStringFunction },
      options: {},
      fulfilledSources: new Set(['ptToString']),
    });
  });

  it('should resolve integer', () => expect(configuration.integer).to.equal('1234'));
  it('should resolve float (high)', () => expect(configuration.floatHigh).to.equal('2.6'));
  it('should resolve float long', () => expect(configuration.floatLong).to.equal('25502.2006'));
  it('should resolve true bool', () => expect(configuration.trueBool).to.equal('true'));
});

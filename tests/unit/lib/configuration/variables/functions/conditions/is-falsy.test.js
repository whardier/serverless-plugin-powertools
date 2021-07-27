'use strict';

const { expect } = require('chai');

const resolveMeta = require('serverless/lib/configuration/variables/resolve-meta');
const resolve = require('serverless/lib/configuration/variables/resolve');
const {
  isFalsy,
} = require('../../../../../../../lib/configuration/variables/functions/conditions');

describe('tests/unit/lib/configuration/variables/functions/conditions/is-falsy.test.js', () => {
  let configuration;
  let variablesMeta;
  before(async () => {
    configuration = {
      continueString: "${isFalsy('false'), 'continued'}",
      noContinueString: "${isFalsy('true'), 'continued'}",
    };
    variablesMeta = resolveMeta(configuration);
    await resolve({
      serviceDir: process.cwd(),
      configuration,
      variablesMeta,
      sources: { isFalsy },
      options: {},
      fulfilledSources: new Set(['isFalsy']),
    });
  });

  it('should resolve falsy and continue', () =>
    expect(configuration.continueString).to.equal('continued'));
  it('should resolve truthy and not continue', () =>
    expect(configuration.noContinueString).to.equal(''));
});

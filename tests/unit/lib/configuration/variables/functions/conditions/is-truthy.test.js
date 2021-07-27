'use strict';

const { expect } = require('chai');

const resolveMeta = require('serverless/lib/configuration/variables/resolve-meta');
const resolve = require('serverless/lib/configuration/variables/resolve');
const {
  isTruthy,
} = require('../../../../../../../lib/configuration/variables/functions/conditions');

describe('tests/unit/lib/configuration/variables/functions/conditions/is-truthy.test.js', () => {
  let configuration;
  let variablesMeta;
  before(async () => {
    configuration = {
      continueString: "${isTruthy('true'), 'continued'}",
      noContinueString: "${isTruthy('falsy'), 'continued'}",
    };
    variablesMeta = resolveMeta(configuration);
    await resolve({
      serviceDir: process.cwd(),
      configuration,
      variablesMeta,
      sources: { isTruthy },
      options: {},
      fulfilledSources: new Set(['isTruthy']),
    });
  });

  it('should resolve truthy and continue', () =>
    expect(configuration.continueString).to.equal('continued'));
  it('should resolve falsy and not continue', () =>
    expect(configuration.noContinueString).to.equal(''));
});

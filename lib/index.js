'use strict';

class ServerlessPlugin {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;
    this.configurationVariablesSources = require('./configuration/variables');
  }
}

module.exports = ServerlessPlugin;

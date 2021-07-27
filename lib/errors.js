'use strict';

class ServerlessPluginError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

Object.defineProperty(ServerlessPluginError.prototype, 'name', {
  value: ServerlessPluginError.name,
  configurable: true,
  writable: true,
});

module.exports = ServerlessPluginError;

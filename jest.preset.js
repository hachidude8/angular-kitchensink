const nxPreset = require('@nrwl/jest/preset');


module.exports = {
  setupFilesAfterEnv: ['<rootDir>/test-setup.ts'],
  ...nxPreset
};

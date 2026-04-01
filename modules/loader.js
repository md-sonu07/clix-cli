const modules = require("./modules.json");

/**
 * Validates if a module exists in the registry.
 * @param {string} name 
 * @returns {boolean}
 */
function isValidModule(name) {
  return !!modules[name];
}

/**
 * Gets module metadata.
 * @param {string} name 
 * @returns {Object|null}
 */
function getModule(name) {
  return modules[name] || null;
}

/**
 * Gets all available modules.
 * @returns {string[]}
 */
function getAvailableModules() {
  return Object.keys(modules);
}

module.exports = {
  isValidModule,
  getModule,
  getAvailableModules,
};

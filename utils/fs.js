const fs = require("fs-extra");
const path = require("path");

/**
 * Ensures a directory exists, creating it if necessary.
 * @param {string} dirPath 
 */
function ensureDir(dirPath) {
  fs.ensureDirSync(dirPath);
}

/**
 * Copies a template file to a target location with placeholder replacement.
 * @param {string} templatePath 
 * @param {string} targetPath 
 * @param {Object} data 
 */
function copyTemplate(templatePath, targetPath, data = {}) {
  let content = fs.readFileSync(templatePath, "utf-8");

  // Replace placeholders like __MODULE__ or {{moduleName}}
  Object.entries(data).forEach(([key, value]) => {
    const regex = new RegExp(`__${key.toUpperCase()}__|{{${key}}}`, "g");
    content = content.replace(regex, value);
  });

  fs.writeFileSync(targetPath, content);
}

/**
 * Checks if a directory exists.
 * @param {string} dirPath 
 * @returns {boolean}
 */
function exists(dirPath) {
  return fs.existsSync(dirPath);
}

module.exports = {
  ensureDir,
  copyTemplate,
  exists,
};

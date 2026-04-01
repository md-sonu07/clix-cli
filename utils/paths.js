const path = require("path");

// root folder of CLI
const ROOT = path.join(__dirname, "..");

// template helper
function getTemplatePath(...segments) {
  return path.join(ROOT, "templates", ...segments);
}

module.exports = {
  getTemplatePath,
};
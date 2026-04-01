const fs = require("fs-extra");
const path = require("path");
const { getTemplatePath } = require("../../utils/paths");

module.exports = function ({ folderName, moduleName }) {
  const base = process.cwd();

  const moduleDir = path.join(base, folderName, moduleName);
  fs.ensureDirSync(moduleDir);

  // Controller
  let controller = fs.readFileSync(
    getTemplatePath("express", "login", "controller.js"),
    "utf-8"
  );

  controller = controller.replace(/__MODULE__/g, moduleName);

  fs.writeFileSync(
    path.join(moduleDir, `${moduleName}.controller.js`),
    controller
  );

  // Routes
  let routes = fs.readFileSync(
    getTemplatePath("express", "login", "routes.js"),
    "utf-8"
  );

  routes = routes.replace(/__MODULE__/g, moduleName);

  fs.writeFileSync(
    path.join(moduleDir, `${moduleName}.routes.js`),
    routes
  );

  console.log(`✅ Express ${moduleName} module created`);
};
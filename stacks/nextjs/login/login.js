const fs = require("fs-extra");
const path = require("path");
const { getTemplatePath } = require("../../utils/paths");

module.exports = function ({ moduleName }) {
  const base = process.cwd();

  const apiDir = path.join(base, "app/api", moduleName);
  fs.ensureDirSync(apiDir);

  let route = fs.readFileSync(
    getTemplatePath("nextjs", "login", "route.js"),
    "utf-8"
  );

  route = route.replace(/__MODULE__/g, moduleName);

  fs.writeFileSync(path.join(apiDir, "route.js"), route);

  console.log(`✅ Next.js ${moduleName} API created`);
};
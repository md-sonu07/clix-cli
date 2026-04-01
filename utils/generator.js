const path = require("path");
const { execSync } = require("child_process");
const paths = require("./paths");
const fs = require("./fs");
const logger = require("./logger");
const { getModule } = require("../modules/loader");

/**
 * Universal generator function.
 * @param {string} stack - 'express' or 'nextjs'
 * @param {string} moduleName - 'login', 'signup', etc.
 * @param {string} rootDir - Base directory (e.g., 'backend' or current dir)
 */
function generateModule(stack, moduleName, rootDir = ".") {
  const moduleMeta = getModule(moduleName);
  if (!moduleMeta) {
    logger.error(`Module '${moduleName}' is not registered.`);
    return;
  }

  const base = process.cwd();
  const stackMapping = moduleMeta[stack] || {};
  const templateFiles = Object.keys(stackMapping);

  if (templateFiles.length === 0) {
    logger.warn(`No templates defined for ${stack}/${moduleName}`);
    return;
  }

  const templateBaseDir = paths.getTemplatePath(stack, moduleName);

  templateFiles.forEach((templateFile) => {
    const subfolder = stackMapping[templateFile] || "";
    let targetDir;

    if (stack === "nextjs") {
      targetDir = path.join(base, subfolder, moduleName);
    } else {
      targetDir = path.join(base, rootDir, subfolder);
    }

    fs.ensureDir(targetDir);

    const templatePath = path.join(templateBaseDir, templateFile);
    let targetFileName = templateFile;

    // Stack-specific naming conventions
    if (stack === "express") {
      if (templateFile === "controller.js") targetFileName = `${moduleName}.controller.js`;
      if (templateFile === "routes.js") targetFileName = `${moduleName}.routes.js`;
      if (templateFile === "model.js") targetFileName = `${moduleName}.model.js`;
    }

    const targetPath = path.join(targetDir, targetFileName);

    if (fs.exists(templatePath)) {
      fs.copyTemplate(templatePath, targetPath, {
        module: moduleName,
        moduleName: moduleName,
        stack: stack,
      });

      // Inject route if it's an express routes file
      if (stack === "express" && templateFile === "routes.js") {
        injectRoute(rootDir, moduleName);
      }
    }
  });

  logger.success(`${stack.toUpperCase()} module '${moduleName}' generated.`);
}

/**
 * Injects a route into app.js or router/router.js.
 * @param {string} rootDir 
 * @param {string} moduleName 
 */
function injectRoute(rootDir, moduleName) {
  const base = process.cwd();
  
  const possiblePaths = [
    path.join(base, rootDir, "app.js"),
    path.join(base, rootDir, "router", "router.js"),
    path.join(base, rootDir, "routes", "index.js")
  ];

  let targetPath = possiblePaths.find(p => fs.exists(p));

  if (!targetPath) return;

  let content = require('fs').readFileSync(targetPath, 'utf8');
  
  // Adjusted import path based on target file location
  let importPath = `./routes/${moduleName}.routes`;
  if (targetPath.includes("router") || targetPath.includes("routes")) {
    importPath = `./${moduleName}.routes`;
  }

  const routeImport = `const ${moduleName}Routes = require('${importPath}');\n`;
  const routeUse = `app.use('/api/${moduleName}', ${moduleName}Routes);\n`;
  // If Target is a router file, it might use 'router.use' instead of 'app.use'
  const useStmt = content.includes("const router =") || content.includes("router.use") ? 
                  `router.use('/${moduleName}', ${moduleName}Routes);\n` : routeUse;

  if (content.includes(routeImport)) return;

  const injectionPoint = "// Routes will be injected here by ClixCLI";
  if (content.includes(injectionPoint)) {
    content = content.replace(injectionPoint, `${routeImport}${useStmt}${injectionPoint}`);
    require('fs').writeFileSync(targetPath, content);
    logger.info(`Injected ${moduleName} routes into ${path.relative(base, targetPath)}`);
  }
}

/**
 * Creates the base structure for a new project.
 * @param {string} stack 
 * @param {string} targetDir 
 */
function createBaseStructure(stack, targetDir) {
  const base = process.cwd();
  const projectPath = path.join(base, targetDir);
  const templatePath = paths.getTemplatePath(stack, "base");

  if (!fs.exists(templatePath)) {
    logger.warn(`No base template found for stack: ${stack}`);
    return;
  }

  logger.info(`Initializing base structure for ${stack} in ${targetDir}...`);
  
  // Recursively copy base templates
  function copyRecursive(src, dest) {
    const stats = require('fs').statSync(src);
    if (stats.isDirectory()) {
      fs.ensureDir(dest);
      require('fs').readdirSync(src).forEach(child => {
        copyRecursive(path.join(src, child), path.join(dest, child));
      });
    } else {
      require('fs').copyFileSync(src, dest);
    }
  }

  copyRecursive(templatePath, projectPath);
  logger.success(`Base structure for ${stack} created.`);
}

/**
 * Installs dependencies in the target directory.
 * @param {string} targetDir 
 */
function installDependencies(targetDir) {
  const base = process.cwd();
  const projectPath = path.join(base, targetDir);

  if (!fs.exists(path.join(projectPath, "package.json"))) return;

  logger.info("Installing dependencies... (this might take a minute)");
  try {
    execSync("npm install", { cwd: projectPath, stdio: "inherit" });
    logger.success("Dependencies installed successfully.");
  } catch (error) {
    logger.error("Failed to install dependencies.");
  }
}

module.exports = {
  generateModule,
  createBaseStructure,
  installDependencies,
};

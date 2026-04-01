const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

module.exports = (program) => {
  program
    .command('add:express')
    .description('Add express modules to the project and register routes')
    .option('--modules <modules>', 'Comma-separated list of modules to add')
    .action(async (options) => {
      if (!options.modules) {
        console.error(chalk.red('\n❌ Error: Please specify modules using --modules=signup,login'));
        process.exit(1);
      }

      const modules = options.modules.split(',').map(m => m.trim());
      const projectRoot = process.cwd();
      
      // Dynamic Structure Detection
      let baseDir = 'src';
      if (!await fs.pathExists(path.join(projectRoot, 'src'))) {
        baseDir = ''; // Use project root if src doesn't exist
      }

      // Adjusted path: ../../templates instead of ../templates
      const templatesPath = path.resolve(__dirname, '../../templates/express');
      const appJsPath = path.join(projectRoot, baseDir, 'app.js');

      console.log(chalk.bold.cyan(`\n📦 Injecting Express modules into ${baseDir || 'root'} and registering routes...\n`));

      try {
        for (const mod of modules) {
          const modTemplatePath = path.join(templatesPath, mod);
          
          if (await fs.pathExists(modTemplatePath)) {
            const files = await fs.readdir(modTemplatePath);
            
            for (const file of files) {
              const type = file.replace('.js', '');
              let folderName = type;
              if (!type.endsWith('s')) {
                folderName = `${type}s`;
              }

              let destFolder = path.join(baseDir, folderName);
              let destFileName = `${mod}.${type}.js`;

              if (type === 'routes') {
                destFileName = `${mod}.routes.js`;
              } else if (type === 'controller') {
                destFileName = `${mod}.controller.js`;
              }

              const destPath = path.join(projectRoot, destFolder, destFileName);
              await fs.ensureDir(path.dirname(destPath));

              let content = await fs.readFile(path.join(modTemplatePath, file), 'utf8');
              content = content.replace(/__MODULE__/g, mod);
              
              await fs.writeFile(destPath, content);
              console.log(chalk.green(`  ✔ Generated: ${destFolder}/${destFileName}`));
            }

            // Route Registration in app.js
            if (await fs.pathExists(appJsPath)) {
              let appContent = await fs.readFile(appJsPath, 'utf8');
              const registrationMarker = '// Routes will be injected here by ClixCLI';
              
              if (appContent.includes(registrationMarker)) {
                if (!appContent.includes(`require('./routes/${mod}.routes')`)) {
                   const registration = `\n// ${mod} Routes\nconst ${mod}Routes = require('./routes/${mod}.routes');\napp.use('/api/${mod}', ${mod}Routes);\n`;
                  appContent = appContent.replace(registrationMarker, `${registration}${registrationMarker}`);
                  await fs.writeFile(appJsPath, appContent);
                  console.log(chalk.blue(` ✔ Registered: ${mod} routes in ${path.join(baseDir, 'app.js')}`));
                } else {
                  console.log(chalk.yellow(`  ℹ ${mod} routes already registered.`));
                }
              }
            }
          } else {
            console.warn(chalk.yellow(`⚠️  Template for module "${mod}" not found.`));
          }
        }

        console.log(chalk.bold.green(`\n✨ Modules successfully integrated!\n`));
      } catch (err) {
        console.error(chalk.red(`\n✖ Error adding modules: ${err.message}`));
        process.exit(1);
      }
    });
};

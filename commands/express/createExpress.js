const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const { execSync } = require('child_process');

module.exports = (program) => {
  program
    .command('create <name>')
    .description('Create a new project with refined structure and route registration')
    .option('-f, --features <features>', 'Comma-separated list of features to add')
    .action(async (name, options) => {
      const parts = name.split(':');
      const folderName = parts[0];
      const stackName = parts[1] || 'express';

      const projectPath = path.resolve(process.cwd(), folderName);
      // Adjusted path: ../../templates instead of ../templates
      const templatesPath = path.resolve(__dirname, '../../templates', stackName);
      
      console.log(chalk.bold.cyan(`\n🚀 Initializing ${stackName.toUpperCase()} project in: ${folderName}...\n`));

      try {
        await fs.ensureDir(projectPath);
        const srcPath = path.join(projectPath, 'src');
        await fs.ensureDir(srcPath);

        // 1. Copy base templates with refined structure
        const baseTemplatePath = path.join(templatesPath, 'base');
        if (await fs.pathExists(baseTemplatePath)) {
          console.log(chalk.gray('🛠️  Scaffolding structure from base templates...'));
          const baseFiles = await fs.readdir(baseTemplatePath);
          
          for (const file of baseFiles) {
            const source = path.join(baseTemplatePath, file);
            let destination = path.join(projectPath, file);
            
            // Files that go to SRC
            const srcFiles = ['app.js', 'server.js', 'middleware', 'config', 'utils', 'services', 'validations'];
            if (srcFiles.includes(file)) {
              destination = path.join(srcPath, file);
            }

            await fs.copy(source, destination);
            
            // Handle gitignore rename
            if (file === 'gitignore') {
              await fs.move(destination, path.join(projectPath, '.gitignore'), { overwrite: true });
            }
          }
        }

        // 2. Generate features and register them
        if (options.features) {
          console.log(chalk.gray('\n📦 Generating features and registering routes...'));
          const featuresList = options.features.split(',').map(f => f.trim());
          const appJsPath = path.join(srcPath, 'app.js');

          for (const mod of featuresList) {
            const modTemplatePath = path.join(templatesPath, mod);
            
            if (await fs.pathExists(modTemplatePath)) {
              const files = await fs.readdir(modTemplatePath);
              
              for (const file of files) {
                let type = file.replace('.js', '');
                let destFolder = `src/${type}`;
                if (!type.endsWith('s')) {
                  destFolder = `src/${type}s`;
                }
                
                let destFileName = `${mod}.${type}.js`;

                // Specific mapping overrides
                if (type === 'routes') {
                  destFileName = `${mod}.routes.js`;
                } else if (type === 'controller') {
                  destFileName = `${mod}.controller.js`;
                }

                const destPath = path.join(projectPath, destFolder, destFileName);
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
                  const registration = `\n// ${mod} Routes\nconst ${mod}Routes = require('./routes/${mod}.routes');\napp.use('/api/${mod}', ${mod}Routes);\n`;
                  appContent = appContent.replace(registrationMarker, `${registration}${registrationMarker}`);
                  await fs.writeFile(appJsPath, appContent);
                  console.log(chalk.blue(`  ✔ Registered: ${mod} routes in src/app.js`));
                }
              }
            } else {
              console.warn(chalk.yellow(`⚠️  Template for module "${mod}" not found.`));
            }
          }
        }

        // 3. Run npm install
        console.log(chalk.yellow('\n⏳ Installing dependencies...'));
        try {
          execSync('npm install', { cwd: projectPath, stdio: 'inherit' });
        } catch (installErr) {
          console.warn(chalk.yellow('\n⚠️  npm install failed.'));
        }

        console.log(chalk.bold.green(`\n✨ Project ${folderName} is ready!\n`));
      } catch (err) {
        console.error(chalk.red(`\n✖ Error: ${err.message}\n`));
        process.exit(1);
      }
    });
};

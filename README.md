# ClixCLI

A rapid project scaffolding tool for Node.js backends and Next.js projects.

## 🚀 Quick Start

### Create a new project
```bash
node index.js create backend:express --modules=login,signup
```
This will create a `backend` folder with `express` stack and generate `login` and `signup` modules inside it.

### Add modules to an existing project
```bash
node index.js add:nextjs --modules=login
```
This will add the `login` API route to your Next.js project under `app/api/login/`.

## 📂 Architecture

- **`index.js`**: CLI Entry point using `commander`.
- **`commands/`**: Logic for individual CLI commands.
- **`modules/`**: Module registry (`modules.json`) and loader.
- **`templates/`**: Boilerplate code organized by stack and module.
- **`utils/`**: Shared helpers including the universal `generator.js`.

## 🛠️ How to Add New Modules

1. Create a new folder under `templates/express/` or `templates/nextjs/`.
2. Add the template files (e.g., `controller.js`, `routes.js`).
3. Register the module in `modules/modules.json`.

## 🔧 Maintenance

Run the verification test to ensure everything is working correctly:
```bash
node tests/verify.js
```

## 📝 License
ISC

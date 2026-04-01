# 🚀 ClixCLI

**ClixCLI** is a powerful CLI tool that helps you build backend projects faster by generating ready-to-use features like authentication, routes, and structure — all in seconds.

No boilerplate. No setup headache. Just run a command and start building.

---

## ⚡ Why ClixCLI?

- 🔥 Save hours of repetitive setup  
- 🧱 Generate clean, scalable backend structure  
- 🧠 No need to remember boilerplate code  
- ⚙️ Works instantly with simple commands  

---

## 🚀 Quick Start

### 🆕 Create a New Backend Project

```bash
npx clix-cli create backend:express --features=signup
````

---

### ➕ Add Features to Existing Project

```bash
npx clix-cli add:express --features=login
```

**Shorthand:**

```bash
npx clix-cli add:express -f login
```

⚠️ **Note:** Run the command from the correct folder

* Using `backend/src` → `cd backend/src`
* Using `backend` only → `cd backend`

---

## 🧠 Command Meaning

* **`create`** → Create a new backend project
* **`add`** → Add features to an existing project

### 📦 Structure

* **`backend:express`** → `folderName:stack`

  * `backend` = project folder name
  * `express` = backend stack

* **`add:express` / `add:nextjs`** → Add features to an existing project using a specific stack

### ⚙️ Features Flag

* **`--features`** or **`-f`** → Specify features to generate

```bash
npx clix-cli create backend:express --features=login
npx clix-cli add:express -f login,signup
```

👉 Example features:

* login
* signup

---

## 🧩 What Happens Behind the Scenes?

When you run a command, ClixCLI handles everything automatically:

### 📁 1. Project Scaffolding

Creates a complete **Express.js folder structure** (industry-level).

### ⚙️ 2. Feature Generation

Generates fully working code for features like:

* Login
* Signup

Includes:

* Controllers
* Routes
* Models

### 🔗 3. Auto Route Setup

Automatically connects routes to your main `app.js` — no manual wiring needed.

### 📦 4. Dependency Installation

Installs all required npm packages automatically.

---

## 🧠 Feature-Based Architecture

ClixCLI uses a modular feature system:

```bash
--features=login,signup
```

* Add multiple features in one command
* Each feature is fully functional
* Ready to use out of the box

---

## 🛠 Example Workflow

```bash
# Step 1: Create project
npx clix-cli create backend:express --features=signup

# Step 2: Add login later
npx clix-cli add:express -f login
```

👉 Within minutes, your backend with authentication is ready.

---

## ⚡ Upcoming Features

### 🌐 Next.js Support (Coming Soon 🚧)

```bash
npx clix-cli create:nextjs --features=auth
npx clix-cli add:nextjs -f auth
```

* Full-stack scaffolding
* Built-in authentication system
* API + frontend integration

---

## 💡 Vision

ClixCLI is not just a CLI — it's your **backend automation assistant**.

**Goal:**
👉 Make backend development as simple as running a single command.

---

## 🧪 Future Ideas

* Admin panel generation
* Role-based authentication
* Database support (MongoDB, PostgreSQL)
* Plugin system

---

## 🧑‍💻 Who is it for?

* 🚀 Beginners who want to skip setup
* 🏗 Developers building MVPs
* ⚡ Hackathon builders
* 💡 Indie developers

---

## ⭐ Support

If you like this project:

* Give it a ⭐ on GitHub
* Share it with your dev friends
---

## 🔗 Links

- GitHub Repository: https://github.com/md-sonu07/clix-cli/

---
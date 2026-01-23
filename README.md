# 🌐 Community Knowledge Platform

![Next.js](https://img.shields.io/badge/Next.js-15.1-black?style=flat&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-336791?style=flat&logo=postgresql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat&logo=tailwindcss&logoColor=white)

A modern, full-stack discussion platform engineered with **Next.js 15 (App Router)**. This project demonstrates advanced web architecture using **Server Actions** for mutations, **PostgreSQL** for robust data storage, and **Custom Authentication** flows.

> **Live Demo:** https://zeeshan-community-platform.vercel.app/

---

## 🚀 Tech Stack & Features

* **Framework:** Next.js 15.1 (App Router, Server Components).
* **Language:** TypeScript.
* **Database:** PostgreSQL.
* **Authentication:** Custom Credentials (Email/Password) & OAuth support.
* **Styling:** Tailwind CSS & NextUI.
* **State Management:** React Server Actions (No external API layer needed).

---

## 📂 Project Structure

The project follows a feature-first architecture, separating logic into entities, actions, and components:

```bash
├── src/
│   ├── actions/        # Server Actions (Mutations: sign-in, register, create-post)
│   ├── app/            # Next.js App Router
│   │   ├── sign-in/    # Custom Login Page
│   │   ├── sign-up/    # Custom Registration Page
│   │   └── topics/     # Discussion Topics
│   ├── auth.ts         # Auth Configuration
│   ├── components/     # React Components
│   │   ├── auth/       # Custom Login & Signup Forms
│   │   ├── posts/      # Post Rendering Logic
│   │   └── common/     # Shared UI
│   ├── db/             # Database Connection & Queries
│   ├── entities/       # Type Definitions
│   └── paths.ts        # Route Helpers
├── public/             # Static Assets
└── package.json        # Dependencies
```
🛠️ Getting Started
Follow these steps to run the platform locally.

1. Prerequisites
Node.js (v18 or higher).

PostgreSQL database running locally or in the cloud.

2. Clone & Install
  git clone [https://github.com/your-username/community-platform.git](https://github.com/your-username/community-platform.git)
cd community-platform
npm install
   
3. Environment Setup
Create a .env.local file in the root directory and add the following credentials:

# Database Connection (PostgreSQL connection string)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

# NextAuth Configuration
AUTH_SECRET="your-super-secret-key" # Generate using `openssl rand -base64 32`

# OAuth Credentials (Optional)
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

4. Database Setup
Initialize the database schema:
npx prisma db push

5. Run the Server
npm run dev
Access the application at http://localhost:3000.

🔌 Key Features

Feature,Description
Manual Authentication,Full custom Sign Up and Login forms handling Email/Password credentials.
Topic Threads,Users can create focused discussion topics and subscribe to them.
Nested Comments,Deeply nested conversation threads on posts using recursive components.
Real-time Search,Search posts and topics using URL parameters and Server Actions.
Secure Mutations,"All data changes (creates/updates) happen via Server Actions, ensuring type safety."


💡 Design Decisions
Server Actions: I utilized Next.js Server Actions to handle form submissions (Login, Register, Create Post) directly on the server. This eliminates the need for separate API API endpoints and ensures strict type safety.

Custom Auth UI: Instead of using the default NextAuth pages, I built Custom Login and Signup Forms (src/components/auth/) to have full control over the user experience and validation logic.

PostgreSQL Architecture: The application is designed around a relational PostgreSQL schema to handle complex relationships between Users, Topics, Posts, and nested Comments efficiently.

📜 License
Distributed under the MIT License.

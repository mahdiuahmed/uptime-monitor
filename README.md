![Vercel Deploy](https://deploy-badge.vercel.app/vercel/uptime-monitor-weld)
![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/your-username/your-repo/deploy.yml?branch=main)
![License](https://img.shields.io/github/license/mahdiuahmed/uptime-monitor)
![Made with Next.js](https://img.shields.io/badge/Made%20with-Next.js-000?logo=next.js)
![Supabase](https://img.shields.io/badge/Database-Supabase-3ECF8E?logo=supabase&logoColor=white)

# 🔍 Uptime Monitor Dashboard

A simple yet powerful full-stack web app that monitors the uptime of any URL or API and displays results in a real-time dashboard.

Built with **Next.js**, **TailwindCSS**, **ShadCN**, **Supabase**, and deployed via **Vercel**. Includes CI/CD via GitHub Actions and real-time monitoring with Better Stack.

## 📦 Releases

- `v1.0.0` – MVP with uptime checks, dashboard, CI/CD, auth and monitoring

---

## 🚀 Features

- ✅ Add and manage uptime checks for any website/API
- 📈 Visual dashboard showing online/offline status
- 🧪 Background scheduled pings using server actions
- 🔐 Authentication with Clerk
- 🧩 Data stored in Supabase (PostgreSQL)
- 🌐 Deployed on Vercel
- 🛠️ CI/CD via GitHub Actions
- 📊 Production monitoring using Better Stack

---

## 🖥️ Tech Stack

- **Frontend:** Next.js 14 App Router, TailwindCSS, ShadCN
- **Backend:** Supabase (PostgreSQL), Server Actions
- **Auth:** Clerk.dev
- **CI/CD:** GitHub Actions
- **Monitoring:** Better Stack Uptime
- **Deployment:** Vercel

---

## 📸 Demo

> [🔗 Live Site](https://your-vercel-url.vercel.app)
>  
> [📊 Public Status Page](https://status.yourproject.betterstack.com)

---

## 🛠️ Setup Instructions

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/uptime-monitor.git
   cd uptime-monitor

2. Install dependencies:
   ```bash
   npm install

3. Setup .env.local with
   ```ini
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
   CLERK_SECRET_KEY=...
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...

4. Run the dev server:
   ```bash
   npm install

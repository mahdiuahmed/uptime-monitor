![Vercel Deploy](https://deploy-badge.vercel.app/vercel/uptime-monitor-weld)
![Made with Next.js](https://img.shields.io/badge/Made%20with-Next.js-000?logo=next.js)
![Supabase](https://img.shields.io/badge/Database-Supabase-3ECF8E?logo=supabase&logoColor=white)

# 🔍 Uptime Monitor Dashboard

A simple yet powerful full-stack web app that monitors the uptime of any URL or API and displays results in a real-time dashboard.

Built with **Next.js**, **TailwindCSS**, **ShadCN**, **Supabase**, and deployed via **Vercel**. Includes CI/CD via GitHub Actions and real-time monitoring with Better Stack.

---

## 📋 Table of Contents

- [💻 Technologies Used](#technologies-used)
- [🚀 Getting Started & Prerequisites](#getting-started-&-prerequisites)
- [🧪 Testing](#testing)
- [🤝 Contributing](#contributing)
- [📜 License](#license)

---

## 💻 Technologies Used
- **Frontend:** Next.js(App Router, TypeScript), Tailwind CSS, ShadCN UI
- **Auth:** Clerk
- **Cloud Infrastructure:** AWS(Lambda, S3, DynamoDB, ECR)
- **Docker Container:** OpenAI Whisper (Python)
- **Testing:** Cypress

---

## 🚀 Getting Started & Prerequisites

To get started with this project, you will need to have [Node.js](https://nodejs.org) and [Docker Desktop](https://docker.com) installed on your machine. Once you have that installed, follow these steps:

1. Clone the repository to your local machine:
```
git clone https://github.com/mahdiuahmed/uptime-monitor.git
```

2. Setup .env.local with
   ```ini
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=...
   
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
   CLERK_SECRET_KEY=...
   
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
   NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/dashboard
   NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
   NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
   
3. Build with docker and run the container:
```
docker build -t uptime-monitor:latest .
docker run -p 3000:3000 uptime-monitor:latest
```

---

## 🧪 Testing

The testing suites we are using are:
- **E2E** (End-to-End) [Selenium WebDriver (JS)]("https://www.selenium.dev/selenium/docs/api/javascript/")
- **Unit Testing** [Vitest]("https://vitest.dev/")
- **BDD** [Cucumber + Gherkin]("https://cucumber.io/")

1. Run E2E testing with:
```
npm run selenium
```

2. Run unit testing with:
```
npm run vitest
```

3. Run BDD testing with:
```
npm run bdd
```

---

## 🤝 Contributing

Contributions are welcome! To contribute to this project, follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b new-feature`)
3. Make your changes
4. Commit your changes (`git commit -am 'Added some feature'`)
5. Push to the branch (`git push origin new-feature`)
6. Create a new Pull Request

---

## 📄 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

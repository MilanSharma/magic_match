Welcome to Magic Match

📌 Project Info

This is a native, cross-platform mobile application built for iOS, Android, and the web using modern React Native tooling.

Tech Stack:

Native iOS & Android

Web-compatible

Expo Router + React Native

🛠 How to Edit This Code

You can build and modify this project however you prefer—locally or directly in GitHub.

Option 1: Use Your Preferred Code Editor

Clone the repository, develop locally, and push your changes.

Recommended editors:

Cursor (great for beginners)

VS Code

Claude Code (terminal-friendly)

Requirements:

Node.js (install with nvm)

Bun runtime

Setup Steps
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Enter the project folder
cd <YOUR_PROJECT_NAME>

# Step 3: Install dependencies
bun i

# Step 4: Start a live web preview
bun run start-web

# Step 5: Start iOS preview
# Option A (recommended)
bun run start      # Press "i" to open the iOS Simulator

# Option B (if supported)
bun run start -- --ios

Option 2: Edit Directly in GitHub

Open the file

Click the pencil icon

Edit

Commit your changes

🧩 Technologies Used

This project is built using a modern, production-ready stack:

React Native – Native mobile development used by Meta & top apps

Expo – Enhances React Native with powerful tooling

Expo Router – File-based routing with SSR and server functions

TypeScript – Type-safe JavaScript

React Query – Server-state management

Lucide Icons – Beautiful, lightweight icons

📱 How to Test Your App
On a Physical Device (Recommended)

Install Expo Go (iOS & Android)

Start your dev server:

bun run start


Scan the QR code with Expo Go.

In Your Browser

Fastest way to preview:

bun run start-web


(Note: some native APIs may be unavailable.)

iOS Simulator / Android Emulator
# iOS Simulator
bun run start -- --ios

# Android Emulator
bun run start -- --android

🚀 Deployment
iOS – Publish to the App Store

Install the EAS CLI:

bun i -g @expo/eas-cli


Configure and build:

eas build:configure
eas build --platform ios
eas submit --platform ios

Android – Publish to Google Play
eas build --platform android
eas submit --platform android

Web Deployment
eas build --platform web
eas hosting:configure
eas hosting:deploy


Alternative hosting:

Vercel

Netlify

GitHub Pages

✨ App Features

This template includes:

iOS / Android / Web compatibility

File-based navigation via Expo Router

Tab navigation

Modal screens

TypeScript support

Persistent storage

Lucide vector icons

📁 Project Structure
├── app/                    # App screens (Expo Router)
│   ├── (tabs)/             # Tab navigation
│   │   ├── _layout.tsx
│   │   └── index.tsx
│   ├── _layout.tsx         # Root layout
│   ├── modal.tsx           # Modal example
│   └── +not-found.tsx      # 404 screen
├── assets/
│   └── images/             # Icons & images
├── constants/              # App constants
├── app.json                # Expo config
├── package.json            # Dependencies
└── tsconfig.json           # TypeScript config

🔧 Custom Development Builds

A custom dev build is required for advanced features:

When You Need One

Face ID / Touch ID / Apple Sign-In / Google Sign-In

In-app purchases & subscriptions

Push notifications

Custom native modules

Background tasks

Create One
bun i -g @expo/eas-cli
eas build:configure

# Development builds for testing
eas build --profile development --platform ios
eas build --profile development --platform android

# Start with the custom build
bun start --dev-client

🧱 Advanced Features
Add a Database

Supabase (Postgres + real-time)

Firebase

Custom backend API

Authentication

Expo AuthSession (OAuth)

Supabase Auth

Firebase Auth

Native Apple / Google sign-in (requires custom dev build)

Push Notifications

Expo Notifications

Firebase Cloud Messaging

Payments

Web & credit card:

Stripe

PayPal

Native in-app purchases:

RevenueCat

Expo In-App Purchases

🌐 Custom Domains

For web deployments, you can use custom domains with:

EAS Hosting

Vercel

Netlify

For mobile apps, configure deep linking via app.json.

❗ Troubleshooting
App not loading?

Ensure devices share the same WiFi

Try tunnel mode:

bun start -- --tunnel


Check firewall settings

Build failing?
bunx expo start --clear
rm -rf node_modules && bun install

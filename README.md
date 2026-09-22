# Zeppler — Real-Time Dating Platform

Dating platform with profile discovery, a real-time chat system built on Socket.IO, email and Google authentication, and an admin moderation panel.

> **Client project.** Not publicly deployed.

**Case study with architecture write-up →** https://amirmaqbool.online/work/zeppler

## Stack

- **Frontend** — React, Redux Toolkit, TailwindCSS
- **Backend** — Node.js, Express.js, REST APIs
- **Database** — MongoDB, Mongoose
- **Real-time** — Socket.IO, WebSockets
- **Auth** — JWT, OAuth 2.0 (Google)

## Features

- Email and Google authentication
- User profile discovery
- Real-time chat system
- Admin moderation panel

## Architecture

React client (Redux Toolkit) -> Express.js REST API for auth and profiles, plus a Socket.IO server for chat -> MongoDB via Mongoose. JWT is verified in both the REST middleware and the Socket.IO connection handshake.

## My role

Full-stack development: authentication flows with JWT and Google OAuth, profile discovery endpoints and UI, the Socket.IO real-time chat system, and the admin moderation panel with role-based access control.

## Running locally

```bash
git clone https://github.com/AmirMaqbool0/Zeppler_Online_Dating.git
cd Zeppler_Online_Dating
npm install
npm run dev
```

Requires Node.js 18+. Create a `.env` file in the project root with your own values for: `MONGO_URI, JWT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET`.

---

Built by [Amir Maqbool](https://amirmaqbool.online) — Full Stack Developer (React · Next.js · Node.js · MongoDB), open to relocation to Germany.

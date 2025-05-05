# ManageXR Node Proxy

This is a lightweight proxy for ManageXR's device listing API, filtering only key fields to prevent overload in environments like ChatGPT.

## ✅ Features

- Fetches `/devices` from ManageXR
- Filters output to include only: `id`, `name`, `status`, `lastSeen`
- Built with Express

## 🚀 Setup

```bash
npm install
cp .env.example .env
# Edit .env to add your credentials
node index.js
```

Access the API via:

```
http://localhost:3000/devices?orgId=YOUR_ORG_ID&page=1&limit=10
```

## 🌐 Deployment

You can deploy this on:

- [Railway](https://railway.app/)
- [Render](https://render.com/)
- Vercel / Heroku / etc
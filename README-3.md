# Hariharan — Personal Portfolio

A full-stack personal portfolio built with:
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js + Express.js
- **Database**: MongoDB (via Mongoose)
- **Deploy**: Vercel / Render / Railway

---

## 🚀 Local Setup

### 1. Install dependencies
```bash
cd portfolio
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Edit .env with your MongoDB URI
```

### 3. Run the server
```bash
npm start
# or for hot-reload during development:
npm run dev
```

Visit **http://localhost:3000**

---

## 📦 API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/projects` | Get all projects |
| POST | `/api/projects` | Add a new project |
| DELETE | `/api/projects/:id` | Delete a project |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/contact` | Get all messages (admin) |

### Add a project (example)
```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Cool Project",
    "description": "What it does.",
    "tags": ["Python", "AI"],
    "emoji": "🤖",
    "link": "https://github.com/yourrepo"
  }'
```

---

## ☁️ Deployment

### Option A — Vercel (recommended for this stack)
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → import your repo
3. Set `MONGO_URI` in Vercel environment variables (use MongoDB Atlas)
4. Deploy ✓

### Option B — Render
1. Push to GitHub
2. New Web Service on [render.com](https://render.com)
3. Build command: `npm install`
4. Start command: `node server.js`
5. Add `MONGO_URI` env variable
6. Deploy ✓

### MongoDB Atlas (free cloud DB)
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Get connection string → paste into `MONGO_URI` in your env vars

---

## 📁 Project Structure
```
portfolio/
├── public/
│   └── index.html       ← Frontend (HTML + CSS + JS)
├── server.js            ← Express server + MongoDB models + API routes
├── package.json
├── .env.example
└── README.md
```

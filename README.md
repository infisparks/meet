# InfiMeet — Modern Custom Video Meeting & Webinar Platform

**InfiMeet** is a modern video conferencing, webinar, and live collaboration platform designed with a clean UI, custom meeting controls, participant management, and real-time Socket.IO synchronization.

It leverages an existing self-hosted Jitsi infrastructure at `meet.infispark.in` purely as the underlying WebRTC video conferencing engine, keeping all application branding, meeting creation, participant management, and user experience under your complete control.

---

## 🌟 Key Features

- **Branded Executive UI**: Deep navy interface (`#0b0f19`) with glassmorphism, glowing status badges, and responsive layouts.
- **Self-Hosted Jitsi Engine Integration**: Connects seamlessly with `https://meet.infispark.in/external_api.js` with zero exposure of backend Jitsi passwords or infrastructure credentials.
- **Pre-Join Media Check**: Interactive hardware preview for local camera stream and microphone mute toggles with audio meter before entering any room.
- **Custom Meeting Controls**: Dedicated bar for Microphone, Camera, Screen Sharing, In-meeting Chat, Raise Hand, Grid view, Share invite, and Leave meeting.
- **Simulated Webinar Audience (Demo Mode)**: Includes 40 realistic simulated attendees (with Indian/Global names and avatar statuses). Includes a live admin toggle switch to flip between real-only and simulated demo audience counts in real-time.
- **Real-Time Participant Sync**: Socket.IO powered participant state synchronization across all connected browser tabs and devices.
- **One-Click Share Modal**: Generates shareable InfiMeet URLs (`http://localhost:5173/meeting/:meetingId`), supporting 1-click clipboard copy, WhatsApp sharing, Email invites, and native Web Share API.
- **Clean In-Memory Backend**: Express.js with modular repository/service architecture, prepared for seamless database integration (PostgreSQL, MongoDB, Supabase).

---

## 🏗️ Project Architecture

```text
infimeet/
│
├── client/                     # Vite + React + Tailwind CSS + Lucide Icons + Socket.IO Client
│   ├── src/
│   │   ├── components/
│   │   │   ├── JitsiMeeting.jsx        # Jitsi External API wrapper & listener
│   │   │   ├── MeetingControls.jsx     # Custom bottom control bar
│   │   │   ├── ParticipantPanel.jsx    # Real + 40 Demo participants with search & badges
│   │   │   ├── ShareMeetingModal.jsx   # WhatsApp, Email, Link Copy & Native share
│   │   │   ├── MeetingHeader.jsx       # Branding, Live badge, Active count, Demo toggle
│   │   │   ├── PreJoinPreview.jsx      # Local camera/mic test before joining room
│   │   │   └── Navbar.jsx              # Landing & navigation bar
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx                # SaaS landing page with features & hero
│   │   │   ├── CreateMeeting.jsx       # Instant / Webinar / Team meeting creation
│   │   │   ├── JoinMeeting.jsx         # Meeting pre-join room & code entry
│   │   │   └── MeetingRoom.jsx         # Full custom meeting view
│   │   │
│   │   ├── hooks/
│   │   │   └── useJitsi.js             # Jitsi script loader & instance lifecycle
│   │   │
│   │   ├── services/
│   │   │   ├── api.js                  # Axios/Fetch client for backend REST API
│   │   │   └── socket.js               # Socket.IO client instance
│   │   │
│   │   ├── utils/
│   │   │   └── demoParticipants.js     # 40 Realistic demo attendees list
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .env.example
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                     # Node.js + Express + Socket.IO
│   ├── routes/
│   │   └── meetings.js         # REST endpoints for meeting CRUD & participants
│   ├── services/
│   │   └── meetingService.js   # Room generation & in-memory store management
│   ├── data/
│   │   └── store.js            # In-memory data store for meetings & active users
│   ├── socket/
│   │   └── meetingSocket.js    # Socket.IO handlers for join/leave/sync events
│   ├── utils/
│   │   └── demoParticipants.js # 40 Server-side default demo participants
│   ├── server.js               # Express app entry & HTTP/WS server
│   ├── .env.example
│   └── package.json
│
├── .env.example
├── README.md
└── package.json
```

---

## ⚙️ Environment Configuration

### Frontend (`client/.env`)
```env
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000

VITE_JITSI_DOMAIN=meet.infispark.in
VITE_JITSI_URL=https://meet.infispark.in
```

### Backend (`server/.env`)
```env
PORT=5000
CLIENT_URL=http://localhost:5173

JITSI_DOMAIN=meet.infispark.in
JITSI_URL=https://meet.infispark.in

DEMO_PARTICIPANTS_ENABLED=true
DEMO_PARTICIPANTS_COUNT=40
```

> [!NOTE]
> No Jitsi infrastructure passwords (`SERVICE_PASSWORD_JVB`, `JICOFO_AUTH_PASSWORD`, etc.) are exposed or required by the application.

---

## 🚀 Quick Start Guide

### 1. Install Dependencies

You can install all dependencies from the root:
```bash
npm run install-all
```

Or install separately:
```bash
# Server
cd server
npm install

# Client
cd ../client
npm install
```

---

### 2. Start the Backend Server

```bash
cd server
npm run dev
```
The backend will start at: `http://localhost:5000`

---

### 3. Start the Frontend Client

```bash
cd client
npm run dev
```
The application will open at: `http://localhost:5173`

Or from the root directory to run both concurrently:
```bash
npm run dev
```

---

## 🧪 Testing the Meeting Workflow

1. Open `http://localhost:5173` in your browser.
2. Click **Create Meeting**, enter your Host name (e.g. `Mudassir`) and select **Webinar & Presentation**.
3. On the **Pre-Join Preview** screen, test your camera & microphone toggle.
4. Click **Join Meeting Now**.
5. Observe:
   - Jitsi video engine connects seamlessly to `meet.infispark.in`.
   - Top bar displays `● LIVE` and `41 Active` (1 Host + 40 Demo participants).
   - Side panel displays the Host at top with a crown icon, along with 40 simulated attendees.
   - Click **Invite** to copy the share link or send via WhatsApp/Email.
6. Open the copied share link in a second incognito browser tab as `Rahul Sharma`:
   - Join the meeting; observe the count instantaneously increment to `42 Active` on both screens.
7. Click the **Demo Mode** toggle in the top header to turn off simulated attendees:
   - Observe both screens immediately update in real-time to show `2 Active` users.

---

## 🐳 Docker & Coolify Deployment Guide

This project includes an optimized **Multi-Stage Dockerfile** that builds the frontend and bundles it directly into the Express server, running both the UI and WebSockets seamlessly on a single port.

### 🚀 Deploying to Coolify (via GitHub)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial InfiMeet release"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **In your Coolify Dashboard**:
   - Click **+ New Resource** → **Application** → **Public/Private GitHub Repository**.
   - Select your InfiMeet repository and branch (`main`).
   - Under **Build Pack**, select **Dockerfile**.
   - Coolify will automatically read the root [Dockerfile](file:///Volumes/CrucialX9/infispark_project/meeting/Dockerfile).

3. **Configure Environment Variables in Coolify**:
   ```env
   NODE_ENV=production
   PORT=5000
   JITSI_DOMAIN=meet.infispark.in
   JITSI_URL=https://meet.infispark.in
   DEMO_PARTICIPANTS_ENABLED=true
   DEMO_PARTICIPANTS_COUNT=40
   ```

4. **Port Configuration**:
   - Set internal port to: `5000`
   - Attach your custom domain (e.g. `https://meet.yourdomain.com`).

5. Click **Deploy**! Coolify will build both frontend & backend into a high-performance production container.

---

### 🐳 Run Locally with Docker Compose

```bash
docker compose up --build
```
Open **[http://localhost:5000](http://localhost:5000)** in your browser.

---

## 📄 License
MIT © InfiSpark

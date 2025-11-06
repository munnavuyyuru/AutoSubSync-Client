# AutoSubSync Frontend ✨

AI-powered multilingual subtitle generation web app. Upload a video, auto-transcribe speech, translate into a target language, review/edit, and download subtitles as SRT or WebVTT.

## Backend url : [click here](https://github.com/munnavuyyuru/AutoSubSync-server)
### 🧭 Demo Flow

- Authenticate (login/signup)
- Navigate to Dashboard → Process Video
- Upload a video, choose source and target languages
- Generate, preview, edit, and download subtitles (SRT/WebVTT)

---

## 🚀 Features

- 🔐 Authentication (login/signup) and session persistence
- 📤 Video upload with progress feedback
- 🗣️→🌍 Automatic speech-to-text and translation (backend APIs)
- 📝 Subtitle preview and inline editing
- ⬇️ Export to SRT and WebVTT
- 📱 Responsive UI with Tailwind and Radix UI components
- 🧭 Client-side routing via React Router

---

## 🧩 Tech Stack

- ⚛️ React 18 + ⚡ Vite 7
- 🧭 React Router 7
- 🧰 Redux Toolkit + 🧷 redux-persist
- 🎨 Tailwind CSS + 🌀 tailwindcss-animate
- 🧱 Radix UI primitives, shadcn-style components, 🔪 lucide-react icons

---

## 🛠️ Getting Started

### 📦 Prerequisites

- Node.js 18+ and npm
- Backend running locally on `http://localhost:5000` exposing:
  - `POST /api/auth/login`
  - `POST /api/auth/signup`
  - `POST /api/job/upload`
  - `POST /api/job/transcribe`
  - `POST /api/job/translate`

### 📥 Installation

```bash
npm install
```

### 🧑‍💻 Development

```bash
npm run dev
```

### Default routes:

- `/` Landing
- `/auth` Login/Signup
- `/dashboard` Dashboard
- `/process` Process Video

### 🏗️ Production Build & Preview

```bash
npm run build
npm run preview
```

### 🧹 Lint

```bash
npm run lint
```

---

## 🔧 Configuration

- API base URL: endpoints are currently hardcoded to `http://localhost:5000` inside screens like `src/pages/Auth.jsx` and `src/pages/ProcessVideo.jsx`.
- To customize, you can introduce an environment variable and replace usages with `import.meta.env.VITE_API_URL`.

Example `.env` (optional):

```bash
VITE_API_URL=https://your-backend.example.com
```

Then update API calls, e.g.:

```js
const baseUrl = import.meta.env.VITE_API_URL;
await fetch(`${baseUrl}/api/auth/login`, { ... })
```

- Tailwind configuration lives in `tailwind.config.js`; design tokens are driven by CSS variables and `tailwindcss-animate` is enabled as a plugin.
- Path alias `@` → `src/` is configured in `vite.config.js`.

---

## 📁 Project Structure

```
frontend/
├─ index.html
├─ package.json
├─ vite.config.js          # Vite + React plugin, alias @ → src
├─ tailwind.config.js      # Tailwind setup and theme tokens
├─ postcss.config.js
├─ src/
│  ├─ main.jsx             # App bootstrap, Redux Provider, PersistGate
│  ├─ App.jsx              # Routes: /, /auth, /dashboard, /process
│  ├─ index.css            # Tailwind styles
│  ├─ pages/
│  │  ├─ Landing.jsx
│  │  ├─ Auth.jsx
│  │  ├─ Dashboard.jsx
│  │  └─ ProcessVideo.jsx  # Upload, transcribe, translate, preview, download
│  ├─ components/
│  │  ├─ ui/               # Buttons, cards, inputs, selects, toasts, etc.
│  │  ├─ VideoUpload.jsx
│  │  ├─ ProcessingSteps.jsx
│  │  └─ SubtitlePreview.jsx
│  ├─ redux/
│  │  ├─ store.js          # Redux Toolkit + redux-persist
│  │  └─ auth/authSlice.js # Auth state and actions
│  └─ lib/utils.js
└─ public/
   └─ assets/react.svg
```

---

## ⚙️ Usage

1. Sign up or log in at `/auth`.
2. Go to `/process`, upload a video, select languages.
3. Click Generate Subtitles to run: Upload → Transcribe → Translate.
4. Review/edit subtitles in the Preview step.
5. Download as `.srt` or `.vtt`.

Notes:

- Access token is stored in `localStorage` as `accessToken`.
- App guards certain flows; if not authenticated, it redirects to `/auth`.

---

## 🧪 Development Notes

- State is persisted with `redux-persist` (localStorage).
- Serializable checks are disabled for convenience due to non-serializable items in the persist layer.
- Toast notifications use `sonner`.
- Icons are from `lucide-react`.

---

## 🧰 Testing & QA

- Manual testing via the routes above.
- Verify backend availability and CORS.
- Validate subtitle timestamp formatting in SRT and VTT outputs.

---

## 📄 License

MIT © Contributors

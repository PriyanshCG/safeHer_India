# 🛡️ SafeHer India

### *"Your Safety. Our Priority."*

> A women-first safety platform for solo female travelers across India — featuring real-time safety maps, SOS emergency alerts, and a verified guardian network.

---

## 🌟 Live Demo
🔗 [Coming Soon — Deploying on Vercel]

## 🌟 FIGMA link
🔗 [https://www.figma.com/design/GLHpttqi7FTGCXr6KpmHkg/safeHer_India?node-id=3100-2&p=f&t=BrYoGEY0h8PfhrR6-0]
---

## 📌 Problem Statement

Solo women travelers in India face:
- 😨 Safety concerns in unfamiliar cities
- 🚨 Fear of harassment and unsafe routes
- 📵 Lack of immediate trusted help nearby
- 🏥 Difficulty finding police stations or hospitals quickly

**Itch Score: 76 | Whitespace Score: 9 | Source: Razorpay Fix My Itch**

---

## 💡 Solution — SafeHer India

SafeHer India is a **women-first safety web platform** that empowers solo female travelers with:

- 🗺️ **Live Safety Map** — Real-time nearby police stations, hospitals & safe zones
- 🆘 **SOS Emergency System** — One-tap alert with live location sharing
- 👥 **Guardian Network** — Add trusted contacts who get instant alerts
- 📍 **Live Location Share** — Share Google Maps link instantly
- 🔒 **Premium Safety Features** — AI alerts, fake call, priority response

---

## ✨ Features

### 🟢 Free Features (Working)
| Feature | Description |
|---|---|
| 🗺️ Live Safety Map | Shows nearby police, hospitals, safe zones using OpenStreetMap |
| 📍 User Location | Browser geolocation to detect current position |
| 🆘 SOS Button | Displays emergency numbers 112, 1091, 100, 108 |
| 🔗 Share Location | Generates Google Maps link to share with anyone |
| 👤 Guardian Contacts | Add up to 1 emergency contact (free plan) |
| 🔐 Auth System | Basic login and signup with JWT |

### 🔒 Premium Features (UI Only)
| Feature | Description |
|---|---|
| 🤖 AI Safety Alerts | Smart route danger predictions |
| 📞 Fake Call | Simulate incoming call to escape unsafe situations |
| 🚨 Priority Response | Direct line to emergency services |
| 👥 Unlimited Guardians | Add multiple trusted contacts |

---

## 🎨 Design System

| Token | Value |
|---|---|
| Primary (Sage Green) | `#8d9d4f` |
| Accent (Warm Gold) | `#a18f5c` |
| Background (Parchment) | `#e4d7b0` |
| Destructive (SOS Red) | `#d98b7e` |
| Font | Merriweather + Source Serif 4 |
| Theme | Light + Dark Mode |
| Style | Warm earthy Indian wellness aesthetic |

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

### Backend
![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

### APIs & Tools
| Tool | Purpose |
|---|---|
| Leaflet.js | Interactive maps |
| OpenStreetMap Overpass API | Fetch real police/hospital data (FREE) |
| React Router v6 | Client-side routing |
| Redux Toolkit | State management |
| Formik + Yup | Form validation |
| Axios | API calls |
| React Hot Toast | Notifications |
| JWT | Authentication |

---

## 📁 Folder Structure

```
SafeHer-India/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── features/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── utils/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
└── README.md
```

---

## 🖥️ Pages

| Page | Route | Access |
|---|---|---|
| Landing Page | `/` | Public |
| Login | `/login` | Public |
| Signup | `/signup` | Public |
| Safety Map | `/map` | Protected |
| SOS Emergency | `/sos` | Protected |
| Dashboard | `/dashboard` | Protected |
| Pricing | `/pricing` | Public |
| Payment | `/payment` | Protected |

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v18+
- npm or yarn
- MongoDB (local or Atlas)

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/CG-Repositories/safeher-india.git
cd safeher-india
```

### 2️⃣ Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 3️⃣ Backend Setup
```bash
cd backend
npm install
npm run dev
```

### 4️⃣ Environment Variables
Create `.env` in backend folder:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

## 🗓️ Development Timeline

| Days | Tasks |
|---|---|
| Day 1-2 | Figma Design + Approval |
| Day 3-4 | Project Setup + Routing |
| Day 5-6 | Redux + API Integration |
| Day 7-8 | Auth System + Forms |
| Day 9-10 | Map Page + SOS Page |
| Day 11-12 | Dashboard + Pricing + Payment UI |
| Day 13-14 | Testing + Bug Fixes |
| Day 15 | Final Polish + Deployment |

---

## 👨‍💻 Developer

**Built with ❤️ for Women of India**

| | |
|---|---|
| 👤 Developer | [Priyansh Patel] |
| 🎓 College | [Coding Gita X Swaminarayn University] |
| 📧 Email | [priyansh30407@gmail.com] |
| 🔗 GitHub | [@PriyanshCG] |

---

## 📊 Problem Validation

> Source: **Razorpay Fix My Itch** — India's largest startup problem database

| Metric | Score |
|---|---|
| 🔴 Severity Score | 6/10 |
| 💰 TAM Score | 60 |
| 🏳️ Whitespace Score | 9/10 |
| 🔁 Frequency Score | 7/10 |
| 🔥 Itch Score | 76/100 |

---

## 📄 License

This project is built for educational and hackathon purposes.

---

<div align="center">

### 🛡️ SafeHer India
**"Your Safety. Our Priority."**

*Made with ❤️ for Women of India*

</div>
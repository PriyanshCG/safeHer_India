# 🛡️ SafeHer India

<div align="center">

![SafeHer India Banner](https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=1200)

### **"Empowering Every Journey. Your Safety, Our Priority."**

*A women-first safety ecosystem designed for solo female travelers in India. Featuring real-time safety mapping, SOS emergency signals, and a trusted circle of protection.*

**[Figma Design Link](https://www.figma.com/design/GLHpttqi7FTGCXr6KpmHkg/safeHer_India?node-id=3100-2&t=DX4JZgdvf9MG152g-1)**  
**[Live Frontend Link](https://safeher-india.netlify.app)**  
**[Backend API Link](https://safeher-indiasafeher-india-backend.onrender.com)**  
**[Postman Documentation](https://documenter.getpostman.com/view/50839334/2sBXqKnzCE)**  
**[YouTube Demo Link](https://youtube.com/watch?v=YOUR_VIDEO_ID)**  


</div>

---

## 📖 Overview

SafeHer India is more than just an app; it's a digital guardian. Built to address the unique safety challenges faced by women in urban and rural India, it provides a comprehensive suite of tools ranging from immediate emergency response to proactive wellness and safety education.

### 🆘 Why SafeHer?
- **Unsafe Environments**: Real-time identification of safe zones.
- **Panic Situations**: Instant SOS alerts to guardians and authorities.
- **Solo Travel**: Verified routes and community-vetted safety data.
- **Wellness**: Expert-curated guides on self-defense and mental health.

---

## ✨ Key Features

### 🗺️ Live Safety Map (Safe Havens)
- **Interactive Mapping**: Powered by Leaflet and OpenStreetMap.
- **Safe Zone Discovery**: Real-time locations of Police Stations, Hospitals, and "Safe Havens" (cafes/shops with high safety ratings).
- **Spatial Awareness**: Displays your current coordinates and surroundings instantly.

### 🚨 SOS Emergency System
- **One-Tap Panic**: Triggers a global alert to all your guardians.
- **Instant SMS/Notification**: Shares your precise live location via Google Maps links.
- **Emergency Directory**: Quick-access cards for 112, 1091 (Women Helpline), and local emergency services.

### 👥 Guardian Network
- **Trusted Circle**: Add and manage verified contacts who monitor your safety.
- **Status Updates**: Automated notifications when you enter or leave designated safe zones.
- **Priority Response**: Seamless backend orchestration ensuring zero latency during alerts.

### 🌿 Wellness Hub & Safety News
- **Expert Guides**: Curated articles on self-defense, travel protocols, and mental health.
- **Real-time Alerts**: Safety news feed regarding legislation and local security updates.
- **Saved Resources**: Bookmark guides for offline reference during travel.

---

## 🛠️ Tech Stack

### Frontend Architecture
- **Framework**: [React 19](https://reactjs.org/) (Vite for lighting fast builds)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) with a custom **"Indian Wellness Aesthetic"**
- **Maps**: [Leaflet](https://leafletjs.org/) & [React-Leaflet](https://react-leaflet.js.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State & Routing**: React Context API & [React Router 7](https://reactrouter.com/)

### Backend Infrastructure
- **Runtime**: [Node.js](https://nodejs.org/)
- **API Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
- **Security**: JWT (JSON Web Tokens), Bcrypt.js, and CORS protection.

---

## 📁 Project Structure

```bash
safeHer_India/
├── backend/                # Express API & Server
│   ├── src/
│   │   ├── config/         # DB Connection
│   │   ├── controllers/    # Business Logic (Auth, SOS, Location)
│   │   ├── middleware/     # Security & Logging
│   │   ├── models/         # MongoDB Schemas (User, Guardian, SOS)
│   │   ├── routes/         # API Endpoints
│   │   └── services/       # External API Integrations (Overpass)
│   └── server.js           # Server Entry Point
├── frontend/               # React Application
│   ├── src/
│   │   ├── assets/         # Brand Illustrations & PNGs
│   │   ├── components/     # Atomic UI Components
│   │   ├── hooks/          # Custom Hooks (useAuth, useLocation)
│   │   ├── pages/          # Full Page Views
│   │   ├── router/         # Navigation Logic
│   │   └── utils/          # API Config & Constants
│   ├── public/             # Icons & Favicons
│   ├── vite.config.js      # Build Optimization
│   └── tailwind.config.js  # Design Tokens
└── README.md
```

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (Local or Atlas Instance)

### 1. Clone & Install
```bash
git clone https://github.com/PriyanshCG/safeHer_India.git
cd safeHer_India
```

### 2. Backend Configuration
```bash
cd backend
npm install
# Create a .env file with:
# PORT=5000
# MONGO_URI=your_mongodb_uri
# JWT_SECRET=your_secret_key
npm run dev
```

### 3. Frontend Configuration
```bash
cd ../frontend
npm install
npm run dev
```

---

## 🎨 Aesthetic & Design
SafeHer India uses a curated color palette designed to evoke a sense of **peace, trust, and security**:
- **Sage Green (`#8D9D4F`)**: For balance and organic growth.
- **Warm Gold (`#A18F5C`)**: For premium safety and resilience.
- **Sunset Pink (`#C94A7D`)**: For feminine energy and action.
- **Parchment (`#E4D7B0`)**: For a soft, readable backdrop.

---

## 🗓️ Roadmap
- [x] Multi-step Secure Onboarding
- [x] Live Location Streaming
- [x] SOS Alert Orchestration
- [ ] AI-Driven Danger Route Predictions (In Progress)
- [ ] Fake Call Voice Simulation (UI Ready)
- [ ] Community Safety Forums

---

## 👨‍💻 Developer Information

**Built with ❤️ by Priyansh Patel**
*Coding Gita X Swaminarayn University*

- **GitHub**: [@PriyanshCG](https://github.com/PriyanshCG)
- **Email**: priyansh30407@gmail.com

---

<div align="center">

### 🛡️ SafeHer India
**"Your Safety. Our Priority."**

*Made for the women of India, by someone who cares.*

</div>
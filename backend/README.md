# ⚙️ SafeHer India - Backend API

The Node.js/Express backend powering the SafeHer India safety platform. Handles secure authentication, real-time emergency orchestration, and spatial data services.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)

### Installation
```bash
npm install
```

### Environment Variables
Create a `.env` file in this directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### Run Server
```bash
# Production mode
npm start

# Development mode (with nodemon)
npm run dev
```

---

## 🛠️ Technology Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **API Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **ORM**: [Mongoose](https://mongoosejs.com/)
- **Security**: [JSON Web Tokens (JWT)](https://jwt.io/), [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js)
- **Middleware**: [CORS](https://github.com/expressjs/cors), [Dotenv](https://github.com/motdotla/dotenv)

---

## 🛣️ API Routes

### 🔐 Authentication
- `POST /api/auth/signup`: Register a new user.
- `POST /api/auth/login`: Authenticate and receive JWT.

### 👥 Guardian Management
- `GET /api/guardians`: List all emergency contacts.
- `POST /api/guardians`: Add a new trusted contact.
- `DELETE /api/guardians/:id`: Remove a contact.

### 🆘 SOS & Safety
- `POST /api/sos/trigger`: Initiate emergency protocol.
- `GET /api/location/safe-zones`: Fetch nearby police/hospitals via Overpass API.

### 👤 User Profile
- `GET /api/users/profile`: Get current user details.
- `PUT /api/users/profile`: Update account settings.

---

## 🛡️ Security Features
- **JWT Authorization**: All sensitive routes are protected via custom `authMiddleware`.
- **Password Hashing**: Salted hashing using Bcrypt.
- **Audit Logging**: Every SOS event and major user action is logged in the `Activity` collection.

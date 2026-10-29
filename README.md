# Programming Assignment 2 — React Login/Signup with Express + MongoDB

## Structure
```
client/   React (Vite) frontend
  src/App.jsx              Tab switch between Login and Signup
  src/components/Signup.jsx
  src/components/Login.jsx
  src/components/Message.jsx  Success/error feedback
  src/api.js               fetch() wrapper that POSTs JSON to the backend
server/   Express backend
  server.js                Routes: POST /api/signup, POST /api/login
  models/User.js           Mongoose schema (f_name, l_name, username, password)
```

## Setup
Requires Node.js 18+ and MongoDB (local or Atlas).

```bash
# Backend
cd server
npm install
cp .env.example .env        # edit MONGO_URI if using Atlas
npm start                   # http://localhost:5000

# Frontend (second terminal)
cd client
npm install
npm run dev                 # http://localhost:5173
```

## .env
```
MONGO_URI=mongodb://127.0.0.1:27017/pa2
PORT=5000
```
Users are stored in the `users` collection of the `pa2` database.

## API
| Route | Body | Responses |
|---|---|---|
| POST /api/signup | f_name, l_name, username, password | 201 created · 400 missing fields · 409 username exists · 500 server error |
| POST /api/login | username, password | 200 success · 400 missing fields · 404 no such user · 401 wrong password · 500 server error |

Passwords are hashed with bcrypt before storage; login compares with `bcrypt.compare`.
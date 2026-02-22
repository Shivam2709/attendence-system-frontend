# 📌 Mini Attendance + Task Management System (Role-Based)

A full-stack web application built using **Node.js, Express, MongoDB Atlas, and React (Vite + Tailwind CSS)**.

This system allows users to:

- 🔐 Signup & Login with JWT authentication
- 🗓 Mark attendance (only once per day)
- 📝 Create, update, toggle, and delete tasks
- 👑 Role-based access control (User & Admin)
- 📊 Admin can view all present employees (today)
- 🔒 Securely manage user-specific data

---

# 🚀 Live Demo

🔗 Backend API:  
https://attendence-system-eflo.onrender.com

🔗 Frontend App:  
https://attendence-system-frontend-jade.vercel.app

---

# 🛠 Tech Stack

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- Morgan (API logging)
- Render (Deployment)

## Frontend

- React (Vite)
- Tailwind CSS
- Axios
- React Router DOM
- React Hot Toast
- Context API (Auth State)
- Vercel (Deployment)

---

# 🔐 Role-Based Access Control (RBAC)

The system supports two roles:

| Role  | Permissions                        |
| ----- | ---------------------------------- |
| user  | Mark attendance, manage own tasks  |
| admin | View all today's present employees |

### 🔑 How It Works

- Role is stored in the User schema
- Role is embedded in JWT payload
- Backend middleware verifies role
- Frontend conditionally renders UI based on role
- Admin routes are protected at both backend and frontend level

---

# 🗄 Database Schema (MongoDB)

## 📦 Users Collection

```json
{
  "_id": "ObjectId",
  "name": "String",
  "email": "String (unique)",
  "password": "String (hashed)",
  "role": "user | admin",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

---

## 📦 Attendance Collection

```json
{
  "_id": "ObjectId",
  "user": "ObjectId (ref User)",
  "attendance_date": "Date"
}
```

### Unique Index (Prevents Duplicate Attendance)

```js
attendanceSchema.index({ user: 1, attendance_date: 1 }, { unique: true });
```

Ensures:
1 user + 1 date = 1 attendance record

---

## 📦 Tasks Collection

```json
{
  "_id": "ObjectId",
  "user": "ObjectId (ref User)",
  "title": "String",
  "description": "String",
  "status": "pending | completed",
  "due_date": "Date",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

---

# 📡 API Endpoints

## 🔐 Auth Routes

| Method | Endpoint         | Description   |
| ------ | ---------------- | ------------- |
| POST   | /api/auth/signup | Register user |
| POST   | /api/auth/login  | Login user    |

JWT Payload:

```json
{
  "id": "userId",
  "role": "user | admin"
}
```

---

## 🗓 Attendance Routes

| Method | Endpoint        | Description                    |
| ------ | --------------- | ------------------------------ |
| POST   | /api/attendance | Mark attendance (once per day) |

---

## 📝 Task Routes

| Method | Endpoint       | Description    |
| ------ | -------------- | -------------- |
| POST   | /api/tasks     | Create task    |
| GET    | /api/tasks     | Get user tasks |
| PUT    | /api/tasks/:id | Update task    |
| DELETE | /api/tasks/:id | Delete task    |

---

## 👑 Admin Routes

| Method | Endpoint                    | Description                             |
| ------ | --------------------------- | --------------------------------------- |
| GET    | /api/admin/attendance/today | View all present employees (Admin only) |

Protected by:

- JWT Authentication Middleware
- Admin Role Middleware

---

# 🔑 Environment Variables

Create a `.env` file inside backend:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRE=1d
NODE_ENV=production
```

No credentials are hardcoded.

---

# 🧪 Local Setup

## Backend

```bash
cd backend
npm install
npm run dev
```

Server runs at:
http://localhost:5000

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:
http://localhost:5173

---

# 🚀 Deployment

## Backend (Render)

1. Push backend to GitHub
2. Connect repository in Render
3. Add environment variables
4. Deploy

## Frontend (Vercel)

1. Push frontend to GitHub
2. Import project in Vercel
3. Set backend API URL
4. Deploy

---

# 🛡 Security Measures

- Password hashing using bcrypt
- JWT-based authentication
- Role-based authorization
- Protected routes middleware
- MongoDB unique indexes
- No plain text passwords
- No hardcoded credentials
- Environment variables for sensitive data
- API logging with Morgan

---

# 📊 Evaluation Criteria Covered

✔ Clean API structure  
✔ Secure authentication  
✔ Role-based authorization  
✔ Proper database schema design  
✔ Cloud deployment  
✔ Code quality & modular architecture  
✔ No hardcoded credentials  
✔ No plain text passwords

---

# 📌 Future Improvements

- Attendance history filter by date
- Pagination for admin view
- User management panel
- Refresh token implementation
- Dashboard analytics

---

# 👨‍💻 Author

Shivam Thakur  
GitHub: https://github.com/Shivam2709

---

# ⭐ Project Status

✅ Backend Deployed  
✅ Frontend Deployed  
✅ JWT Authentication  
✅ Role-Based Access Control  
✅ Admin Panel Implemented  
✅ Production-Ready Structure

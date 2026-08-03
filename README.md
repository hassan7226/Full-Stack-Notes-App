# 📝 Notes App

A full-stack Notes Application built with the MERN Stack (MongoDB, Express.js, React.js, Node.js). Users can register, log in securely using JWT authentication, and manage their personal notes with full CRUD functionality.

## 🚀 Live Demo : https://notes-app-xi-vert.vercel.app/


---

## ✨ Features

- 🔐 User Authentication (JWT)
- 👤 User Registration & Login
- 📝 Create Notes
- 📖 View Notes
- ✏️ Update Notes
- 🗑️ Delete Notes
- 🔒 Protected Routes
- 💾 MongoDB Database
- 📱 Responsive UI
- ⚡ Fast API with Express.js

---

## 🛠 Tech Stack

### Frontend

- React.js
- React Router DOM
- Context API
- Axios
- Tailwind CSS

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt
- dotenv
- CORS

---

## 📂 Project Structure

```
Notes-App
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
└── server
    ├── controllers
    ├── middlewares
    ├── models
    ├── routes
    ├── index.js
    └── package.json
```

---

## 🔑 Environment Variables

Create a `.env` file inside the **server** folder.

```env
PORT=8000
MONGODB_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_SECRET_KEY
```

Create a `.env` file inside the **client** folder.

```env
VITE_API_URL=https://your-backend-url.vercel.app/api
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/yourusername/Notes-App.git
```

### Backend Setup

```bash
cd server
npm install
npm start
```

### Frontend Setup

```bash
cd client
npm install
npm start
```

---


## 🔐 Authentication Flow

1. User registers with email and password.
2. Password is hashed using **bcrypt**.
3. User logs in.
4. Server generates a **JWT Token**.
5. Token is stored in **Local Storage**.
6. Axios automatically sends the token in the Authorization header.
7. Protected routes verify the token before processing requests.

---


## 🚀 Deployment

- **Frontend:** Vercel
- **Backend:** Vercel
- **Database:** MongoDB Atlas

---

## 📚 What I Learned

- Building REST APIs with Express.js
- JWT Authentication
- MongoDB & Mongoose CRUD Operations
- React Context API
- Protected Routes
- Axios API Integration
- MERN Stack Project Structure
- Full-Stack Deployment with Vercel

---

## 👨‍💻 Author

**Hassan Arshad**

- GitHub: https://github.com/hassan7226
- LinkedIn: https://www.linkedin.com/in/hassan7226

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.
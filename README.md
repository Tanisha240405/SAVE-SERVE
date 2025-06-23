# 🥗 Save & Serve – A Food Donation Web App

Save & Serve is a full-stack web application that helps reduce food waste by allowing individuals and organizations to donate excess food to NGOs and communities in need. Users can sign up, donate food, track their impact, and earn points for every contribution.

---

## 🚀 Features

- 👤 User Signup/Login with secure JWT authentication
- 🍽️ Donate leftover food (with expiry time and pickup address)
- 📍 Location-based donation listing
- 🎯 Earn points and track donations in your profile
- 🔍 Explore NGOs by city using a dropdown search
- 🌄 Beautiful homepage with slideshow, donation info, and contact section
- 📱 Fully responsive UI with Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (via Mongoose)
- JWT for authentication
- bcryptjs for password hashing

### Other Tools
- CORS for cross-origin requests
- dotenv for managing environment variables

---

## 🧠 Folder Structure

```
/backend
  /models
  /routes
  /controllers
  server.js
/frontend
  /src
    /components
    /pages
    /context
    App.jsx
    index.js
```

---

## 🔐 Authentication Flow

- User signs up or logs in and receives a JWT token.
- Token is stored in localStorage and sent with protected requests.
- User info is also stored in localStorage and managed via `AuthContext`.

---

## 🌟 Points System

- Each successful donation earns **20 points**.
- Points and total donations are visible on the Profile page.

---

## 🏁 Setup Instructions

### Backend Setup
1. `cd backend`
2. `npm install`
3. Create `.env` file and add:
    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    ```
4. `npm run dev`

### Frontend Setup
1. `cd frontend`
2. `npm install`
3. `npm start`

Make sure your backend is running at `http://localhost:5000`.

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repository, open issues, or submit pull requests.

---


## 📄 License

This project is licensed under the MIT License.

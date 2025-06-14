
# 📘 SmartExamGen - AI-powered Question Paper Generator

SmartExamGen is an intelligent, AI-driven web application built with the **MERN stack (MongoDB, Express.js, React, Node.js)** and integrated with **Gemini (Google's generative AI)** to automatically generate subject-specific question papers.

> 🔍 Designed for educators and institutions to streamline exam creation based on subjects and question types (MCQ, Short Answer, Long Answer, True/False, Fill in the Blanks).

---

## 🖼️ Project Architecture

```
                +------------------------+
                |     Frontend (React)   |
                |  - Login/Signup (OAuth)|
                |  - Subject Selector    |
                |  - Display Questions   |
                |  - Dashboard/Results   |
                +----------+-------------+
                           |
                           v
                +------------------------+
                |     Backend (Node.js)  |
                |  - Express API Routes  |
                |  - Authentication (JWT)|
                |  - Score Submission    |
                +----------+-------------+
                           |
                           v
        +----------------------+       +---------------------------+
        |   MongoDB Database   |<----->| Google Gemini AI (API)    |
        | - User Info          |       | - Question Generation     |
        | - Scores             |       +---------------------------+
        +----------------------+
```

---

## 🌟 Features

✅ Login & Signup (Manual + Google OAuth)  
✅ Generate questions based on subject & type  
✅ Submit answers and calculate scores  
✅ Visual dashboard for score tracking  
✅ Compare past and current scores with charts (Bar/Line)

---

## 🔧 Technologies Used

- 🌐 Frontend: React.js, Chart.js, Tailwind CSS  
- 🛠️ Backend: Node.js, Express.js  
- 🧠 AI Integration: @google/generative-ai (Gemini API)  
- 🔐 Auth: JWT, Google OAuth  
- 📦 Database: MongoDB (Mongoose)

---

## 🖥️ Installation & Running Locally

> ⚠️ Before you begin, make sure you have Node.js, npm, and MongoDB installed on your system.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/SmartExamGen.git
cd SmartExamGen
```

### 2. Setup Backend

```bash
cd backend
npm install
```

> Create a `.env` file inside the `backend/` directory with the following content:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GENAI_API_KEY=your_gemini_api_key
```

```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm start
```

Frontend will run on [http://localhost:3000](http://localhost:3000)  
Backend will run on [http://localhost:5000](http://localhost:5000)

---

## 📊 Sample Dashboard Output

### 🧑‍🎓 User Dashboard
![User Dashboard](https://your-sample-dashboard-image-url)

- See your scores in each subject
- Compare previous and current performance
- Interactive charts using `Chart.js`

---

## 📚 Usage Flow

1. User logs in (manual/Google)
2. Selects subject & question type
3. Gemini AI generates questions
4. User submits answers
5. Score saved and shown on dashboard
6. Performance compared with history

---

## 🧠 Powered by AI

SmartExamGen uses **Gemini AI** by Google to generate contextual and varied question sets, ensuring that no two papers are the same!

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check [issues page](https://github.com/your-username/SmartExamGen/issues).

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 📬 Contact

📧 [tiwariadwait3gmail.com](mailto:your.email@example.com)  
🔗 [www.linkedin.com/in/adwait-tiwari-3ba40a214](https://linkedin.com/in/yourprofile)  

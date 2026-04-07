## MERN Advanced Auth System (OTP + Session)
A professional-grade authentication and authorization system built with the MERN stack, focusing on security and user experience.

### Key Features
Complete User Lifecycle: Secure Registration, Login, and Session-based Logout.
OTP Email Verification: Account activation via One-Time Passwords (Nodemailer) to ensure valid user emails.
Password Management: Full "Forgot Password" and "Change Password" workflow using OTP verification.
Protected Routes: Custom isAuthenticated middleware to secure sensitive backend endpoints.
CORS & Security: Configured for secure cross-origin requests between React (Vite) and Node.js.

### Tech Stack
Frontend: React (Vite), Tailwind CSS v4
Backend: Node.js, Express.js
Database: MongoDB (Mongoose ODM)
Security: JWT, Session Management, OTP Verification
OS: Developed & Tested on Ubuntu Linux

### API Endpoints

Method       Endpoint                         Description

POST        /user/register                       Create new account & send OTP
POST        /user/verify                         Verify account using OTP
POST        /user/login                          Authenticate user & start session
POST        /user/forgot-password                Send reset OTP to email
POST        /user/change-password/:email        Update password after OTP success
GET         /user/logout                         Clear session (Protected)



### How to Run Locally
Clone the repo: git clone []
Install dependencies: npm install (in both /frontend and /backend)
Set up your .env: Add MONGO_URI, PORT=8000, and GMAIL_APP_PASSWORD.
Run Backend: npm start
Run Frontend: npm run dev

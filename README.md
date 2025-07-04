# 🚗 Vehicle Rental System – Full Stack Project Structure

This project is a vehicle rental platform with three roles: **Admin**, **Driver**, and **Client**. It includes a secure backend (Node.js + Express + MongoDB) and two separate frontend apps (React) for Admin and Users.

---

## 📦 Project Folder Structure

Tours_and_Travels_Admin_MS  
│  
├── **/backend** &nbsp;_# Node.js + Express backend_  
│   ├── **/config** &nbsp;_# Database and Cloudinary configuration_  
│   │   ├── db.js &nbsp;_# MongoDB connection logic_  
│   │   └── cloudinary.js &nbsp;_# Cloudinary config for secure image uploads_  
│   │  
│   ├── **/controllers** &nbsp;_# Logic for handling API routes_  
│   │   ├── adminController.js &nbsp;_# Admin-specific operations_  
│   │   ├── driverController.js &nbsp;_# Driver operations_  
│   │   ├── userController.js &nbsp;_# Client operations_  
│   │   └── uploadController.js &nbsp;_# Secure upload handling_  
│   │  
│   ├── **/middleware** &nbsp;_# Middlewares for authentication and roles_  
│   │   ├── authMiddleware.js &nbsp;_# Validates JWT tokens_  
│   │   └── roleMiddleware.js &nbsp;_# Restricts access based on role (admin, driver, user)_  
│   │  
│   ├── **/models** &nbsp;_# Mongoose schemas_  
│   │   ├── Admin.js &nbsp;_# Admin model_  
│   │   ├── Driver.js &nbsp;_# Driver model_  
│   │   ├── User.js &nbsp;_# Client/user model_  
│   │   └── Car.js &nbsp;_# Car and vehicle details_  
│   │  
│   ├── **/routes** &nbsp;_# Route declarations for Express_  
│   │   ├── adminRoutes.js &nbsp;_# Admin APIs_  
│   │   ├── driverRoutes.js &nbsp;_# Driver APIs_  
│   │   ├── userRoutes.js &nbsp;_# Client APIs_  
│   │   ├── carRoutes.js &nbsp;_# Car-related APIs_  
│   │   └── uploadRoutes.js &nbsp;_# File/document upload APIs_  
│   │  
│   ├── **/utils** &nbsp;_# Utility functions_  
│   │   └── generateToken.js &nbsp;_# JWT token generator with role included_  
│   │  
│   ├── **/uploads** &nbsp;_# Optional: Temporary file storage (if using local disk)_  
│   │  
│   ├── .env &nbsp;_# Environment variables (Mongo URI, JWT secret, etc.)_  
│   ├── server.js &nbsp;_# Main server entry point_  
│   └── package.json &nbsp;_# NPM package file_  
│  
├── **/frontend-admin** &nbsp;_# Admin Dashboard (React App)_  
│   ├── /src &nbsp;_# React source files_  
│   ├── .env &nbsp;_# Admin frontend environment variables_  
│   ├── package.json &nbsp;_# React dependencies_  
│   └── ... &nbsp;_# Components, pages, styles, etc._  
│  
├── **/frontend-user** &nbsp;_# User and Driver App (React App)_  
│   ├── /src &nbsp;_# React source files_  
│   ├── .env &nbsp;_# User frontend environment variables_  
│   ├── package.json &nbsp;_# React dependencies_  
│   └── ... &nbsp;_# Components, pages, styles, etc._  
│  
└── README.md &nbsp;_# Project documentation_

## ✅ Key Features

- 🔐 **Role-Based Access Control (RBAC)** – Separate access for Admin, Driver, and User
- 📁 **Secure Document Uploads** – CNICs, licenses, car images (Cloudinary or S3)
- 📦 **MERN Stack Architecture** – MongoDB, Express.js, React.js, Node.js
- 🚀 **Separate Frontends** – One for admin dashboard, one for user/driver portal
- 📍 **Live Location Tracking (Planned)** – Socket.io or Firebase-based tracking system

---

## 🌍 Deployment Tips

- Host `frontend-user` on `www.yourdomain.com`
- Host `frontend-admin` on `admin.yourdomain.com`
- Host `backend` on `api.yourdomain.com` or any subdomain

---

## 🧪 API Testing

Use [Postman](https://www.postman.com/) to test backend routes:

- Signup/Login for all roles
- Document uploads
- Car approval flows
- Booking flow and live updates

---

Feel free to modify the structure based on your deployment or hosting preferences!

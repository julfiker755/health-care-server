# Health Care - Backend

A powerful and scalable hospital management RESTful API developed with **Express.js**, **TypeScript**, **Prisma ORM**, and **MySQL**. The backend supports robust features such as **JWT authentication**, **Stripe integration**, **Multer image uploads**, and advanced **analytics** for efficient healthcare administration.

---

## 📦 Frontend Repository

Looking for the frontend implementation?
Visit the **[Health Care Website](https://github.com/julfiker755/health-care-website)** on GitHub.

---

## 🚀 Features Overview

### 🔐 Authentication & Authorization

* **JWT-based Authentication**: Includes access and refresh token mechanisms
* **Role-Based Access Control**: Admin, Doctor, and Patient roles
* **Password Security**: Secure hashing using bcrypt
* **Reset Flow**: Email-based password reset with OTP verification

### 🩺 Healthcare Management

* **Doctor Panel**: View assigned patients and relevant records
* **Patient Records**: Manage personal and medical information
* **Order Handling**: Place and track orders for medicines and services
* **User Profiles**: Registration, update, and management

### 💳 Payments

* **Stripe Integration**: Seamless and secure online payments
* **Live Transaction Verification**: Ensure successful payments in real-time
* **Automated Status Updates**: Reflects order status changes post-payment

### 🛡️ Security

* **Schema Validation**: Using Zod for request and response validation
* **Sensitive Data Encryption**: Secure storage of confidential credentials
* **Protected Routes**: Role-checking middleware guards sensitive endpoints
* **CORS Policy**: Enables controlled cross-origin API access

---

## 🌐 Live API

Explore and test the deployed API:

```
https://health-care-server1.vercel.app/
```

---

## 🛠️ Getting Started

Follow the steps below to run the project locally.

### Prerequisites

Ensure you have the following installed:

* Node.js (v16+)
* MySQL
* npm

### Installation Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/julfiker755/health-care-server.git
   cd health-care-server
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   ```bash
   cp .env.example .env
   ```

4. **Generate Prisma client and run migrations**:

   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. **Start the development server**:

   ```bash
   npm run dev
   ```

---

## 📁 Tech Stack

* **Backend**: Express.js, TypeScript
* **ORM**: Prisma
* **Database**: MySQL
* **Authentication**: JWT (access & refresh), bcrypt
* **Payment Gateway**: Stripe
* **File Uploads**: Multer
* **Validation**: Zod
* **Deployment**: Vercel

---

## 📬 Feedback

Found an issue or have suggestions? Feel free to open an issue or create a pull request on the [GitHub repository](https://github.com/julfiker755/health-care-server).

---

> Built with ❤️ for modern healthcare solutions.


# **MeetlinkO Backend — API for Travel Matching Platform**

MeetlinkO Backend is a secure and scalable server built with **Node.js**, **Express.js**, **Prisma ORM**, and **MongoDB**. It powers the MeetlinkO platform by providing authentication, user management, travel plan features, payment subscriptions, webhook handling, and admin functionalities.

This backend is fully optimized for performance, clean architecture, and future scalability.

---

## 🚀 **Features**

### **🔐 Authentication**

* User registration & login
* JWT-based authentication
* Secure password hashing (bcrypt)
* Protected routes using middleware

### **👤 User Management**

* Profile creation
* Avatar image update
* Travel interest & visited countries
* User verification after subscription

### **🗺️ Travel Plans API**

* Create travel plans
* Explore all travel plans
* Get plan by ID
* Update & delete plan (admin/user role based)

### **🤝 Travel Buddy Matching**

* Explore travelers' profiles
* Match based on destination, interests & date
* Real-time suggestions

### **💳 Subscription System**

* Weekly / Monthly / Yearly Plan
* Stripe Checkout Integration
* Stripe Webhook to update payment status
* Verified badge assignment after payment success

### **📊 Admin API**

* Manage users
* Manage travel plans
* Manage subscriptions
* View all payments

### **🛡️ Security**

* Rate limiting
* Role-based access control
* Input validation
* Secure webhook route
* HTTPS-ready deployment

---

## 🧰 **Tech Stack**

* **Node.js**
* **Express.js**
* **Prisma ORM**
* **MongoDB**
* **Stripe**
* **JWT**
* **Zod / Joi Validation**
* **Multer (for image upload)**

---

## 📁 **Folder Structure**

```
/server
│── src
│   ├── config
│   │   └── prisma.ts
│   ├── controllers
│   ├── services
│   ├── middlewares
│   ├── routes
│   ├── utils
│   └── app.ts
│── prisma
│   └── schema.prisma
│── package.json
│── .env
```

---

## 🔑 **Environment Variables**

Create a `.env` file in the backend root:

```
DATABASE_URL=mongodb+srv://...
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=your_stripe_key
WEBHOOK_SECRET=your_webhook_key
FRONTEND_URL=http://localhost:3000
```

---

## ⚙️ **Installation**

### **1. Clone the Backend Repo**

```sh
git clone https://github.com/yourname/meetlinko-backend.git
cd meetlinko-backend
```

### **2. Install Dependencies**

```sh
npm install
```

### **3. Prisma Setup**

```sh
npx prisma migrate dev --name init
```

### **4. Start Development Server**

```sh
npm run dev
```

---

## 📌 **API Endpoints Overview**

### **Auth**

```
POST /auth/register
POST /auth/login
GET /auth/me
```

### **Users**

```
GET /users
GET /users/:id
PATCH /users/update
PATCH /users/avatar
```

### **Travel Plans**

```
POST /plans
GET /plans
GET /plans/:id
PATCH /plans/:id
DELETE /plans/:id
```

### **Subscriptions**

```
POST /payment/create-checkout-session
POST /webhook   (Stripe Webhook)
GET /payment/history
```

### **Admin**

```
GET /admin/users
GET /admin/payments
DELETE /admin/user/:id
```

---

## 💳 **Stripe Webhook Setup**

Stripe requires **raw body**:

```ts
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  paymentController.handleWebhook
);
```

Webhook example:

```ts
if (event.type === "checkout.session.completed") {
  await prisma.payment.update({
    where: { id: paymentId },
    data: { status: "PAID" }
  });

  await prisma.user.update({
    where: { id: userId },
    data: { verified: true }
  });
}
```

---

## 🧪 **Testing**

You can test APIs using:

* Postman
* Thunder Client
* Insomnia

---

## 📦 **Deployment Guide**

### **Backend Deployment Options**

* Render
* Railway
* Vercel Serverless Function
* AWS EC2
* DigitalOcean Droplet

### **Steps**

1. Set environment variables on hosting platform
2. Use **Prisma MongoDB** connection
3. Add Stripe Webhook endpoint
4. Deploy frontend with correct API URL

---

## 🤝 **Contributing**

Pull requests are welcome!
For major improvements, open an issue first.









✨ L'AURA Salon - Luxury Booking Platform
(Optional: Replace with an actual screenshot of your app)

A bespoke, full-stack salon management and appointment booking system. Built to provide a premium user experience for clients and powerful, intuitive management tools for salon administrators.

🌟 Key Features
💅 For the Client
Dynamic Booking Engine: Intelligently calculates available time slots based on service duration, stylist availability, and existing appointments to prevent double-booking.

Personalized Dashboard: Clients can view and track their upcoming and past appointments.

Immersive UX: Features a masonry-style visual gallery, smooth scrolling, skeleton loading states, and sleek toast notifications.

Responsive Design: A fully responsive, dark-themed luxury UI built with Tailwind CSS.

👑 For the Admin (Salon Manager)
Master Schedule: A comprehensive dashboard to view all bookings, filterable by status (Pending, Confirmed, Completed, Cancelled).

One-Click Management: Instantly update appointment statuses with real-time UI feedback.

Service Menu Control: Add and manage salon services, pricing, and durations directly from the dashboard.

Staff Onboarding: Create new secure accounts for incoming stylists and admins.

🔒 Core Architecture
Role-Based Access Control: Secure routes ensuring clients only see their data, while admins have full managerial access.

JWT Authentication: Stateless, secure login sessions.

Decoupled Architecture: A standalone Next.js frontend communicating with a RESTful Express.js backend.

🛠️ Tech Stack
Frontend:

⚛️ Next.js (App Router) - React Framework

🔷 TypeScript - Type Safety

🎨 Tailwind CSS - Utility-first Styling

🍞 Sonner - Toast Notifications

🛜 Axios - HTTP Client

Backend:

🟢 Node.js & Express - Server Framework

🍃 MongoDB & Mongoose - Database & ORM

🔑 JSON Web Tokens (JWT) & Bcrypt - Auth & Hashing

🚀 Getting Started
Prerequisites
Make sure you have the following installed on your machine:

Node.js (v16 or higher)

A MongoDB account and cluster URI

1. Clone the Repository
Bash
git clone https://github.com/YOUR_USERNAME/salon-platform.git
2. Backend Setup
Open a terminal and navigate to the backend directory:

Bash
cd salon-backend
npm install
Create a .env file in the root of the salon-backend folder:

Code snippet
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
CLIENT_URL=http://localhost:3000
Seed the Database (Optional but recommended):
Populate the database with an Admin, Stylists, Services, and sample appointments.

Bash
npm run seed
Start the backend server:

Bash
npm run dev
3. Frontend Setup
Open a new terminal window and navigate to the frontend directory:

Bash
cd salon-frontend
npm install
Create a .env.local file in the root of the salon-frontend folder:

Code snippet
NEXT_PUBLIC_API_URL=http://localhost:5000
Start the frontend development server:

Bash
npm run dev
4. View the App
Open http://localhost:3000 in your browser.

If you ran the seeder, you can log in as Admin using admin@laura.com and password password123

Here is a complete, professional, and visually appealing README.md for your project. You can copy and paste this directly into a README.md file at the root of your project (or in both the frontend and backend folders if you prefer to keep them separate).

✨ L'AURA Salon - Luxury Booking Platform
(Optional: Replace with an actual screenshot of your app)

A bespoke, full-stack salon management and appointment booking system. Built to provide a premium user experience for clients and powerful, intuitive management tools for salon administrators.

🌟 Key Features
💅 For the Client
Dynamic Booking Engine: Intelligently calculates available time slots based on service duration, stylist availability, and existing appointments to prevent double-booking.

Personalized Dashboard: Clients can view and track their upcoming and past appointments.

Immersive UX: Features a masonry-style visual gallery, smooth scrolling, skeleton loading states, and sleek toast notifications.

Responsive Design: A fully responsive, dark-themed luxury UI built with Tailwind CSS.

👑 For the Admin (Salon Manager)
Master Schedule: A comprehensive dashboard to view all bookings, filterable by status (Pending, Confirmed, Completed, Cancelled).

One-Click Management: Instantly update appointment statuses with real-time UI feedback.

Service Menu Control: Add and manage salon services, pricing, and durations directly from the dashboard.

Staff Onboarding: Create new secure accounts for incoming stylists and admins.

🔒 Core Architecture
Role-Based Access Control: Secure routes ensuring clients only see their data, while admins have full managerial access.

JWT Authentication: Stateless, secure login sessions.

Decoupled Architecture: A standalone Next.js frontend communicating with a RESTful Express.js backend.

🛠️ Tech Stack
Frontend:

⚛️ Next.js (App Router) - React Framework

🔷 TypeScript - Type Safety

🎨 Tailwind CSS - Utility-first Styling

🍞 Sonner - Toast Notifications

🛜 Axios - HTTP Client

Backend:

🟢 Node.js & Express - Server Framework

🍃 MongoDB & Mongoose - Database & ORM

🔑 JSON Web Tokens (JWT) & Bcrypt - Auth & Hashing

🚀 Getting Started
Prerequisites
Make sure you have the following installed on your machine:

Node.js (v16 or higher)

A MongoDB account and cluster URI

1. Clone the Repository
Bash
git clone https://github.com/YOUR_USERNAME/salon-platform.git
2. Backend Setup
Open a terminal and navigate to the backend directory:

Bash
cd salon-backend
npm install
Create a .env file in the root of the salon-backend folder:

Code snippet
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
CLIENT_URL=http://localhost:3000
Seed the Database (Optional but recommended):
Populate the database with an Admin, Stylists, Services, and sample appointments.

Bash
npm run seed
Start the backend server:

Bash
npm run dev
3. Frontend Setup
Open a new terminal window and navigate to the frontend directory:

Bash
cd salon-frontend
npm install
Create a .env.local file in the root of the salon-frontend folder:

Code snippet
NEXT_PUBLIC_API_URL=http://localhost:5000
Start the frontend development server:

Bash
npm run dev
4. View the App
Open http://localhost:3000 in your browser.

If you ran the seeder, you can log in as Admin using admin@laura.com and password password123.

📂 Folder Structure
📦 L'AURA Salon Project
 ┣ 📂 salon-backend
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 controllers   # Business logic (Auth, Appointments, Services)
 ┃ ┃ ┣ 📂 middleware    # JWT verification & Admin guards
 ┃ ┃ ┣ 📂 models        # Mongoose Database Schemas
 ┃ ┃ ┣ 📂 routes        # Express API endpoints
 ┃ ┃ ┣ 📜 seeder.ts     # Script to populate mock data
 ┃ ┃ ┗ 📜 server.ts     # App entry point
 ┃ ┗ 📜 .env            # Backend secrets
 ┃
 ┗ 📂 salon-frontend
   ┣ 📂 src
   ┃ ┣ 📂 app
   ┃ ┃ ┣ 📂 (auth)      # Grouped Login/Register routes
   ┃ ┃ ┣ 📂 admin       # Protected Admin pages (Dashboard, Staff, Services)
   ┃ ┃ ┣ 📂 client      # Protected Client pages (Appointments, Book)
   ┃ ┃ ┣ 📂 gallery     # Public Gallery page
   ┃ ┃ ┗ 📜 page.tsx    # Public Landing Page
   ┃ ┣ 📂 components    # Reusable UI (Navbar, Route Protectors, Skeletons)
   ┃ ┗ 📂 lib           # Utilities (Axios instance with interceptors)
   ┗ 📜 .env.local      # Frontend environment variables
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

# 💸 Finance Tracker App
**A modern full-stack finance tracker that helps users manage their income and expenses with a beautiful UI, secure authentication, and insightful visualizations. Built with React, TailwindCSS, and a robust Express/PostgreSQL backend.**


**🚀 Features**
Expense and income tracking

Interactive charts and analytics using Recharts

Modern and responsive UI with Radix UI and TailwindCSS

Secure backend with Express, PostgreSQL, and Helmet

Input validation with React Hook Form + Zod

Emoji support for transaction tags

Smooth animations and polished user experience


**🖼️ Frontend**
Built with React and TailwindCSS for a fast, interactive user experience.

Tech Stack & Dependencies
Routing: react-router-dom

Forms & Validation: react-hook-form, zod, @hookform/resolvers

UI Components: @radix-ui/*, lucide-react

Charts: recharts

HTTP Client: axios

Animations: motion

Utilities: clsx, class-variance-authority, tailwind-merge, tailwindcss-animate

Emoji Picker: emoji-picker-react


**🛠️ Backend**
Node.js backend built with Express and connected to a PostgreSQL database using pg.

Tech Stack & Dependencies
Server Framework: express

Authentication: jsonwebtoken, bcrypt

Security: helmet, cors, compression

Environment Management: dotenv

UUIDs: uuid

Development Tools: nodemon

HTTP Client (internal): axios


**📦 Installation**
- git clone https://github.com/your-username/finance-tracker.git
- cd finance-tracker

**Install frontend dependencies**
- cd client
- npm install

**Install backend dependencies**
- cd ../server
- npm install

**🔐 Environment Variables**
Create a .env file in the /server directory:
- PORT=5000
- DATABASE_URL=your_postgres_url
- JWT_SECRET=your_jwt_secret

**🧪 Running the App**
- cd client
- npm run dev

- cd server
- npm run dev




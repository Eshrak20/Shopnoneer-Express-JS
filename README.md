# 🏠 Shopnoneer Express Backend

> A modern, scalable **RESTful API** for managing properties, authentication, and file uploads for the **Shopnoneer** platform.

---

## 📌 Quick Links

- 🌐 **Backend Live API:** [https://shopnoneer-express-js.vercel.app](https://shopnoneer-express-js.vercel.app)  
- 💻 **Frontend Live:** [https://shopnoneer.netlify.app](https://shopnoneer.netlify.app)  
- 📦 **GitHub Repo:** *[Add your repo link here]*  

---

## 🛠️ Tech Stack

- **⚙️ Backend:** Node.js, Express, TypeScript  
- **🗄️ Database:** MongoDB + Mongoose  
- **🔐 Authentication:** JWT, Sessions, Passport.js (Google OAuth + Local)  
- **☁️ File Uploads:** Multer + Cloudinary  
- **✅ Validation:** Zod  
- **🧹 Code Quality:** ESLint, TypeScript-ESLint  

---

## 🚀 Getting Started

### Clone the repository
```bash
git clone <your-repo-url>
cd shopnoneer-express-backend
npm install
npm run dev
npm run build
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
| Method | Endpoint                     | Access  | Description            |
| ------ | ---------------------------- | ------- | ---------------------- |
| POST   | `/auth/register`             | Public  | Register new user      |
| POST   | `/auth/login`                | Public  | Login with email/pass  |
| GET    | `/auth/google`               | Public  | Google OAuth login     |
| PATCH  | `/user/update-profile`       | Private | Update profile info    |
| PATCH  | `/user/update-profile-image` | Private | Update profile picture |


| Method | Endpoint           | Access | Description          |
| ------ | ------------------ | ------ | -------------------- |
| POST   | `/property/create` | Admin  | Create new property  |
| GET    | `/property/all`    | Public | Get all properties   |
| GET    | `/property/:id`    | Public | Get property details |
| PATCH  | `/property/:id`    | Admin  | Update property info |
| DELETE | `/property/:id`    | Admin  | Delete property      |
| Method | Endpoint       | Access  | Description          |
| ------ | -------------- | ------- | -------------------- |
| POST   | `/upload/file` | Private | Upload file to Cloud |


| Folder/File            | Path                        | Description                                     |
| ---------------------- | --------------------------- | ----------------------------------------------- |
| `app/modules/auth`     | `src/app/modules/auth/`     | Authentication logic (JWT, Google OAuth, Local) |
| `app/modules/user`     | `src/app/modules/user/`     | User controllers & services                     |
| `app/modules/property` | `src/app/modules/property/` | Property CRUD operations                        |
| `app/middlewares`      | `src/app/middlewares/`      | Auth & error middlewares                        |
| `config`               | `src/config/`               | DB & environment configs                        |
| `utils`                | `src/utils/`                | Utility helpers                                 |
| `server.ts`            | `src/server.ts`             | Main entry point                                |



Do you also want me to include **example API request/response (like sample `POST /auth/login` body & response)** inside the README for quick testing?


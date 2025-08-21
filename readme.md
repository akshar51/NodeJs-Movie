# 🎬 NodeJs-Movie

A complete **Node.js + Express + MongoDB Movie Management Application** that allows you to **add, edit, delete, and list movies** with trailer management, image uploads, and EJS-powered views. The project follows an **MVC architecture** for clean code separation.

---

## 🚀 Features

- 📌 Add, Edit, Delete, and List Movies  
- 🎞 Manage Movie Trailers (YouTube links or uploaded files)  
- 🖼 Image Uploads (Posters, Thumbnails) with Multer  
- 🗂 Organized MVC folder structure  
- 🛠 MongoDB (Mongoose) for database operations  
- 🎨 EJS Views with Bootstrap for UI  
- 🔐 Middleware for image handling and errors  

---

## 📂 Folder Structure

```
NodeJs-Movie/
├── assets/        # Static files (CSS, JS, images) used in EJS views
├── configs/       # Configuration (e.g., MongoDB connection)
├── controllers/   # Business logic for Movies, Trailers, Home
├── middleware/    # Custom middleware (file upload, error handling)
├── models/        # Mongoose schemas (Movie, Trailer, User if added)
├── routers/       # Express route definitions grouped by feature
├── uploads/       # Uploaded files (posters, thumbnails)
├── views/         # EJS templates for UI
│   ├── pages/     # Full page views (addMovie, listMovie, trailers, etc.)
│   └── partials/  # Reusable partials (header, footer, navbar)
├── index.js       # Entry point, sets up Express server
├── package.json   # Dependencies and project metadata
└── .env           # Environment variables (DB URI, PORT, etc.)
```

---

## 📖 Detailed Documentation of Each Folder

### 1️⃣ **`assets/`**
- Contains static frontend resources:
  - **CSS** → Custom styling, Bootstrap overrides.
  - **JS** → Frontend interactivity (form validation, UI tweaks).
  - **Images** → Default posters, app icons.

---

### 2️⃣ **`configs/`**
- Houses configuration files.
- Example: **`db.js`**  
  Connects to MongoDB using Mongoose.

```js
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ DB Connection Failed:", err));
```

---

### 3️⃣ **`controllers/`**
Controls app logic, separating routes from DB queries.

#### 🎬 Movie Controller (`movie.controller.js`)
- **viewAddMovie** → Render add movie page  
- **addMovie** → Save new movie to DB  
- **viewListMovie** → Fetch & display all movies  
- **editMovie** → Render edit page with existing data  
- **updateMovie** → Update DB record  
- **deleteMovie** → Remove movie  

#### 🎞 Trailer Controller (`trailer.controller.js`)
- **addTrailer** → Render trailer page  
- **createTrailer** → Save trailer info (URL/thumbnail)  
- **listTrailers** → Show all trailers  

#### 🏠 Home Controller
- Aggregates movie data and renders dashboard.

---

### 4️⃣ **`middleware/`**
Reusable logic inserted in request lifecycle.

#### 📸 `image.js` → Handles image uploads via Multer.
Defines storage destination, filename, and filters.

```js
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });
module.exports = { upload };
```

#### ⚠️ `error.js` → Central error handler
Returns friendly messages or renders error pages.

---

### 5️⃣ **`models/`**
Database schemas using Mongoose.

#### 🎬 Movie Model (`movieSchema.js`)
```js
const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema({
  title: String,
  description: String,
  year: Number,
  genre: String,
  poster: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Movie", movieSchema);
```

#### 🎞 Trailer Model (`trailerSchema.js`)
```js
const mongoose = require("mongoose");
const trailerSchema = new mongoose.Schema({
  title: String,
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
  url: String,
  thumbnail: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Trailer", trailerSchema);
```

---

### 6️⃣ **`routers/`**
Defines app endpoints.

#### 🎬 `movie.routes.js`
- `/addMovie` → Render form  
- `/list` → List all movies  
- `/delete/:id` → Delete movie  
- `/edit/:id` → Edit movie  
- `/update/:id` → Update movie  

#### 🎞 `trailer.routes.js`
- `/addTrailer` → Render form  
- `/createTrailer` → Save trailer  
- `/trailers` → List trailers  

#### 🏠 `home.routes.js`
- `/admin` → Dashboard  
- `/` → Homepage  

---

### 7️⃣ **`uploads/`**
- Stores uploaded images/videos (movie posters, thumbnails).  
- Managed by Multer middleware.  
- Ignored in `.gitignore`.

---

### 8️⃣ **`views/`**
Contains EJS templates.

#### 📄 Pages
- `addMovie.ejs` → Form for new movie  
- `listMovie.ejs` → Table view of movies  
- `editMovie.ejs` → Form for editing existing movie  
- `addTrailers.ejs` → Add trailers  
- `dashboard.ejs` → Admin dashboard  

#### 🔁 Partials
- `header.ejs`  
- `footer.ejs`  
- `navbar.ejs`  

Used with:
```ejs
<%- include('partials/header') %>
```

---

### 9️⃣ **`index.js`**
Main entry point.  
Loads Express, DB, middleware, routers, and views.  
Starts the server.

```js
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
require("./configs/db");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("assets"));
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));

// Routes
const movieRouter = require("./routers/movie.routes");
app.use("/", movieRouter);

app.listen(process.env.PORT || 3000, () =>
  console.log(`🚀 Server running on http://localhost:${process.env.PORT || 3000}`)
);
```

---

### 🔟 **`package.json`**
Defines dependencies like:
- **express** → Web framework  
- **mongoose** → MongoDB ORM  
- **ejs** → Template engine  
- **multer** → File uploads  
- **dotenv** → Env management  

Scripts:
```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```

---

## ⚙️ Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/akshar51/NodeJs-Movie.git
cd NodeJs-Movie
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create `.env` File
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/moviesdb
```

### 4. Run Project
```bash
npm run dev
```

Server runs at: **http://localhost:3000**

---

## 📊 MVC Architecture

- **Model** → Defines database schema (Movie, Trailer).  
- **View** → EJS templates for UI.  
- **Controller** → Business logic connecting models and views.  
- **Router** → Maps URL requests to controllers.  

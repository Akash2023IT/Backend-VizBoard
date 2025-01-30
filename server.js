const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");


dotenv.config();

const { mongoURI } = require("./config");
const authRoutes = require("./routes/Auth");
const projectRoutes = require("./routes/Projects");
const taskRoutes = require("./routes/tasks");

const app = express();
const PORT = process.env.PORT || 5000;  


app.use(cors({
    //origin: 'http://localhost:5175',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
//app.use(express.static(path.join(__dirname, "public")));


app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


mongoose
  .connect(mongoURI) 
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));

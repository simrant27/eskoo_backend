const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const noticeRoutes = require("./routes/noticeRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// Enable CORS
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use("/api/notices", noticeRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/student", studentRoutes);

app.use("/uploads", express.static("./assets/uploads_notice"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

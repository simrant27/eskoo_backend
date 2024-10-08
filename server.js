const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const noticeRoutes = require("./routes/noticeRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const studentRoutes = require("./routes/studentRoutes");
const parentRoutes = require("./routes/parentRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const materialRoutes = require("./routes/materialroutes");

const adminRoutes = require("./routes/adminRoutes");
const dashboardRoutes = require("./routes/dashboardRoute");

const feeRoutes = require("./routes/feeRoutes");
const resultRoutes = require("./routes/resultRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// Enable CORS
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.json());
app.use(express.static("uploads"));
app.use("/api/notices", noticeRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/parent", parentRoutes);
app.use("/api/login", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Static folder to serve uploaded files
app.use(express.static("uploads"));
// Routes
app.use("/api/materials", materialRoutes);


// Routes
app.use("/api/fees", feeRoutes);
app.use("/api/result", resultRoutes);
app.use("/api", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require("express");
const connectDB = require("./config/db");

const noticeRoutes = require("./routes/noticeRoutes");

const app = express();

// Connect to MongoDB
connectDB();

app.use(express.json());

app.use("/api/notices", noticeRoutes);
app.use("/uploads", express.static("./assets/uploads_notice"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

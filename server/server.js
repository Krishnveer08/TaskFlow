require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const app = require("./app");
const connectDB = require("./config/db");

// Connect Database
connectDB();
app.use("/api/users", userRoutes);
// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

// Bring in modules.
const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

// instantiation of the application object
const app = express();

// Database connection.
connectDB();

// Express middleware.
app.use(express.json({ extended: false }));

// Define routes.
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/projects", require("./routes/projects"));

app.use(express.static("client/build"));

app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
);

// Server port for the backend.
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));

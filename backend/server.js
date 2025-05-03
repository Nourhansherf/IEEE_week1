const express = require("express");
const cors = require("cors");
const db = require("./db");
const bookRoutes = require("./routes/books");

const app = express();
app.use(cors());
app.use(express.json());

// Use book routes
app.use("/api/books", bookRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
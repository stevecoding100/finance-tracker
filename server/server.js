const { client, createTables } = require("./database/db");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const compression = require("compression");
const userRoutes = require("./routes/authRoutes");
const goalRoutes = require("./routes/goalRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

dotenv.config();

const app = express();

//✅ Why?
// Automatically compresses JS, HTML, CSS, and API responses.
// Reduces file sizes by up to 80%.
app.use(compression()); // Enables Gzip/Brotli
app.use(express.static("build")); // Serve static files

// Middleware
app.use(helmet());
app.use(bodyParser.json());
app.use(
    cors({
        origin: "*", // Allow all origins
        methods: ["GET", "POST", "PUT", "DELETE"], // Allow all methods
        allowedHeaders: "Content-Type, Authorization",
    })
);

// Mount Routes
app.use("/auth", userRoutes);
app.use("/goal", goalRoutes);
app.use("/transaction", transactionRoutes);

app.get("/", (req, res) => {
    res.send("Personal Finance Tracker API is running!");
});

// Start Server
const init = async () => {
    try {
        console.log("connecting to database");
        await client.connect();
        console.log("connected to database");
        // await createTables();
        // console.log("tables created");
        const port = process.env.PORT || 5432;
        app.listen(port, () => console.log(`listening on port ${port}`));
    } catch (error) {
        console.error("Error creating tables:", error);
    }
};
init();

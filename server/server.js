const { client, createTables } = require("./database/db");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const userRoutes = require("./routes/authRoutes");
const goalRoutes = require("./routes/goalRoutes");

dotenv.config();

const app = express();

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

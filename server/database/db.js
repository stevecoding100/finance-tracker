const pg = require("pg");
require("dotenv").config();

const client = new pg.Client(process.env.DATABASE_URL);

const createTables = async () => {
    const SQL = `
    -- Personal Finance Tracker

    -- Drop tables if they already exist
    DROP TABLE IF EXISTS transactions CASCADE;
    DROP TABLE IF EXISTS goals CASCADE;
    DROP TABLE IF EXISTS categories CASCADE;
    DROP TABLE IF EXISTS users CASCADE;

    -- Users table
    CREATE TABLE users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
 

    -- Transactions table
    CREATE TABLE transactions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        category VARCHAR(255) NOT NULL,
        type VARCHAR(50) CHECK (type IN ('income', 'expense')) NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Goals table
    CREATE TABLE goals (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        emoji VARCHAR(255),
        title VARCHAR(255) NOT NULL,
        target_amount DECIMAL(10, 2) NOT NULL,
        saved_amount DECIMAL(10, 2) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `;
    try {
        await client.query(SQL);
        console.log("Tables created successfully!");
    } catch (error) {
        console.error("Error creating tables:", error);
    }
};

module.exports = { client, createTables };

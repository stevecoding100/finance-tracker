import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import compression from "vite-plugin-compression";

export default defineConfig({
    plugins: [
        react(),
        // ✅ Why?
        // Reduces JS, CSS, and JSON sizes before sending them to the browser.
        // Brotli has better compression than Gzip.
        compression({ algorithm: "gzip" }), // Gzip compression
        compression({ algorithm: "brotliCompress" }), // Brotli compression
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});

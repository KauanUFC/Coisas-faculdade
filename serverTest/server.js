import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url); // Get the resolved path to the file
const __dirname = path.dirname(__filename); // Get the directory name from the filename

// Middleware
app.use(cors());
app.use(express.json()); // Use Express's built-in JSON middleware

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Serve the HTML file at the root route
});

// Handle POST request
app.post('/input', (req, res) => {
    const { input } = req.body; // Extract input from the request body
    console.log(input); // Log the input value to the console
    res.send("Input received"); // Send a response back to the client
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
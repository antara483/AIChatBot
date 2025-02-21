require("dotenv").config();//new
const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
//remove
// const PORT = process.env.PORT || 3000;
// app.get('/api/key', (req, res) => {
//     res.json({ apiKey: process.env.GEMINI_API_KEY });
// });

// app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
// });
//remove
const port = 3000;

// Middleware
app.use(cors());
//remove port
// const PORT = process.env.PORT || 3000;
app.get('/api/key', (req, res) => {
    res.json({ apiKey: process.env.GEMINI_API_KEY });
});

// app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
// });

//remove port
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
 
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed: " + err.message);
    } else {
        console.log("Connected to MySQL Database");
    }
});

// JWT Secret Key

const JWT_SECRET = process.env.JWT_SECRET;
// Nodemailer Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {

       user: process.env.EMAIL_USER,
       pass: process.env.EMAIL_PASS 
    }
});
//remove apiii
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Example usage
app.get('/api/key', (req, res) => {
    res.json({ apiKey: GEMINI_API_KEY });
});
//remove api

// Register User API
app.post("/register", (req, res) => {
    const { username, email, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);
    const query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(query, [username, email, hashedPassword], (err, result) => {
        if (err) {
            return res.json({ status: "error", message: "User already exists or error occurred" });
        }
        res.json({ status: "success", message: "Registration successful!" });
    });
});

// Login User API
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const query = "SELECT * FROM users WHERE username = ?";
    db.query(query, [username], (err, results) => {
        if (err || results.length === 0) {
            return res.json({ status: "error", message: "Invalid username or password" });
        }

        const user = results[0];
        if (bcrypt.compareSync(password, user.password)) {
            // Create token
            const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ status: "success", message: "Login successful!", token });
        } else {
            res.json({ status: "error", message: "Incorrect password" });
        }
    });
});

// Forgot Password API
app.post("/forgot-password", (req, res) => {
    const { email } = req.body;
    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], (err, results) => {
        if (err || results.length === 0) {
            return res.json({ status: "error", message: "Email not found" });
        }

        const user = results[0];
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '15m' });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Reset Password Link',
            text: `http://127.0.0.1:5502/reset-password.html?token=${token}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.json({ status: "error", message: "Error sending email" });
            }
            res.json({ status: "success", message: "Email sent" });
        });
    });
});

// Reset Password API
app.post("/reset-password/:token", (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    //keep and see
    app.get("/reset-password/:token", (req, res) => {
        const { token } = req.params;
        if (!token) {
            return res.status(400).send("Token is missing.");
        }
        res.redirect(`http://127.0.0.1:5502/reset-password.html?token=${token}`);
    });
    
    //keep and see

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.json({ status: "error", message: "Invalid or expired token" });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const query = "UPDATE users SET password = ? WHERE id = ?";
        db.query(query, [hashedPassword, decoded.id], (err, result) => {
            if (err) {
                return res.json({ status: "error", message: "Error resetting password" });
            }
            res.json({ status: "success", message: "Password reset successful" });
        });
    });
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

app.get("/", (req, res) => {
    res.send("Server is running!");
});


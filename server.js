//video
// Add at the top of server.js
// const ffmpeg = require('fluent-ffmpeg');
// const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
// const ffprobeStatic = require('ffprobe-static');
// const fs = require('fs');
// const path = require('path');
// ffmpeg.setFfmpegPath(ffmpegInstaller.path);
// ffmpeg.setFfprobePath(ffprobeStatic.path);

//video
require("dotenv").config();//new
const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
//sentimennt
// const { GoogleGenerativeAI } = require('@google/generative-ai');
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//sentiment
//18-3-2025 video
const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const ffprobeStatic = require('ffprobe-static');
const fs = require('fs');
const path = require('path');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);
ffmpeg.setFfprobePath(ffprobeStatic.path);

//18-3-2025 video

const app = express();
//18-3-2025
app.use(bodyParser.json({ limit: '150mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '150mb' }));
//18-3-2025
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
app.use(cors());//uncomment if  cors middleware does not work
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//video
//Update CORS middleware
// app.use(cors({
//     origin: ['http://localhost:5502', 'http://127.0.0.1:5502'],
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true
// }));
//video
//remove port
// const PORT = process.env.PORT || 3000;
app.get('/api/key', (req, res) => {
    //video
    // res.header('Access-Control-Allow-Origin', req.headers.origin);
    // res.header('Access-Control-Allow-Credentials', 'true');
    //video
    res.json({ apiKey: process.env.GEMINI_API_KEY });
});

// app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
// });

//remove port
// app.use(bodyParser.json());//uncomment it if below code doesnt work
//video
// Increase payload limit to 150MB (adjust as needed)
// app.use(bodyParser.json({ 
//     limit: '150mb', 
//     verify: (req, res, buf) => {
//         req.rawBody = buf
//     }
// }));

// app.use(bodyParser.urlencoded({ 
//     extended: true, 
//     limit: '150mb' 
// }));

// // Add error handling middleware
// app.use((error, req, res, next) => {
//     if (error instanceof SyntaxError && error.status === 413 && error.message.includes('request entity too large')) {
//         return res.status(413).json({ 
//             status: 'error',
//             message: 'File size too large (max 100MB)'
//         });
//     }
//     next();
// });
//video

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
    console.log(req.body,'body')
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
//video
// if (!fs.existsSync('./temp')) {
//     fs.mkdirSync('./temp');
// }
// app.use(bodyParser.json({ limit: '100mb' }));
// app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
// //video
// // // Video Processing Endpoint
// app.post('/process-video', (req, res) => {
//     const { videoData, mimeType } = req.body;
    
//     // Validation
//     if (!videoData || !mimeType.startsWith('video/')) {
//         return res.status(400).json({ error: 'Invalid video data' });
//     }

//     // Process with FFmpeg (Example: Generate thumbnail)
//     const tempFilePath = `./temp/${Date.now()}.mp4`;
//     const thumbnailPath = `./temp/thumbnail-${Date.now()}.png`;
    
//     try {
//         fs.writeFileSync(tempFilePath, Buffer.from(videoData, 'base64'));
        
//         ffmpeg(tempFilePath)
//             .screenshots({
//                 count: 1,
//                 folder: './temp',
//                 filename: path.basename(thumbnailPath),
//                 size: '320x240'
//             })
//             .on('end', () => {
//                 const thumbnail = fs.readFileSync(thumbnailPath);
//                 res.json({
//                     status: 'success',
//                     thumbnail: thumbnail.toString('base64')
//                 });
                
//                 // Cleanup
//                 fs.unlinkSync(tempFilePath);
//                 fs.unlinkSync(thumbnailPath);
//             })
//             .on('error', (err) => {
//                 console.error('FFmpeg error:', err);
//                 res.status(500).json({ error: 'Video processing failed' });
//             });
//     } catch (err) {
//         console.error('File handling error:', err);
//         res.status(500).json({ error: 'File system error' });
//     }
// });
//video
//sentiment
// app.post('/analyze', async (req, res) => {
//     try {
//         const { message } = req.body;
//         if (!message || typeof message !== 'string' || message.trim().length === 0) {
//             return res.status(400).json({ error: 'Invalid message format' });
//         }
//         const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        
//         const prompt = `Analyze the sentiment of this message: "${message}". 
//             Respond ONLY with one of these words: Positive, Negative, or Neutral.`;
//             const result = await model.generateContent(prompt, {
//                 safetySettings: [
//                     {
//                         category: 'HARM_CATEGORY_DANGEROUS',
//                         threshold: 'BLOCK_NONE',
//                     },
//                 ],
//             });
            
//             const text = (await result.response.text())
//                 .trim()
//                 .toLowerCase()
//                 .replace(/[^a-z]/gi, ''); // Remove non-alphabetic characters
    
//             // Validate response
//             const validSentiments = ['positive', 'negative', 'neutral'];
//             const finalSentiment = validSentiments.includes(text) ? text : 'neutral';
            
//             res.json({ sentiment: finalSentiment });
            
//         } catch (error) {
//             console.error('Sentiment analysis error:', error);
//             res.status(500).json({ 
//                 error: 'Sentiment analysis failed',
//                 details: error.message,
//                 fallback: 'neutral'
//             });
//         }
//     });
    
//sentiment

//sentiment
// app.post('/chat', async (req, res) => {
//     try {
//         const { message, sentiment } = req.body;
//         const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        
//         const prompt = `The user is feeling ${sentiment}. 
//             Respond to this message as a helpful assistant: "${message}"`;
        
//         const result = await model.generateContent(prompt);
//         const reply = await result.response.getText();
        
//         res.json({ reply });
//     } catch (error) {
//         console.error('Chat error:', error);
//         res.status(500).json({ error: 'Chat failed' });
//     }
// });
//sentiment

//18-3-2025 video
app.post('/process-video', (req, res) => {
    const { videoData, mimeType } = req.body;
    
    if (!videoData || !mimeType.startsWith('video/')) {
        return res.status(400).json({ error: 'Invalid video data' });
    }

    const tempFilePath = `./temp/${Date.now()}.mp4`;
    const thumbnailPath = `./temp/thumbnail-${Date.now()}.png`;
    
    try {
        fs.writeFileSync(tempFilePath, Buffer.from(videoData, 'base64'));
        
        ffmpeg(tempFilePath)
            .screenshots({
                count: 1,
                folder: './temp',
                filename: path.basename(thumbnailPath),
                size: '320x240'
            })
            .on('end', () => {
                const thumbnail = fs.readFileSync(thumbnailPath);
                res.json({
                    status: 'success',
                    thumbnail: thumbnail.toString('base64')
                });
                
                // Cleanup
                fs.unlinkSync(tempFilePath);
                fs.unlinkSync(thumbnailPath);
            })
            .on('error', (err) => {
                console.error('FFmpeg error:', err);
                res.status(500).json({ error: 'Video processing failed' });
            });
    } catch (err) {
        console.error('File handling error:', err);
        res.status(500).json({ error: 'File system error' });
    }
});
//18-3-2025 video

// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

app.get("/", (req, res) => {
    res.send("Server is running!");
});


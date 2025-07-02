
require("dotenv").config();//new

const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

//18-3-2025 video
const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const ffprobeStatic = require('ffprobe-static');
const fs = require('fs');
const path = require('path');

// doc 11-5
const multer = require('multer');
const pdf = require("pdf-parse");
const mammoth = require("mammoth");
const upload = multer(); // uses in-memory storage
// try and see
const pdfParse = require('pdf-parse'); // Add this
// try and see
// doc 11-5
// voice open app
// const express = require('express');
const { exec } = require('child_process');
// voice open app
ffmpeg.setFfmpegPath(ffmpegInstaller.path);
ffmpeg.setFfprobePath(ffprobeStatic.path);

//18-3-2025 video

const app = express();

// image formt 11-5
// app.use('/uploads', express.static('uploads'));

// image format 11-5
//18-3-2025
app.use(bodyParser.json({ limit: '150mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '150mb' }));
//18-3-2025

// test
const port = 3001;//original is 3000
// test
// Middleware
app.use(cors());//uncomment if  cors middleware does not work
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// const PORT = process.env.PORT || 3000;
app.get('/api/key', (req, res) => {
   
    res.json({ apiKey: process.env.GEMINI_API_KEY });
});

// app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
// });

//remove port

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


// testing
// Example usage
app.get('/api/key', (req, res) => {
    res.json({ apiKey: GEMINI_API_KEY });
});
//remove api
// testing
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


// doc 11-5
app.post('/upload', upload.array('files'), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No files uploaded" });
  }

  const fileContents = [];

  for (let file of req.files) {
    const fileName = file.originalname;
    const mimeType = file.mimetype;
    const buffer = file.buffer;

    let content = '';

    if (mimeType === 'application/pdf') {
      const pdf = require('pdf-parse');
      const data = await pdf(buffer);
      content = data.text;
    } else if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const mammoth = require('mammoth');
      const result = await mammoth.extractRawText({ buffer });
      content = result.value;
    } else {
      content = buffer.toString('utf8'); // plain text or code
    }

    fileContents.push({
      filename: fileName,
      content: content
    });
  }

  res.json(fileContents); // send parsed text back to frontend
});



// doc 11-5

// 
app.post('/upload-doc', upload.single('file'), async (req, res) => {
    const file = req.file;

    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const buffer = file.buffer;
    const ext = file.originalname.split('.').pop().toLowerCase();

    try {
        let content = "";

        if (ext === 'docx') {
            const result = await mammoth.extractRawText({ buffer });
            content = result.value;
        } else {
            return res.status(400).json({ error: "Unsupported file type" });
        }

        res.json({ status: "success", textContent: content });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to process document" });
    }
});

// doc 11-5 2




// uncomment if below video format dont work 10-5-25
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
// uncomment if below video format dont work 10-5-25








// final touch
// test
// const PORT = 3000;
// test
app.get('/open-app/:app', (req, res) => {
    const appName = req.params.app.toLowerCase();

    let command = '';

    if (appName === 'chrome') command = 'start chrome';
    if (appName === 'notepad') command = 'start notepad';
    if (appName === 'whatsapp') command = 'start chrome https://web.whatsapp.com/';

    if (!command) {
        return res.status(404).send("No matching app command found.");
    }

    exec(command, (err) => {
        if (err) return res.status(500).send("Error opening app");
        res.send("App launched");
    });
});






// final touch

// ori uncomment if below code doesnt work
// app.listen(3000, () => console.log("Server running on port 3000"));
// ori uncomment if below code doesnt work
// it is 3000 ori
// app.listen(4000, () => console.log("Server running on port 4000"));
// it is 3000 ori
// voic open app



// whatsapp
const contacts = {
    mummy: '919483064646',
    papa: '919482786946'
   
};

app.get('/send-whatsapp', (req, res) => {
    const name = req.query.name?.toLowerCase();
    const message = encodeURIComponent(req.query.message || "");

    const phone = contacts[name];
    if (!phone) return res.status(404).send("Contact not found");

    const url = `https://web.whatsapp.com/send?phone=${phone}&text=${message}`;
    const command = `start chrome "${url}"`; // for Windows. use "open" for macOS

    exec(command, (err) => {
        if (err) return res.status(500).send("Error opening WhatsApp Web");
        res.send("WhatsApp Web launched");
    });
});

// app.listen(5000, () => console.log("Server running on port 4000"));
// whatsapp

// doc 11-5-25

// app.use(express.json());

const docsPath = path.join(__dirname, 'documents'); // Make sure this folder exists
// try and see
if (!fs.existsSync(docsPath)) {
    fs.mkdirSync(docsPath);
}
// try and see
// List available files
app.get('/list-files', (req, res) => {
    fs.readdir(docsPath, (err, files) => {
        if (err) return res.status(500).json({ error: 'Failed to list files' });
        res.json(files);
    });
});

// Get content of a specific file
app.get("/get-file/:filename", async (req, res) => {
    const filename = req.params.filename;
    const fullPath = path.join(docsPath, filename);

    if (!fs.existsSync(fullPath)) {
        return res.status(404).json({ error: "File not found" });
    }

    const ext = filename.split('.').pop().toLowerCase();

    try {
        const buffer = fs.readFileSync(fullPath);

        let content = "";
        if (ext === "pdf") {
            // uncomment if below
            // const pdfData = await pdfParse(buffer);
            // uncomment if below
            // try see
           const pdfData = await pdfParse(buffer);
            // try and see
            content = pdfData.text;      
        } 
          // voice docx 21-5-25(soon)
        //   else if (ext === "docx") {
        //     const result = await mammoth.extractRawText({ buffer });
        //     content = result.value;
        // }
            // voice docx 21-5-25(soon)
        else {
            content = buffer.toString("utf8");
        }

        res.json({ filename, content });
    } catch (err) {
        console.error("Error reading file:", err);
        res.status(500).json({ error: "Failed to process file" });
    }
});
// interview
// const axios = require('axios');
// const cheerio = require('cheerio');

// app.post("/api/extract-url", async (req, res) => {
//     const { url } = req.body;
//     try {
//         const response = await axios.get(url, { timeout: 10000 });
//         const $ = cheerio.load(response.data);
//         let content = $('body').text().replace(/\s+/g, ' ').trim();
//         content = content.slice(0, 5000); // Trim to reduce token overload
//         res.json({ content });
//     } catch (error) {
//         res.status(500).json({ error: "Failed to fetch or parse URL content." });
//     }
// });

// interview

// voice doc 20-5-25
// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

app.get("/", (req, res) => {
    res.send("Server is running!");
});


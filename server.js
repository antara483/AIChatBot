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
// doc format
// const XLSX = require('xlsx');
// const multer = require("multer");
// const upload = multer(); // Use memory storage

// doc format
// doc format
// const multer = require('multer');
// const pdf = require('pdf-parse');
// const mammoth = require('mammoth');
// doc format
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
// voice open app
// const express = require('express');
const { exec } = require('child_process');
// voice open app
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
// test
const port = 3001;//original is 3000
// test
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

// video format 10-5-25



// app.post('/process-video', async (req, res) => {
//     const { videoData, mimeType } = req.body;

//     // Validate input
//     if (!videoData || !mimeType?.startsWith('video/')) {
//         return res.status(400).json({ 
//             error: 'Invalid video data or format' 
//         });
//     }

//     const tempDir = './temp';
//     const videoPath = path.join(tempDir, `video-${Date.now()}.mp4`);
//     const thumbPath = path.join(tempDir, `thumb-${Date.now()}.jpg`);

//     try {
//         // Ensure temp directory exists
//         if (!fs.existsSync(tempDir)) {
//             fs.mkdirSync(tempDir, { recursive: true });
//         }

//         // Write video file
//         fs.writeFileSync(videoPath, Buffer.from(videoData, 'base64'));

//         // Process with FFmpeg
//         await new Promise((resolve, reject) => {
//             ffmpeg(videoPath)
//                 .on('start', (cmd) => console.log('Executing:', cmd))
//                 .on('error', (err) => {
//                     console.error('FFmpeg error:', err);
//                     reject(err);
//                 })
//                 .on('end', () => resolve())
//                 .screenshot({
//                     count: 1,
//                     folder: tempDir,
//                     filename: path.basename(thumbPath),
//                     size: '320x240'
//                 });
//         });

//         // Read and send thumbnail
//         const thumbData = fs.readFileSync(thumbPath);
//         res.json({
//             success: true,
//             thumbnail: thumbData.toString('base64')
//         });

//     } catch (err) {
//         console.error('Processing failed:', err);
//         res.status(500).json({
//             error: 'Video processing failed',
//             details: err.message
//         });
//     } finally {
//         // Cleanup
//         [videoPath, thumbPath].forEach(file => {
//             if (fs.existsSync(file)) fs.unlinkSync(file);
//         });
//     }
// });
// video format 10-5-25

// voice app open app

// doc format
// const upload = multer({ dest: 'uploads/' });

// // Endpoint to handle file upload
// app.post('/upload', upload.array('files'), async (req, res) => {
//   const fileContents = [];

//   for (let file of req.files) {
//     const filePath = file.path;

//     if (file.mimetype === 'application/pdf') {
//       // Handle PDF file
//       const data = await fs.promises.readFile(filePath);
//       const pdfData = await pdf(data);
//       fileContents.push({ filename: file.originalname, content: pdfData.text });
//     } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
//       // Handle DOCX file
//       const data = await fs.promises.readFile(filePath);
//       const docxData = await mammoth.extractRawText({ buffer: data });
//       fileContents.push({ filename: file.originalname, content: docxData.value });
//     } else if (file.mimetype === 'text/plain' || file.mimetype.includes('javascript') || file.mimetype.includes('python')) {
//       // Handle code files (txt, js, py)
//       const data = await fs.promises.readFile(filePath, 'utf-8');
//       fileContents.push({ filename: file.originalname, content: data });
//     } else {
//       fileContents.push({ filename: file.originalname, content: 'Unsupported file type' });
//     }

//     // Optionally, delete the file after processing
//     await fs.promises.unlink(filePath);
//   }

//   // Send the file content to the frontend
//   res.json(fileContents);
// });
// doc format

// doc format
// app.post('/process-document', async (req, res) => {
//     const { fileData, mimeType, fileName } = req.body;

//     try {
//         let textContent = '';
//         const buffer = Buffer.from(fileData, 'base64');

//         if (fileName.endsWith('.pdf')) {
//             const data = await pdf(buffer);
//             textContent = data.text;
//         } else if (fileName.endsWith('.docx')) {
//             const result = await mammoth.extractRawText({ buffer });
//             textContent = result.value;
//         } else if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
//             // Process Excel files
//             const workbook = XLSX.read(buffer, { type: 'buffer' });
//             workbook.SheetNames.forEach(sheetName => {
//                 const worksheet = workbook.Sheets[sheetName];
//                 textContent += `Sheet: ${sheetName}\n`;
//                 textContent += XLSX.utils.sheet_to_csv(worksheet) + '\n\n';
//             });
//         } else if (fileName.endsWith('.csv')) {
//             textContent = buffer.toString('utf8');
//         } else if (
//             fileName.endsWith('.js') || 
//             fileName.endsWith('.py') ||
//             fileName.endsWith('.java') ||
//             fileName.endsWith('.cpp') ||
//             fileName.endsWith('.c') ||
//             fileName.endsWith('.html') ||
//             fileName.endsWith('.css') ||
//             fileName.endsWith('.php') ||
//             fileName.endsWith('.rb') ||
//             fileName.endsWith('.go') ||
//             fileName.endsWith('.rs') ||
//             fileName.endsWith('.ts') ||
//             fileName.endsWith('.json') ||
//             fileName.endsWith('.xml') ||
//             fileName.endsWith('.sql')
//         ) {
//             // Process code files directly
//             textContent = buffer.toString('utf8');
//         } else if (fileName.endsWith('.txt') || fileName.endsWith('.rtf')) {
//             textContent = buffer.toString('utf8');
//         } else {
//             return res.status(400).json({ error: 'Unsupported document type' });
//         }

//         res.json({ status: 'success', textContent });
//     } catch (error) {
//         console.error('Document processing error:', error);
//         res.status(500).json({ error: 'Document processing failed' });
//     }
// });
// doc format

// doc format

// doc format

// uncomment this voice if whtasapp below doesnt work
// app.get('/open-app/:app', (req, res) => {
    
//     const app = req.params.app;

//     let command = '';
//     if (app === 'chrome') command = 'start chrome'; // Windows
//     if (app === 'notepad') command = 'start notepad';
//     // chrome
//     if (!command) return res.status(400).send("Unknown app");
//     // chrome
//     exec(command, (err) => {
//         if (err) return res.status(500).send("Error opening app");
//         res.send("App launched");
//     });
// });
// uncomment this voice if whtasapp belowdoesnt work


// comment if doesnt work and uncomment above
// app.get('/open-app/:app', (req, res) => {
//     const app = req.params.app.toLowerCase();

//     let command = '';
//     if (app === 'chrome') command = 'start chrome';
//     else if (app === 'notepad') command = 'start notepad';
//     else if (app === 'whatsapp') command = 'start chrome https://web.whatsapp.com/'; // 👈 Only works if WhatsApp is in PATH
//     else return res.status(404).send("No matching app command found.");

//     exec(command, (err) => {
//         if (err) return res.status(500).send("Error opening app");
//         res.send("App launched");
//     });
// });

// comment if doesnt work and uncomment above
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


// doc format
// app.post("/process-document", upload.single("file"), (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ error: "No file uploaded" });
//         }

//         const mimeType = req.file.mimetype;
//         const base64Data = req.file.buffer.toString("base64");

//         return res.json({
//             mime_type: mimeType,
//             data: base64Data
//         });
//     } catch (error) {
//         console.error("Error in /process-document:", error);
//         return res.status(500).json({ error: "Failed to process document" });
//     }
// });
// doc format
// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

app.get("/", (req, res) => {
    res.send("Server is running!");
});


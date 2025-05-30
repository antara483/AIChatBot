
// take photo
// chat history

// chat history
// real time image
document.addEventListener("DOMContentLoaded", function() {
    // real time image
let prompt = document.querySelector("#prompt");
let submitbtn = document.querySelector("#submit");
let chatContainer = document.querySelector(".chat-container");
let imagebtn = document.querySelector("#image");
let image = document.querySelector("#image img");


// real time img
let imageinput = document.getElementById("fileInput"); // Correct selector



// image format


// mic
let micBtn = document.querySelector("#mic");
// real time image
// tts

// tts
const cameraModal = document.getElementById("cameraModal");
const uploadOptionsModal = document.getElementById("uploadOptionsModal");
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const captureBtn = document.getElementById("capture");
const fromComputerBtn = document.getElementById("fromComputer");
// tts
const ttsToggle = document.querySelector('#ttsToggle');
// tts
const takePhotoBtn = document.getElementById("takePhoto");
const closeButtons = document.querySelectorAll(".close");

// real time image
let isListening = false;
let recognition = null;
// voice open app
// video icon 11-5-25
const defaultIcon = document.querySelector(".default-icon");
const videoIcon = document.querySelector(".video-icon");
// video icon 11-5-245

// uncomment if below doc 11-5-25 dont work
let user = {
    message: null,
    file: {
        mime_type: null,
        data: null,
    }
};
// uncomment if below doc 11-5-25 dont work


// doc 11-5-25
// let user = {
//     message: null,
//     file: {
//         mime_type: null,
//         data: null,
//         isDocument: false,
//         isCode: false,
//         isSpreadsheet: false,
//         textContent: null,
//         fileName: null
//     }
// };

// do 11-5-25
// Function to fetch API key from the backend
async function fetchApiKey() {
    try {
        let response = await fetch('http://localhost:3001/api/key'); // Fetch API key securely//uncomment it
        let data = await response.json();
        return data.apiKey;
    } catch (error) {
        console.error("Error fetching API key:", error);
        return null;
    }
}






;



async function generateResponse(aiChatBox) {
    let text = aiChatBox.querySelector(".ai-chat-area");
    let apiKey = await fetchApiKey();

    if (!apiKey) {
        text.innerHTML = "Error: API key not found.";
        return;
    }

    let Api_Url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const parts = [{ text: user.message }];

    // Use decoded file content if available and is a text/code file
    if (user.file && user.file.data && user.file.mime_type.startsWith("text/")) {
        try {
            const decodedText = decodeURIComponent(escape(atob(user.file.data)));
            const filePrompt = `Here is the file content:\n\n\`\`\`\n${decodedText}\n\`\`\`\n\nPlease analyze or explain it.`;
            parts.push({ text: filePrompt });
        } catch (err) {
            console.error("Error decoding file text:", err);
            parts.push({ text: "Note: File content could not be decoded." });
        }
    }
    // Otherwise, fallback to sending raw file (e.g., image/video)
    else if (user.file && user.file.data && user.file.mime_type) {
        parts.push({
            inline_data: {
                mime_type: user.file.mime_type,
                data: user.file.data
            }
        });
    }

    const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts }]
        })
    };

    try {
        const response = await fetch(Api_Url, requestOptions);
        const data = await response.json();

        if (!data.candidates || data.candidates.length === 0) {
            text.innerHTML = "Error: No response from AI.";
            return;
        }

        const apiResponse = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
        text.innerHTML = marked.parse(apiResponse);
        speakText(apiResponse);
    } catch (error) {
        console.error("Error fetching AI response:", error);
        text.innerHTML = "Error: Unable to fetch response.";
    } finally {
        chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: "smooth" });
        resetImageSelection();
    }
}


// java cpp sql 12-5

// doc 11-5-25
// async function generateResponse(aiChatBox) {
//     let text = aiChatBox.querySelector(".ai-chat-area");
//     let apiKey = await fetchApiKey();

//     if (!apiKey) {
//         text.innerHTML = "Error: API key not found.";
//         return;
//     }

//     let Api_Url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

//     // Prepare the request parts
//     const parts = [{ text: user.message }];

//     if (user.file.isDocument && user.file.textContent) {
//         // For documents and code files
//         let prefix = "";
//         if (user.file.isCode) {
//             prefix = "Here is the code content to analyze:\n```\n";
//         } else if (user.file.isSpreadsheet) {
//             prefix = "Here is the spreadsheet data to analyze:\n";
//         } else {
//             prefix = "Here is the document content to analyze:\n";
//         }
        
//         parts.push({ 
//             text: prefix + user.file.textContent + (user.file.isCode ? "\n```" : "")
//         });
//     } else if (user.file.data) {
//         // For images/videos
//         parts.push({ inline_data: {
//             mime_type: user.file.mime_type,
//             data: user.file.data
//         }});
//     }

//     let requestOptions = {
//         method: "POST",
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             "contents": [{ parts }],
//             "generationConfig": {
//                 "maxOutputTokens": 2048
//             }
//         })
//     };

//     try {
//         let response = await fetch(Api_Url, requestOptions);
//         let data = await response.json();

//         if (!data.candidates || data.candidates.length === 0) {
//             text.innerHTML = "Error: No response from AI.";
//             return;
//         }

//         let apiResponse = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
//         text.innerHTML = marked.parse(apiResponse);
//         speakText(apiResponse);
//     } catch (error) {
//         console.error("Error fetching AI response:", error);
//         text.innerHTML = "Error: Unable to fetch response.";
//     } finally {
//         chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: "smooth" });
//         resetImageSelection();
//     }
// }
// doc 11-5-25










// tts
// Function to create a chat message box
function createChatBox(html, classes) {
    let div = document.createElement("div");
    div.innerHTML = html;
    div.classList.add(classes);
    return div;
}

// ... (rest of the code remains the same)
//testing







// doc 11-5
function handleChatResponse(userMessage) {
    if (!userMessage.trim() && !user.file.data) return;

    user.message = userMessage || "Tell me about this file";
    // 28
    saveToChatHistory(user.message);

    // 28

    // Determine file preview (icon + name)
    const filePreviewHTML = user.file.data ? (() => {
        const ext = user.file.fileName?.split('.').pop().toLowerCase();
        const iconMap = {
            pdf: "icons/pdf-icon.svg",
            doc: "icons/word-icon.svg",
            docx: "icons/word-icon.svg",
            txt: "icons/text-icon.svg",
            js: "icons/js-icon.svg",
            py: "icons/python-icon.svg",
            html: "icons/html-icon.svg",
            css: "icons/css-icon.svg",
            java: "icons/java-icon.svg",
            cpp: "icons/cpp-icon.svg",
            sql: "icons/sql-icon.svg"
        };
        const iconSrc = iconMap[ext] || "icons/file-icon.svg";

        return `
            <div class="file-preview">
                <img src="${iconSrc}" class="doc-icon" title="${user.file.fileName || 'Document'}" />
                <div class="file-name">${user.file.fileName || 'Unnamed file'}</div>
            </div>
        `;
    })() : "";

    // Build user chat bubble HTML
    let html = `
        <img src="user.png" alt="User" id="userImage" width="8%">
        <div class="user-chat-area">
            ${user.message}
           ${user.file.data && user.file.mime_type.startsWith("image/") 
    ? `<img src="data:${user.file.mime_type};base64,${user.file.data}" class="chooseimg" />` 
    : filePreviewHTML}

        </div>
    `;

    // Clear prompt field & reset upload icons
    prompt.value = "";
    defaultIcon.hidden = false;
    videoIcon.hidden = true;

    const userChatBox = createChatBox(html, "user-chat-box");
    chatContainer.appendChild(userChatBox);
    chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: "smooth" });

    // Show Gemini response loading + call API
    setTimeout(() => {
        const html = `
            <img src="ai.avif" alt="AI" id="aiImage" width="10%">
            <div class="ai-chat-area">
                <img src="loading.webp" alt="Loading" class="load" width="50px">
            </div>`;
        const aiChatBox = createChatBox(html, "ai-chat-box");
        chatContainer.appendChild(aiChatBox);
        generateResponse(aiChatBox);
    }, 600);
}




// Event listeners
prompt.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleChatResponse(prompt.value);
});

submitbtn.addEventListener("click", () => {
    handleChatResponse(prompt.value);
});




    // real time image
    imagebtn.addEventListener("click", (e) => {
        e.preventDefault();
        uploadOptionsModal.style.display = "block";
    });
    
    // real time image

    // real time image code
    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            cameraModal.style.display = "none";
            uploadOptionsModal.style.display = "none";
            stopCamera();
        });
    });
    
    window.addEventListener("click", (e) => {
        if (e.target === cameraModal) {
            cameraModal.style.display = "none";
            stopCamera();
        }
        if (e.target === uploadOptionsModal) {
            uploadOptionsModal.style.display = "none";
        }
    });
    
    fromComputerBtn.addEventListener("click", () => {
        uploadOptionsModal.style.display = "none";
        imageinput.click();
    });
    
    takePhotoBtn.addEventListener("click", () => {
        uploadOptionsModal.style.display = "none";
        cameraModal.style.display = "block";
        startCamera();
    });
    
    function startCamera() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                video.srcObject = stream;
            })
            .catch(err => {
                alert("Camera access denied or not available.");
            });
        } else {
            alert("Camera not supported.");
        }
    }
    
    function stopCamera() {
        if (video.srcObject) {
            video.srcObject.getTracks().forEach(track => track.stop());
            video.srcObject = null;
        }
    }

    // voice photo 20-5-25
    function openCameraAndCapture() {
    cameraModal.style.display = "block";
    startCamera();

    setTimeout(() => {
        const context = canvas.getContext("2d");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = canvas.toDataURL("image/jpeg");
        const base64Data = imageData.split(",")[1];

        user.file = {
            mime_type: "image/jpeg",
            data: base64Data
        };

        image.src = imageData;
        image.classList.add("choose");

        handleChatResponse("Tell me about this image"); // Auto-send prompt
        cameraModal.style.display = "none";
        stopCamera();
    }, 3500); // Capture after 3.5 seconds
}

    // voice photo 20-5-25
    captureBtn.addEventListener("click", () => {
        const context = canvas.getContext("2d");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const imageData = canvas.toDataURL("image/jpeg");
        const base64Data = imageData.split(",")[1];
    
        user.file = {
            mime_type: "image/jpeg",
            data: base64Data
        };
    
        image.src = imageData;
        // image format
        // handleChatResponse("");  // triggers chat with captured image

        // image format
        image.classList.add("choose");
    
        cameraModal.style.display = "none";
        stopCamera();
    });
    //  test
    window.addEventListener("click", (e) => {
        if (e.target === uploadOptionsModal) {
            uploadOptionsModal.style.display = "none";
        }
    });
    
    // test
    // real time image code

  


//uncomment if below doc code dont work 11-5-25
function resetImageSelection() {
    image.src = `img.svg`;
    image.classList.remove("choose");
    user.file = { mime_type: null, data: null,isVideo:false };//uncomment it if video lines do not work in function resetImageSelection(now uncomment it)
}
// uncomment if below  doc code dont work 11-5-25







// Click event for image upload







micBtn.addEventListener("click", toggleSpeechRecognition);

function toggleSpeechRecognition() {
    if (!isListening) {
        startSpeechRecognition();
    } else {
        stopSpeechRecognition();
    }
}

function startSpeechRecognition() {
    if (!('webkitSpeechRecognition' in window)) {
        alert("Speech recognition is not supported in your browser.");
        return;
    }

    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
        isListening = true;
        micBtn.classList.add("recording");
    };
    // uncmomment if below voice app open doesnt work
    // recognition.onresult = (event) => {
    //     const transcript = event.results[0][0].transcript;
    //     prompt.value = transcript;
    // };
    // uncomment if below voice app open doesnt work
    
    // voie open app
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        console.log("You said:", transcript);
        prompt.value = transcript;

        // nec or not 20-5-25
         recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        if (event.error === "no-speech") {
            alert("No speech detected. Please try again.");
        } else if (event.error === "network") {
            alert("Network error during speech recognition.");
        } else {
            alert(`Speech recognition error: ${event.error}`);
        }
    };
        // nec or not 20-5-25
    // whatsapp
    if (transcript.includes("send whatsapp to")) {
        // Example: "send whatsapp to john saying hello how are you"
        const parts = transcript.split("send whatsapp to")[1].trim().split("saying");
        if (parts.length === 2) {
            const name = parts[0].trim();
            const message = parts[1].trim();

            fetch(`http://localhost:5000/send-whatsapp?name=${encodeURIComponent(name)}&message=${encodeURIComponent(message)}`)
                .then(res => {
                    if (!res.ok) throw new Error("Failed to open WhatsApp");
                    console.log("WhatsApp launched successfully");
                })
                .catch(err => console.error("Error:", err));
        } else {
            alert("Please say: Send WhatsApp to [name] saying [your message]");
        }
    }
    // whatsapp

    // voice take pho 20-5-25
      if (transcript.includes("take photo")) {
        openCameraAndCapture();  // 👈 Add this new function
        return;
    }
    // voice take pho 20-5-25

    // voice doc 20-5-25
//     if (transcript.includes("open document")) {
//     // const match = transcript.match(/open document (.+)/);
//     const match = transcript.match(/open document(?:s)?(?:\s+)?(.+)/i);

// if (match && match[1]) {
//     let filename = match[1].trim()
//         .replace(/\s*dot\s*/g, ".")   // Replace "dot" with "."
//         .replace(/\s+/g, "")         // Remove extra spaces
//         .replace(/[.,!?]+$/, "");
//     console.log("Parsed filename:", filename);


//         fetch(`http://localhost:3001/get-file/${encodeURIComponent(filename)}`)
//             .then(res => res.json())
//             .then(data => {
//                 if (data.content) {
//                     prompt.value = data.content;
//                     user.message = data.content;
//                     handleChatResponse(data.content); // Auto-send to Gemini
//                 } else {
//                     alert("File content not found.");
//                 }
//             })
//             .catch(err => {
//                 console.error("File fetch error:", err);
//                 alert("Could not open the file. Make sure it exists.");
//             });
//         return;
//     } else {
//         alert("Please say: 'open document example.txt'");
//         return;
//     }
// }

// uncomment if below dont work voice docx 21-5-25
if (transcript.includes("open document")) {
    let filenameRaw = transcript
        .replace(/^open\s+documents?/, "")        // remove "open document" or "open documents"
        .replace(/\s*dot\s*/gi, ".")              // "dot pdf" → ".pdf"
        .replace(/\s+/g, "")                      // remove all spaces
        .replace(/[.,!?]+$/, "");                 // remove punctuation
    // uncomment if below 21-5 (soon) dont work
    const filename = filenameRaw.trim().toLowerCase();
       console.log("Parsed filename:", filename);

    fetch(`http://localhost:3001/get-file/${encodeURIComponent(filename)}`)
        .then(res => res.json())
        // uncomment if below 21-5 (soon) dont work

        // voice docx 21-5(soon)
     
        // voice docx 21-5 (soon)
        .then(data => {
            if (data.content) {
                prompt.value = data.content;
                user.message = data.content;
                handleChatResponse(data.content);
            } else {
                alert("File content not found.");
            }
        })
        .catch(err => {
            console.error("File fetch error:", err);
            alert("Could not open the file. Make sure it exists.");
        });
    return;
}
// uncomment if below dont work voice docx 21-5-25






// voice docx 21-5-25


    // voice doc 20-5-24
        // 👇 Paste your voice command action here
        if (transcript.includes("open notepad")) {
            fetch("http://localhost:3001/open-app/notepad");//0ri 4000
        } else if (transcript.includes("open chrome")) {
            fetch("http://localhost:3001/open-app/chrome");//ori 4000
        } else {
            console.log("No matching app command found.");
        }
    };
    
    // voice open app
    recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        if (event.error === "network") {
            alert("Speech recognition network error. Check your internet connection.");
        } else {
            alert(`Speech recognition error: ${event.error}`);
        }
    };
    
    recognition.onend = () => {
        stopSpeechRecognition();
    };

    recognition.start();
}

function stopSpeechRecognition() {
    if (recognition) {
        recognition.stop();
    }
    isListening = false;
    micBtn.classList.remove("recording");
}









//18-3-2025 video
// Video preview handling
function showVideoPreview(file) {
    const videoPreview = document.createElement('video');
    videoPreview.controls = true;
    videoPreview.style.maxWidth = '200px';
    videoPreview.src = URL.createObjectURL(file);
    
    const previewContainer = document.createElement('div');
    previewContainer.className = 'video-preview';
    previewContainer.appendChild(videoPreview);
    
    document.body.appendChild(previewContainer);
}


// real time img















// java cpp,sql 12-5
if (imageinput) {
    imageinput.addEventListener("change", () => {
        const file = imageinput.files[0];
        if (!file) return;

        const fileIconPreview = document.getElementById("fileIconPreview");
        const ext = file.name.split('.').pop().toLowerCase();
        const iconMap = {
            pdf: "icons/pdf-icon.svg",
            doc: "icons/word-icon.svg",
            docx: "icons/word-icon.svg",
            txt: "icons/text-icon.svg",
            js: "icons/js-icon.svg",
            py: "icons/python-icon.svg",
            html: "icons/html-icon.svg",
            css: "icons/css-icon.svg",
            java: "icons/java-icon.svg",
            cpp: "icons/cpp-icon.svg",
            sql: "icons/sql-icon.svg"
        };

        // File size check (100MB max)
        if (file.size > 100 * 1024 * 1024) {
            alert('File size too large (max 100MB)');
            resetImageSelection();
            return;
        }

        const isTextCodeFile = ['txt', 'js', 'py', 'html', 'css', 'java', 'cpp', 'sql'].includes(ext);

        user.file = {
            fileName: file.name,
            mime_type: isTextCodeFile ? "text/plain" : file.type,
            isVideo: file.type.startsWith('video/')
        };

        if (ext === 'docx') {
            // Special handling for docx via backend
            const formData = new FormData();
            formData.append('file', file);

            fetch("http://localhost:3001/upload-doc", {
                method: "POST",
                body: formData
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status === "success") {
                        user.file.data = btoa(unescape(encodeURIComponent(data.textContent)));
                        image.src = iconMap[ext] || "icons/file-icon.svg";
                        fileIconPreview.src = iconMap[ext] || "icons/file-icon.svg";
                        image.classList.add("choose");
                    } else {
                        alert("Failed to process DOCX file.");
                    }
                })
                .catch(err => {
                    console.error("Upload error:", err);
                    alert("Error uploading DOCX file.");
                });
        } else if (isTextCodeFile) {
            // Read text/code content directly
            const reader = new FileReader();
            reader.onload = (e) => {
                const textContent = e.target.result;
                user.file.data = btoa(unescape(encodeURIComponent(textContent)));

                image.src = iconMap[ext] || "icons/file-icon.svg";
                fileIconPreview.src = iconMap[ext] || "icons/file-icon.svg";
                image.classList.add("choose");
            };
            reader.readAsText(file);
        } else {
            // Default: image or video (read as base64)
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64string = e.target.result.split(",")[1];
                user.file.data = base64string;

                if (file.type.startsWith('image/')) {
                    image.src = `data:${file.type};base64,${base64string}`;
                    fileIconPreview.src = `data:${file.type};base64,${base64string}`;
                } else if (user.file.isVideo) {
                    image.src = 'video-icon.svg';
                    fileIconPreview.src = 'video-icon.svg';
                } else {
                    image.src = iconMap[ext] || "icons/file-icon.svg";
                    fileIconPreview.src = iconMap[ext] || "icons/file-icon.svg";
                }

                image.classList.add("choose");
            };
            reader.readAsDataURL(file);
        }
    });
}



            








        







// doc format


document.addEventListener("DOMContentLoaded", () => {
    const fromComputerBtn = document.getElementById("fromComputer");
    const imageinput = document.getElementById("fileInput");
//   uncomment it if below real time image dont work
    // if (fromComputerBtn && imageinput) {
    //   fromComputerBtn.addEventListener("click", () => {
    //     const modal = document.getElementById("uploadOptionsModal");
    //     if (modal) modal.style.display = "none";
    //     imageinput.click(); // ✅ opens file picker
    //   });
    // } else {
    //   console.warn("❗ Missing #fromComputer or #fileInput");
    // }
    //   uncomment it if below real time image dont work

    // real time img
    if (fromComputerBtn && imageinput) {
        fromComputerBtn.addEventListener("click", (e) => {
            e.preventDefault();
            if (uploadOptionsModal) {
                uploadOptionsModal.style.display = "none";
            }
            imageinput.click(); // This will trigger the file selection dialog
        });
    } else {
        console.error("From computer button or file input not found");
    }
    // real time img
  });
  

// 28
const chatHistoryList = document.getElementById("chatHistoryList");

// Load saved history from localStorage
function loadChatHistory() {
    const history = JSON.parse(localStorage.getItem("chatHistory")) || [];
    chatHistoryList.innerHTML = "";
    history.forEach(promptText => {
        const li = document.createElement("li");
        li.textContent = promptText;
        li.style.cursor = "pointer";
        li.addEventListener("click", () => {
            prompt.value = promptText; // Set prompt field
        });
        chatHistoryList.appendChild(li);
    });
}

// Save new prompt to history
function saveToChatHistory(text) {
    if (!text.trim()) return;
    let history = JSON.parse(localStorage.getItem("chatHistory")) || [];
    history.unshift(text); // Add to top
    history = history.slice(0, 10); // Limit to 10 items
    localStorage.setItem("chatHistory", JSON.stringify(history));
    loadChatHistory(); // Refresh display
}
loadChatHistory();

// 28
// real time image
});




// tts

// TTS Variables (add these at the top with your other variables)
let ttsEnabled = true; // Enable TTS by default
let synth = window.speechSynthesis;
let voices = [];
// tts new

// tts new

// Initialize TTS (call this when DOM is loaded)
function initTTS() {
    // Check if browser supports TTS
    if (!synth) {
        console.warn('Text-to-Speech not supported in this browser');
        return;
    }

    // Load available voices
    function loadVoices() {
        voices = synth.getVoices();
        console.log('Available voices:', voices);
    }

    // Some browsers need this event listener
    if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = loadVoices;
    }

    // Initial voice load
    loadVoices();
}

// Speak text with TTS
function speakText(text) {
    if (!ttsEnabled || !synth) return;
    
    // Cancel any ongoing speech
    synth.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    // tts new
    
    // tts new
    
    // Try to find a suitable voice (English preferred)
    utterance.voice = voices.find(v => v.lang.includes('en')) || null;
    utterance.rate = 1.0; // Normal speed
    utterance.pitch = 1.0; // Normal pitch
    utterance.volume = 1.0; // Max volume
    
    utterance.onerror = (event) => {
        console.error('TTS Error:', event);
    };
    
    synth.speak(utterance);
}

// Initialize TTS when page loads
document.addEventListener('DOMContentLoaded', () => {
    initTTS();
    
    // Some browsers need a user interaction to enable TTS
    document.body.addEventListener('click', () => {
        if (voices.length === 0) {
            voices = synth.getVoices();
        }
    }, { once: true });
});


// new
if (ttsToggle) {
    ttsToggle.addEventListener('click', () => {
        ttsEnabled = !ttsEnabled;
        // tts new
       
        // tts new

        updateTtsButton();
        
        // Store preference
        localStorage.setItem('ttsEnabled', ttsEnabled);
        
        // Provide feedback
        speakText(ttsEnabled ? 'Text to speech enabled' : 'Text to speech disabled');
    });

    function updateTtsButton() {
        if (ttsEnabled) {
            ttsToggle.classList.remove('tts-off');
            ttsToggle.title = 'Text-to-Speech: ON (Click to disable)';
        } else {
            ttsToggle.classList.add('tts-off');
            ttsToggle.title = 'Text-to-Speech: OFF (Click to enable)';
        }
    }

    // Load saved preference
    const savedTtsEnabled = localStorage.getItem('ttsEnabled');
    if (savedTtsEnabled !== null) {
        ttsEnabled = savedTtsEnabled === 'true';
    }
    updateTtsButton();
}
















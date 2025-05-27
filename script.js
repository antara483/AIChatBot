
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
// uncomment if below real time dont work
// let imageinput = document.querySelector("#image input");
// uncomment if below real time dont work

// real time img
let imageinput = document.getElementById("fileInput"); // Correct selector

// real time img
// image format
//  imageinput.addEventListener("change", () => {
//     const file = imageinput.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (e) => {
//         const base64Data = e.target.result.split(",")[1];

//         user.file = {
//             mime_type: file.type,
//             data: base64Data
//         };

//         image.src = e.target.result;
//         image.classList.add("choose");

//         // ✅ Call chat immediately
//         handleChatResponse("");  // or pass a default prompt
//     };
//     reader.readAsDataURL(file);
// });

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




// uncomment if below video 11-5-25  doesnt work
// async function generateResponse(aiChatBox) {
//     let text = aiChatBox.querySelector(".ai-chat-area");
//     let apiKey = await fetchApiKey();

//     if (!apiKey) {
//         text.innerHTML = "Error: API key not found.";
//         return;
//     }

//     let Api_Url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

//     let requestOptions = {
//         method: "POST",
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             "contents": [
//                 {
//                     "parts": [
//                         // uncomment format if below line dont work
//                         { "text": user.message },
//                         // uncomment format if below line dont work

//                         // format para
//                         // {
//                         //     "text": `Please answer this question in a well-formatted manner using:
//                         //   - Bullet points
//                         //   - Headings
//                         //   - Step-by-step explanation
//                         //   - Code blocks (if needed)
                          
//                         //   Question: ${user.message}`
//                         //   },
                          
//                         // format para
//                         ...(user.file.data ? [{ "inline_data": user.file }] : [])
//                     ]
//                 }
//             ]
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
//         // uncomment if below format doesnt work
        
//         // text.innerHTML = apiResponse;
//         // uncomment if below format doesnt work

//         // tts
        
//         // tts
//         // format para
//         text.innerHTML = marked.parse(apiResponse);


//         // tts
//          speakText(apiResponse);
//         // tts
//         // format para
//     } catch (error) {
//         console.error("Error fetching AI response:", error);
//         text.innerHTML = "Error: Unable to fetch response.";
//     } finally {
//         chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: "smooth" });
//         resetImageSelection();
//     }
// } 
// uncomment if below video 11-5-25 dont work

// uncomment if below java sql cpp format 12-5-25 dont work
// async function generateResponse(aiChatBox) {
//     let text = aiChatBox.querySelector(".ai-chat-area");
//     let apiKey = await fetchApiKey();

//     if (!apiKey) {
//         text.innerHTML = "Error: API key not found.";
//         return;
//     }

//     let Api_Url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

//     let requestOptions = {
//         method: "POST",
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             "contents": [
//                 {
//                     "parts": [
//                         { "text": user.message },
//                         ...(user.file && user.file.data && user.file.mime_type
//                             ? [{
//                                 inline_data: {
//                                     mime_type: user.file.mime_type,
//                                     data: user.file.data
//                                 }
//                             }]
//                             : [])
//                     ]
//                 }
//             ]
//         })
//     };

//     // Debug log (optional)
//     console.log("Sending request to Gemini:", JSON.stringify(JSON.parse(requestOptions.body), null, 2));

//     try {
//         let response = await fetch(Api_Url, requestOptions);
//         let data = await response.json();

//         if (!data.candidates || data.candidates.length === 0) {
//             text.innerHTML = "Error: No response from AI.";
//             return;
//         }

//         let apiResponse = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
//         text.innerHTML = marked.parse(apiResponse);

//         // Optional TTS
//         speakText(apiResponse);
//     } catch (error) {
//         console.error("Error fetching AI response:", error);
//         text.innerHTML = "Error: Unable to fetch response.";
//     } finally {
//         chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: "smooth" });
//         resetImageSelection();
//     }
// }
// uncomment if below java,cpp,sql  format 12-5-25 dont work

// java cpp sql 12-5
// async function generateResponse(aiChatBox) {
//     let text = aiChatBox.querySelector(".ai-chat-area");
//     let apiKey = await fetchApiKey();

//     if (!apiKey) {
//         text.innerHTML = "Error: API key not found.";
//         return;
//     }

//     const Api_Url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

//     // Prepare parts for the request
//     const parts = [{ text: user.message }];

//     if (user.file?.textContent) {
//         parts.push({
//             text: `Please explain the contents of this file (${user.file.fileName}):\n\n${user.file.textContent}`
//         });
//     } else if (user.file?.data && user.file?.mime_type) {
//         parts.push({
//             inline_data: {
//                 mime_type: user.file.mime_type,
//                 data: user.file.data
//             }
//         });
//     }

//     const requestOptions = {
//         method: "POST",
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             contents: [
//                 {
//                     parts: parts
//                 }
//             ]
//         })
//     };

//     console.log("Sending request to Gemini:", JSON.stringify(JSON.parse(requestOptions.body), null, 2));

//     try {
//         const response = await fetch(Api_Url, requestOptions);
//         const data = await response.json();

//         if (!data.candidates || data.candidates.length === 0) {
//             text.innerHTML = "Error: No response from AI.";
//             return;
//         }

//         const apiResponse = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
//         text.innerHTML = marked.parse(apiResponse);

//         // Optional TTS
//         speakText(apiResponse);
//     } catch (error) {
//         console.error("Error fetching AI response:", error);
//         text.innerHTML = "Error: Unable to fetch response.";
//     } finally {
//         chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: "smooth" });
//         resetImageSelection();
//     }
// }

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



// uncomment if below video format doesnt work 11-5-25
// function handleChatResponse(userMessage)

// {
//     if (!userMessage.trim()) return; // Prevent empty messages
//     // uncomment if below line dont work
//     // user.message = userMessage;
//     // uncomment it if below line dont work

//     // format
//     const basePrompt = userMessage.trim();
// user.message = basePrompt.length > 60
//   ? `Please answer the following clearly and in well-formatted style using bullet points, headers, and code blocks where needed:\n\n${basePrompt}`
//   : basePrompt;

//     // format
// //    format para
// // If message is small-talk, keep it short and casual
// // const smallTalk = ["hello", "hi", "hey", "how are you", "what's up"];
// // const normalizedMessage = userMessage.toLowerCase().trim();

// // if (smallTalk.some(q => normalizedMessage.includes(q))) {
// //     user.message = `Give a short and friendly response to: "${userMessage}"`;
// // }

// // format para


//     //
//     //video
//     // const defaultIcon = document.querySelector('.default-icon');
//     // const videoIcon = document.querySelector('.video-icon');
//     // let fileContent = '';
//     // if (user.file.data) {
//     //     if (user.file.isVideo) {
//     //         fileContent = `
//     //             <div class="video-indicator">
//     //                 <img src="video-icon.svg" class="video-icon-small">
//     //             </div>
//     //         `;
//     //     } else {
//     //         fileContent = `<img src="data:${user.file.mime_type};base64,${user.file.data}" class="chooseimg" />`;
//     //     }
//     // }
//     //video
// //video
// //sentiment
// // user.message = userMessage;
// //sentiment
// let html = `
// <img src="user.png" alt="User" id="userImage" width="8%">
// <div class="user-chat-area">
//     ${user.message}
//  ${user.file.data ? `<img src="data:${user.file.mime_type};base64,${user.file.data}" class="chooseimg" />` : ""}

    
// </div>
// `;
// //video(real code in notepad)
// // Reset icons
// // defaultIcon.hidden = false;//video
// // videoIcon.hidden = true;//video
//     prompt.value = ""; // Clear input field

//     let userChatBox = createChatBox(html, "user-chat-box");
//     chatContainer.appendChild(userChatBox);
//     chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: "smooth" });

//     setTimeout(() => {
//         let html = `
//             <img src="ai.avif" alt="AI" id="aiImage" width="10%">
//             <div class="ai-chat-area">
//                 <img src="loading.webp" alt="Loading" class="load" width="50px">
//             </div>
//         `;
//         let aiChatBox = createChatBox(html, "ai-chat-box");
//         chatContainer.appendChild(aiChatBox);
//         generateResponse(aiChatBox);
//     }, 600);
// }
// uncomment if below take video format doesnt work 11-5-25


// uncomment if below doc format 11-5 dont work
// function handleChatResponse(userMessage) {
//     if (!userMessage.trim() && !user.file.data) return;

//     user.message = userMessage || (user.file.isVideo ? "Tell me about this video" : "Tell me about this image");
    
//     let html = `
//         <img src="user.png" alt="User" id="userImage" width="8%">
//         <div class="user-chat-area">
//             ${user.message}
//             ${user.file.data ? 
//                 (user.file.isVideo ? 
//                     `<div class="video-indicator">
//                         <img src="video-icon.svg" class="video-icon-small">
//                     </div>` 
//                     : 
//                     `<img src="data:${user.file.mime_type};base64,${user.file.data}" class="chooseimg" />`
//                 ) 
//                 : ""
//             }
//         </div>
//     `;
    
//     prompt.value = ""; // Clear input field
//     // Reset icons
//     defaultIcon.hidden = false;
//     videoIcon.hidden = true;

//     let userChatBox = createChatBox(html, "user-chat-box");
//     chatContainer.appendChild(userChatBox);
//     chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: "smooth" });

//     setTimeout(() => {
//         let html = `
//             <img src="ai.avif" alt="AI" id="aiImage" width="10%">
//             <div class="ai-chat-area">
//                 <img src="loading.webp" alt="Loading" class="load" width="50px">
//             </div>
//         `;
//         let aiChatBox = createChatBox(html, "ai-chat-box");
//         chatContainer.appendChild(aiChatBox);
//         generateResponse(aiChatBox);
//     }, 600);
// }
// uncomment if below doc format 11-5 dont work


// doc 11-5
function handleChatResponse(userMessage) {
    if (!userMessage.trim() && !user.file.data) return;

    user.message = userMessage || "Tell me about this file";

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

// doc 11-5

// doc 11-5-25
// function handleChatResponse(userMessage) {
//     if (!userMessage.trim() && !user.file.data && !user.file.textContent) return;

//     user.message = userMessage || 
//         (user.file.isVideo ? "Tell me about this video" : 
//          user.file.isCode ? "Analyze this code" :
//          user.file.isSpreadsheet ? "Analyze this spreadsheet" :
//          user.file.isDocument ? "Analyze this document" : 
//          "Tell me about this image");
    
//     let fileContent = "";
//     if (user.file.isDocument) {
//         // Show document icon in chat
//         if (user.file.isCode) {
//             fileContent = `<img src="code-icon.svg" class="doc-icon" title="${user.file.fileName}" />`;
//         } else if (user.file.isSpreadsheet) {
//             fileContent = `<img src="spreadsheet-icon.svg" class="doc-icon" title="${user.file.fileName}" />`;
//         } else if (user.file.mime_type.includes('pdf')) {
//             fileContent = `<img src="pdf-icon.svg" class="doc-icon" title="${user.file.fileName}" />`;
//         } else if (user.file.mime_type.includes('word') || user.file.fileName.endsWith('.docx') || user.file.fileName.endsWith('.doc')) {
//             fileContent = `<img src="word-icon.svg" class="doc-icon" title="${user.file.fileName}" />`;
//         } else if (user.file.mime_type.includes('powerpoint') || user.file.fileName.endsWith('.pptx') || user.file.fileName.endsWith('.ppt')) {
//             fileContent = `<img src="ppt-icon.svg" class="doc-icon" title="${user.file.fileName}" />`;
//         } else {
//             fileContent = `<img src="document-icon.svg" class="doc-icon" title="${user.file.fileName}" />`;
//         }
//     } else if (user.file.data) {
//         fileContent = user.file.isVideo ? 
//             `<div class="video-indicator">
//                 <img src="video-icon.svg" class="video-icon-small">
//             </div>` : 
//             `<img src="data:${user.file.mime_type};base64,${user.file.data}" class="chooseimg" />`;
//     }
    
//     let html = `
//         <img src="user.png" alt="User" id="userImage" width="8%">
//         <div class="user-chat-area">
//             ${user.message}
//             ${fileContent}
//         </div>`;
    
//     prompt.value = "";
//     defaultIcon.hidden = false;
//     videoIcon.hidden = true;

//     let userChatBox = createChatBox(html, "user-chat-box");
//     chatContainer.appendChild(userChatBox);
//     chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: "smooth" });

//     setTimeout(() => {
//         let html = `
//             <img src="ai.avif" alt="AI" id="aiImage" width="10%">
//             <div class="ai-chat-area">
//                 <img src="loading.webp" alt="Loading" class="load" width="50px">
//             </div>`;
//         let aiChatBox = createChatBox(html, "ai-chat-box");
//         chatContainer.appendChild(aiChatBox);
//         generateResponse(aiChatBox);
//     }, 600);
// }
// doc 11-5-25

// take a photo handle chatresponse
// function handleChatResponse(userMessage) {
//     if (!userMessage.trim() && !user.file.data) return;
    
//     user.message = userMessage || "Tell me about this image";
    
//     let html = `
//         <img src="user.png" alt="User" id="userImage" width="8%">
//         <div class="user-chat-area">
//             ${user.message}
//             ${user.file.data ? `<img src="data:${user.file.mime_type};base64,${user.file.data}" class="chooseimg" />` : ""}
//         </div>`;
    
//     prompt.value = "";
//     let userChatBox = createChatBox(html, "user-chat-box");
//     chatContainer.appendChild(userChatBox);
//     chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: "smooth" });

//     setTimeout(() => {
//         let html = `
//             <img src="ai.avif" alt="AI" id="aiImage" width="10%">
//             <div class="ai-chat-area">
//                 <img src="loading.webp" alt="Loading" class="load" width="50px">
//             </div>`;
//         let aiChatBox = createChatBox(html, "ai-chat-box");
//         chatContainer.appendChild(aiChatBox);
//         generateResponse(aiChatBox);
//     }, 600);
// }
// take a photo handle chatresponse

// Event listeners
prompt.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleChatResponse(prompt.value);
});

submitbtn.addEventListener("click", () => {
    handleChatResponse(prompt.value);
});

// Function to handle image selection
//repeat
// imageinput.addEventListener("change", () => {
//     const file = imageinput.files[0];
//     if (!file) return;
//repeat
    //video
   // Update file input handler

//    uncomment it if below real time dont work
// imageinput.addEventListener("change", () => {
//     const file = imageinput.files[0];
//     if (!file) return;
    //    uncomment it if below real time dont work

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
//video
//video
    // Add size validation (100MB limit)
    // if (file.size > 100 * 1024 * 1024) {
    //     alert('File size too large (max 100MB)');
    //     resetImageSelection();
    //     return;
    // }
    //video
// const defaultIcon = document.querySelector('.default-icon');
// const videoIcon = document.querySelector('.video-icon');
//video
    // user.file.isVideo = file.type.startsWith('video/');

    // // Validate file size (100MB limit)
    // if (file.size > 100 * 1024 * 1024) {
    //     alert('Video file too large (max 100MB)');
    //     return;
    // }
//video
//     let reader = new FileReader();
//     reader.onload = (e) => {
//         let base64string = e.target.result.split(",")[1];
//         user.file = {
//             mime_type: file.type,
//             data: base64string,
//             // isVideo: user.file.isVideo
//         };
        
//         if (user.file.isVideo) {
//             showVideoPreview(file);//real
//             // defaultIcon.hidden = true;
//             // videoIcon.hidden = false;
//             //video
//             image.src = 'video-icon.svg';
//             //video
//         } else {
//             //video
//             // defaultIcon.hidden = false;
//             // videoIcon.hidden = true;
//             //video
//             image.src = `data:${user.file.mime_type};base64,${user.file.data}`;
//         }
//         image.classList.add("choose");
//     };
//     reader.readAsDataURL(file);
// });
//video
// imageinput.accept = "image/*,video/*";
// // // Add video preview function
// function showVideoPreview(file) {
//     const videoPreview = document.createElement('video');
//     videoPreview.controls = true;
//     videoPreview.style.maxWidth = '200px';
//     videoPreview.src = URL.createObjectURL(file);
    
//     const previewContainer = document.createElement('div');
//     previewContainer.className = 'video-preview';
//     previewContainer.appendChild(videoPreview);
    
//     document.body.appendChild(previewContainer);
// }
// video
  


//uncomment if below doc code dont work 11-5-25
function resetImageSelection() {
    image.src = `img.svg`;
    image.classList.remove("choose");
    user.file = { mime_type: null, data: null,isVideo:false };//uncomment it if video lines do not work in function resetImageSelection(now uncomment it)
}
// uncomment if below  doc code dont work 11-5-25
// doc 11-5-25
// function resetImageSelection() {
//     image.src = `img.svg`;
//     image.classList.remove("choose");
//     user.file = { 
//         mime_type: null, 
//         data: null,
//         isDocument: false,
//         isCode: false,
//         isSpreadsheet: false,
//         textContent: null,
//         fileName: null
//     };
//     defaultIcon.hidden = false;
//     videoIcon.hidden = true;
// }
// doc 11-5-25



// doc format
// function resetImageSelection() {
//     image.src = `img.svg`;
//     image.classList.remove("choose");
//     user.file = { 
//         mime_type: null, 
//         data: null,
//         isVideo: false,
//         isDocument: false,
//         isCode: false,
//         isSpreadsheet: false
//     };
// }
// doc format


// Click event for image upload



// take photo(uncomment this if below code doesnt work)

// alert
// imagebtn.addEventListener("click", () => {
//     imagebtn.querySelector("input").click();
// });
// alert
// take photo(uncomment this if below code doesnt work)

// take photo
// Show upload options when image button is clicked
// imagebtn.addEventListener("click", (e) => {
//     e.preventDefault();
//     uploadOptionsModal.style.display = "block";
// });

// // Close modals when clicking X
// closeButtons.forEach(button => {
//     button.addEventListener("click", () => {
//         cameraModal.style.display = "none";
//         uploadOptionsModal.style.display = "none";
//         stopCamera();
//     });
// });

// // Close modals when clicking outside
// window.addEventListener("click", (e) => {
//     if (e.target === cameraModal) {
//         cameraModal.style.display = "none";
//         stopCamera();
//     }
//     if (e.target === uploadOptionsModal) {
//         uploadOptionsModal.style.display = "none";
//     }
// });

// // From Computer option
// fromComputerBtn.addEventListener("click", () => {
//     uploadOptionsModal.style.display = "none";
//     imageinput.click();
// });

// // Take Photo option
// takePhotoBtn.addEventListener("click", () => {
//     uploadOptionsModal.style.display = "none";
//     cameraModal.style.display = "block";
//     startCamera();
// });
// take photo

// take photo
// Start camera function
// function startCamera() {
//     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//         navigator.mediaDevices.getUserMedia({ 
//             video: { 
//                 width: { ideal: 1280 },
//                 height: { ideal: 720 },
//                 facingMode: "user" // Front camera
//             } 
//         })
//         .then(stream => {
//             video.srcObject = stream;
//         })
//         .catch(error => {
//             console.error("Camera error: ", error);
//             alert("Could not access the camera. Please check permissions.");
//         });
//     } else {
//         alert("Camera access is not supported in your browser.");
//     }
// }

// // Stop camera function
// function stopCamera() {
//     if (video.srcObject) {
//         video.srcObject.getTracks().forEach(track => track.stop());
//         video.srcObject = null;
//     }
// }

// // Capture photo
// captureBtn.addEventListener("click", () => {
//     const context = canvas.getContext("2d");
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
//     // Convert canvas to base64
//     const imageData = canvas.toDataURL("image/jpeg", 0.8); // Higher quality JPEG
//     const base64Data = imageData.split(",")[1];
    
//     // Set user file data
//     user.file = {
//         mime_type: "image/jpeg",
//         data: base64Data
//     };
    
//     // Update the image preview
//     image.src = imageData;
//     image.classList.add("choose");
    
//     // Close the camera modal
//     cameraModal.style.display = "none";
//     stopCamera();
    
//     // Auto-focus the prompt input
//     prompt.focus();
// });
// take photo

// mic(uncomment it if below updated mic doesnt work)
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
        // const filename = filenameRaw.trim().toLowerCase().endsWith('.docx') 
        //     ? filenameRaw.trim().toLowerCase()
        //     : filenameRaw.trim().toLowerCase() + '.docx';
            
        // console.log("Parsed filename:", filename);

        // fetch(`http://localhost:3001/get-file/${encodeURIComponent(filename)}`)
        //     .then(res => {
        //         if (!res.ok) throw new Error("File not found");
        //         return res.json();
        //     })
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
// if (transcript.includes("open document")) {
//     const match = transcript.match(/open document(?:s)?(?:\s+)?(.+)/i);
//     if (match && match[1]) {
//         let filename = match[1]
//             .trim()
//             .replace(/\s*dot\s*/g, ".")   // "dot docx" -> ".docx"
//             .replace(/\s+/g, "")           // remove extra spaces
//             .replace(/[.,!?]+$/, "");      // strip punctuation

//         console.log("Parsed filename:", filename);

//         fetch(`http://localhost:3001/get-file/${encodeURIComponent(filename)}`)
//             .then(res => res.json())
//             .then(data => {
//                 if (data.content) {
//                     prompt.value = data.content;
//                     user.message = data.content;
//                     handleChatResponse(data.content); // 🔄 Send to Gemini AI
//                 } else {
//                     alert("File content not found.");
//                 }
//             })
//             .catch(err => {
//                 console.error("File fetch error:", err);
//                 alert("Could not open the file. Make sure it exists.");
//             });

//         return; // Stop other checks
//     } else {
//         alert("Please say: 'Open document resume dot docx'");
//         return;
//     }
// }
// if (transcript.includes("open document")) {
//     const match = transcript.match(/open document(?:s)?(?:\s+)?(.+)/i);

//     if (match && match[1]) {
//         let filename = match[1]
//             .trim()
//             .replace(/\s*dot\s*/gi, ".") // "dot docx" → ".docx"
//             .replace(/\s+/g, "")         // remove all spaces
//             .replace(/[.,!?]+$/, "");    // remove trailing punctuation

//         console.log("Parsed filename:", filename);

//         fetch(`http://localhost:3001/get-file/${encodeURIComponent(filename)}`)
//             .then(res => {
//                 if (!res.ok) throw new Error("File not found on server");
//                 return res.json();
//             })
//             .then(data => {
//                 if (data.content) {
//                     prompt.value = data.content;
//                     user.message = data.content;
//                     handleChatResponse(data.content); // Send to Gemini AI
//                 } else {
//                     alert("File found but content was empty.");
//                 }
//             })
//             .catch(err => {
//                 console.error("File fetch error:", err);
//                 alert("Could not open the file. Please ensure it exists in the 'documents' folder.");
//             });

//         return; // prevent further voice actions
//     } else {
//         alert("Please say: 'open document resume dot docx'");
//         return;
//     }
// }
// if (transcript.includes("open document") || transcript.includes("open file")) {
//     let filename = transcript
//         .replace(/^open (document|file|documents)?/, "") // Remove "open document" or "open file"
//         .trim()
//         .replace(/\s+/g, "") + ".docx"; // default to .docx

//     console.log("Parsed filename:", filename);

//     fetch(`http://localhost:3001/get-file/${encodeURIComponent(filename)}`)
//         .then(res => {
//             if (!res.ok) throw new Error("File not found on server");
//             return res.json();
//         })
//         .then(data => {
//             if (data.content) {
//                 prompt.value = data.content;
//                 user.message = data.content;
//                 handleChatResponse(data.content);
//             } else {
//                 alert("File found but content was empty.");
//             }
//         })
//         .catch(err => {
//             console.error("File fetch error:", err);
//             alert("Could not open the file. Please ensure it exists in the 'documents' folder.");
//         });

//     return;
// }
// if (!filename.includes(".")) {
//     filename += ".docx"; // Assume .docx by default
// }

// if (transcript.includes("open document") || transcript.includes("open file")) {
//     let rawName = transcript
//         .replace(/^open (document|file|documents)?/, "") // Remove voice trigger
//         .trim()
//         .replace(/\s*dot\s*/gi, ".")   // Replace "dot" with "."
//         .replace(/\s+/g, "")           // Remove all extra spaces
//         .replace(/[.,!?]+$/, "");      // Strip ending punctuation

//     // ✅ Fix double dots like "file..docx"
//     if (!rawName.includes(".")) {
//         rawName += ".docx"; // default to .docx if no extension
//     } else {
//         // Remove repeated dots (file..docx → file.docx)
//         rawName = rawName.replace(/\.{2,}/g, ".");
//     }

//     const filename = rawName;
//     console.log("Parsed filename:", filename);

//     fetch(`http://localhost:3001/get-file/${encodeURIComponent(filename)}`)
//         .then(res => {
//             if (!res.ok) throw new Error("File not found on server");
//             return res.json();
//         })
//         .then(data => {
//             if (data.content) {
//                 prompt.value = data.content;
//                 user.message = data.content;
//                 handleChatResponse(data.content);
//             } else {
//                 alert("File found but content was empty.");
//             }
//         })
//         .catch(err => {
//             console.error("File fetch error:", err);
//             alert("Could not open the file. Please ensure it exists in the 'documents' folder.");
//         });

//     return;
// }


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
// mic(uncomment it if below updated mic doesnt work)
//updated mic
// Add this at the end of your script.js
// micBtn.addEventListener("click", toggleSpeechRecognition);
// async function checkInternetConnection() {
//     try {
//         await fetch('https://www.google.com', { mode: 'no-cors' });
//         return true;
//     } catch (error) {
//         return false;
//     }
// }
// function toggleSpeechRecognition() {
//     if (isListening) {
//         stopSpeechRecognition();
//     } else {
//         if (!window.isSecureContext) {
//             alert('Speech recognition requires HTTPS. Please use a secure connection.');
//             return;
//         }
//         startSpeechRecognition();
//     }
// }

// async function startSpeechRecognition() {
//     // Clear any existing recognition instances
//     if (recognition) {
//         recognition.stop();
//     }

//     // Check internet connection
//     if (!await checkInternetConnection()) {
//         alert('Network connection required for speech recognition');
//         return;
//     }

//     // Check browser support
//     if (!('webkitSpeechRecognition' in window)) {
//         alert("Speech recognition is not supported in your browser.");
//         return;
//     }

//     // Check microphone permissions
//     try {
//         const permissionStatus = await navigator.permissions.query({ name: 'microphone' });
//         if (permissionStatus.state === 'denied') {
//             alert('Microphone access is blocked. Please enable it in browser settings.');
//             return;
//         }
//     } catch (error) {
//         console.error('Permission check error:', error);
//     }

//     recognition = new webkitSpeechRecognition();
//     recognition.continuous = false;
//     recognition.interimResults = false;
//     recognition.lang = navigator.language || 'en-US';

//     // Set network timeout
//     networkTimeout = setTimeout(() => {
//         if (!isListening) return;
//         stopSpeechRecognition();
//         alert('Connection timeout. Check your internet.');
//     }, 8000);

//     recognition.onstart = () => {
//         isListening = true;
//         micBtn.classList.add("recording");
//         clearTimeout(networkTimeout);
//     };

//     recognition.onresult = (event) => {
//         const transcript = event.results[0][0].transcript;
//         prompt.value = transcript;
//     };

//     recognition.onerror = (event) => {
//         const errors = {
//             network: 'Network error',
//             'not-allowed': 'Mic access denied',
//             'service-not-allowed': 'Service blocked',
//             'audio-capture': 'No microphone',
//             default: 'Recognition failed'
//         };
//         alert(errors[event.error] || errors.default);
//         stopSpeechRecognition();
//     };

//     recognition.onend = stopSpeechRecognition;

//     try {
//         recognition.start();
//     } catch (error) {
//         alert('Failed to start. Refresh and try again.');
//     }
// }

// function stopSpeechRecognition() {
//     if (recognition) {
//         recognition.stop();
//         recognition = null;
//     }
//     isListening = false;
//     micBtn.classList.remove("recording");
//     clearTimeout(networkTimeout);
// }
//updated mic

//sentiment
// async function handleChatResponse(userMessage) {
//     if (!userMessage.trim()) return;

//     try {
//         const sentimentResponse = await fetch('http://localhost:3000/analyze', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ message: userMessage })
//         });

//         let sentimentData;
//         if (sentimentResponse.ok) {
//             sentimentData = await sentimentResponse.json();
//         } else {
//             const errorData = await sentimentResponse.json();
//             throw new Error(errorData.error || 'Sentiment analysis failed');
//         }

//         // Ensure valid sentiment format
//         user.sentiment = ['positive', 'negative', 'neutral'].includes(sentimentData?.sentiment?.toLowerCase())
//             ? sentimentData.sentiment.toLowerCase()
//             : 'neutral';

//     } catch (error) {
//         console.error('Sentiment analysis failed:', error);
//         user.sentiment = 'neutral';
//     }

//     // Safely generate HTML with fallback
//     const sentimentClass = user.sentiment?.toLowerCase?.() || 'neutral';
//     user.message = userMessage;
    
//     let html = `
//         <img src="user.png" alt="User" id="userImage" width="8%">
//         <div class="user-chat-area">
//             ${user.message}
//             ${user.file.data ? `<img src="data:${user.file.mime_type};base64,${user.file.data}" class="chooseimg" />` : ""}
//             <div class="sentiment ${sentimentClass}">${user.sentiment}</div>
//         </div>`;

//     // ... rest of the existing code
// }
//sentiment


//sentiment
// prompt.addEventListener("keydown", async (e) => { // Added async here
//     if (e.key === "Enter") {
//         await handleChatResponse(prompt.value);
//     }
// });

// submitbtn.addEventListener("click", async () => { // Added async here
//     await handleChatResponse(prompt.value);
// });
//sentiment




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

// Modify imageinput event listener

// uncomment if below real time img dont work
// imageinput.addEventListener("change", () => {
//     const file = imageinput.files[0];
//     if (!file) return;

//     // Add size validation (100MB limit)
//     if (file.size > 100 * 1024 * 1024) {
//         alert('File size too large (max 100MB)');
//         resetImageSelection();
//         return;
//     }

//     user.file.isVideo = file.type.startsWith('video/');
    
//     let reader = new FileReader();
//     reader.onload = (e) => {
//         let base64string = e.target.result.split(",")[1];
//         user.file = {
//             mime_type: file.type,
//             data: base64string,
//             isVideo: user.file.isVideo
//         };
        
//         if (user.file.isVideo) {
//             showVideoPreview(file);
//             image.src = 'video-icon.svg';
//         } else {
//             image.src = `data:${user.file.mime_type};base64,${user.file.data}`;
//         }
//         image.classList.add("choose");
//     };
//     reader.readAsDataURL(file);
// });
// uncomment if below real time img dont work

// real time img


// uncomment if below video format dont work 11-5-25
// if (imageinput) {
//     imageinput.addEventListener("change", () => {
//         const file = imageinput.files[0];
//         if (!file) return;

//         // Add size validation (optional)
//         if (file.size > 100 * 1024 * 1024) {
//             alert('File size too large (max 100MB)');
//             return;
//         }

//         let reader = new FileReader();
//         reader.onload = (e) => {
//             let base64string = e.target.result.split(",")[1];
//             user.file = {
//                 mime_type: file.type,
//                 data: base64string
//             };
//             image.src = `data:${user.file.mime_type};base64,${user.file.data}`;
//             image.classList.add("choose");
//         };
//         reader.readAsDataURL(file);
//     });
// }
// uncomment if below video format dont work 11-5-25


//  uncomment if below doc  format 11-5 dont work
// if (imageinput) {
//     imageinput.addEventListener("change", () => {
//     const file = imageinput.files[0];
//     if (!file) return;
//     // doc format 11-5
//     //    const fileIconPreview = document.getElementById("fileIconPreview");
//     //     const ext = file.name.split('.').pop().toLowerCase();

//     //     const iconMap = {
//     //         pdf: "icons/pdf-icon.svg",
//     //         doc: "icons/word-icon.svg",
//     //         docx: "icons/word-icon.svg",
//     //         txt: "icons/text-icon.svg",
//     //         js: "icons/js-icon.svg",
//     //         py: "icons/python-icon.svg",
//     //         html: "icons/html-icon.svg",
//     //         css: "icons/css-icon.svg",
//     //         java: "icons/java-icon.svg",
//     //         cpp: "icons/cpp-icon.svg",
//     //         sql: "icons/sql-icon.svg"
//     //     };
//     //     fileIconPreview.src = iconMap[ext] || "icons/file-icon.svg";
//     // doc format 11-5

//     // Add size validation (100MB limit)
//     if (file.size > 100 * 1024 * 1024) {
//         alert('File size too large (max 100MB)');
//         resetImageSelection();
//         return;
//     }

//     user.file = {
//         mime_type: file.type,
//         isVideo: file.type.startsWith('video/')
//     };

//     let reader = new FileReader();
//     reader.onload = (e) => {
//         let base64string = e.target.result.split(",")[1];
//         user.file.data = base64string;
        
//         if (user.file.isVideo) {
//             // Show video icon
//             defaultIcon.hidden = true;
//             videoIcon.hidden = false;
//             image.src = 'video-icon.svg';
//         } else {
//             // Show image preview
//             defaultIcon.hidden = false;
//             videoIcon.hidden = true;
//             // uncomment if above doc format 11-5 dont work
//             image.src = `data:${user.file.mime_type};base64,${user.file.data}`;
//             // uncomment if above doc format 11-5 dont work
//         }
//         image.classList.add("choose");
//     };
//     reader.readAsDataURL(file);
// });
// }
//  uncomment if below doc  format 11-5 dont work

// uncomment if img format  11-5 dont work
// if (imageinput) {
//     imageinput.addEventListener("change", () => {
//         const file = imageinput.files[0];
//         if (!file) return;

//         // Set icon based on file extension
//         const fileIconPreview = document.getElementById("fileIconPreview");
//         const ext = file.name.split('.').pop().toLowerCase();
//         const iconMap = {
//             pdf: "icons/pdf-icon.svg",
//             doc: "icons/word-icon.svg",
//             docx: "icons/word-icon.svg",
//             txt: "icons/text-icon.svg",
//             js: "icons/js-icon.svg",
//             py: "icons/python-icon.svg",
//             html: "icons/html-icon.svg",
//             css: "icons/css-icon.svg",
//             java: "icons/java-icon.svg",
//             cpp: "icons/cpp-icon.svg",
//             sql: "icons/sql-icon.svg"
//         };
//         fileIconPreview.src = iconMap[ext] || "icons/file-icon.svg";

//         // File size check (max 100MB)
//         if (file.size > 100 * 1024 * 1024) {
//             alert('File size too large (max 100MB)');
//             resetImageSelection();
//             return;
//         }

//         // Initialize file object
//         user.file = {
//             fileName: file.name,
//             mime_type: file.type,
//             isVideo: file.type.startsWith('video/')
//         };

//         // Special handling for DOCX file
//         if (ext === 'docx') {
//             const formData = new FormData();
//             formData.append('file', file);

//             fetch("http://localhost:3001/upload-doc", {
//                 method: "POST",
//                 body: formData
//             })
//             .then(res => res.json())
//         .then(data => {
//     if (data.status === "success") {
//         user.file.data = btoa(unescape(encodeURIComponent(data.textContent)));
//         user.file.mime_type = "text/plain";
//         user.file.fileName = file.name;

//         defaultIcon.hidden = false;
//         videoIcon.hidden = true;
//         image.src = iconMap[ext] || "icons/file-icon.svg";
//         image.classList.add("choose");
//     } else {
//         alert("Failed to process DOCX file.");
//     }
// })

//             .catch(err => {
//                 console.error("Upload error:", err);
//                 alert("Error uploading DOCX file.");
//             });
//         } else {
//             // Regular file: read as base64 directly
//             let reader = new FileReader();
//             reader.onload = (e) => {
//                 const base64string = e.target.result.split(",")[1];
//                 user.file.data = base64string;

//                 if (user.file.isVideo) {
//                     defaultIcon.hidden = true;
//                     videoIcon.hidden = false;
//                     image.src = 'video-icon.svg';
//                 } else {
//                     defaultIcon.hidden = false;
//                     videoIcon.hidden = true;
//                     // image.src = `data:${user.file.mime_type};base64,${user.file.data}`;
//                     image.src = iconMap[ext] || "icons/file-icon.svg";
//                 }

//                 image.classList.add("choose");
//             };
//             reader.readAsDataURL(file);
//         }
//     });
// }
// uncomment if img format  11-5 dont work

// uncomment if below java cpp sql 12-5 dont work
// if (imageinput) {
//     imageinput.addEventListener("change", () => {
//         const file = imageinput.files[0];
//         if (!file) return;

//         const fileIconPreview = document.getElementById("fileIconPreview");
//         const ext = file.name.split('.').pop().toLowerCase();
//         const iconMap = {
//             pdf: "icons/pdf-icon.svg",
//             doc: "icons/word-icon.svg",
//             docx: "icons/word-icon.svg",
//             txt: "icons/text-icon.svg",
//             js: "icons/js-icon.svg",
//             py: "icons/python-icon.svg",
//             html: "icons/html-icon.svg",
//             css: "icons/css-icon.svg",
//             java: "icons/java-icon.svg",
//             cpp: "icons/cpp-icon.svg",
//             sql: "icons/sql-icon.svg"
//         };

//         // File size check
//         if (file.size > 100 * 1024 * 1024) {
//             alert('File size too large (max 100MB)');
//             resetImageSelection();
//             return;
//         }

//         user.file = {
//             fileName: file.name,
//             mime_type: file.type,
//             isVideo: file.type.startsWith('video/')
//         };

//         if (ext === 'docx') {
//             const formData = new FormData();
//             formData.append('file', file);

//             fetch("http://localhost:3001/upload-doc", {
//                 method: "POST",
//                 body: formData
//             })
//             .then(res => res.json())
//             .then(data => {
//                 if (data.status === "success") {
//                     user.file.data = btoa(unescape(encodeURIComponent(data.textContent)));
//                     user.file.mime_type = "text/plain";

//                     image.src = iconMap[ext] || "icons/file-icon.svg";
//                     fileIconPreview.src = iconMap[ext] || "icons/file-icon.svg";
//                     image.classList.add("choose");
//                 } else {
//                     alert("Failed to process DOCX file.");
//                 }
//             })
//             .catch(err => {
//                 console.error("Upload error:", err);
//                 alert("Error uploading DOCX file.");
//             });
//         } else {
//             const reader = new FileReader();
//             reader.onload = (e) => {
//                 const base64string = e.target.result.split(",")[1];
//                 user.file.data = base64string;

//                 if (file.type.startsWith('image/')) {
//                     image.src = `data:${file.type};base64,${base64string}`;
//                     fileIconPreview.src = `data:${file.type};base64,${base64string}`;
//                 } else if (user.file.isVideo) {
//                     image.src = 'video-icon.svg';
//                     fileIconPreview.src = 'video-icon.svg';
//                 } else {
//                     image.src = iconMap[ext] || "icons/file-icon.svg";
//                     fileIconPreview.src = iconMap[ext] || "icons/file-icon.svg";
//                 }

//                 image.classList.add("choose");
//             };
//             reader.readAsDataURL(file);
//         }
//     });
// }
// uncomment if below java cpp,sql dont work 12-5

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


// java cpp,sql 12-5

// doc format 11-5-25
// if (imageinput) {
// imageinput.addEventListener("change", async () => {
//     const file = imageinput.files[0];
//     if (!file) return;

//     // Add size validation (100MB limit)
//     if (file.size > 100 * 1024 * 1024) {
//         alert('File size too large (max 100MB)');
//         resetImageSelection();
//         return;
//     }

//     // Check file type
//     const fileType = file.type;
//     const fileExt = file.name.split('.').pop().toLowerCase();
//     const isImage = fileType.startsWith('image/');
//     const isVideo = fileType.startsWith('video/');
//     const isDocument = [
//         'pdf', 'doc', 'docx', 'txt', 'rtf', 'odt', 
//         'xls', 'xlsx', 'csv', 'pptx', 'ppt',
//         'js', 'py', 'java', 'cpp', 'c', 'html', 'css', 
//         'php', 'rb', 'go', 'rs', 'ts', 'json', 'xml', 'sql'
//     ].includes(fileExt);

//     if (isImage || isVideo) {
//         // Existing image/video handling
//         let reader = new FileReader();
//         reader.onload = (e) => {
//             let base64string = e.target.result.split(",")[1];
//             user.file = {
//                 mime_type: file.type,
//                 data: base64string,
//                 isVideo: isVideo,
//                 fileName: file.name
//             };
            
//             if (isVideo) {
//                 defaultIcon.hidden = true;
//                 videoIcon.hidden = false;
//                 image.src = 'video-icon.svg';
//             } else {
//                 image.src = `data:${user.file.mime_type};base64,${user.file.data}`;
//             }
//             image.classList.add("choose");
//         };
//         reader.readAsDataURL(file);
//     } else if (isDocument) {
//         // New document handling
//         user.file = {
//             mime_type: file.type,
//             fileName: file.name,
//             isDocument: true,
//             isCode: [
//                 'js', 'py', 'java', 'cpp', 'c', 'html', 
//                 'css', 'php', 'rb', 'go', 'rs', 'ts', 
//                 'json', 'xml', 'sql'
//             ].includes(fileExt),
//             isSpreadsheet: ['xlsx', 'xls', 'csv'].includes(fileExt)
//         };

//         // Show appropriate icon
//         if (user.file.isCode) {
//             image.src = 'code-icon.svg';
//         } else if (user.file.isSpreadsheet) {
//             image.src = 'spreadsheet-icon.svg';
//         } else if (fileExt === 'pdf') {
//             image.src = 'pdf-icon.svg';
//         } else if (['doc', 'docx'].includes(fileExt)) {
//             image.src = 'word-icon.svg';
//         } else if (['ppt', 'pptx'].includes(fileExt)) {
//             image.src = 'ppt-icon.svg';
//         } else {
//             image.src = 'document-icon.svg';
//         }
//         image.classList.add("choose");

//         // Process the file
//         try {
//             if (user.file.isCode || ['txt', 'csv'].includes(fileExt)) {
//                 // Read text files directly
//                 const content = await readFileAsText(file);
//                 user.file.textContent = content;
//             } else {
//                 // Send other documents to server for processing
//                 const base64Data = await readFileAsBase64(file);
//                 const processed = await processDocumentWithServer(base64Data, file.type, file.name);
//                 user.file.textContent = processed.textContent;
//             }

//             // Auto-prompt based on file type
//             if (!prompt.value.trim()) {
//                 if (user.file.isCode) {
//                     prompt.value = "Please analyze this code:";
//                 } else if (user.file.isSpreadsheet) {
//                     prompt.value = "Please analyze this spreadsheet data:";
//                 } else {
//                     prompt.value = "Please summarize this document:";
//                 }
//             }
//         } catch (error) {
//             console.error('Document processing failed:', error);
//             alert('Failed to process document');
//             resetImageSelection();
//         }
//     } else {
//         alert('Unsupported file type');
//         resetImageSelection();
//     }
// });

// // Helper functions for file reading
// function readFileAsText(file) {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = e => resolve(e.target.result);
//         reader.onerror = reject;
//         reader.readAsText(file);
//     });
// }

// function readFileAsBase64(file) {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = e => resolve(e.target.result.split(',')[1]);
//         reader.onerror = reject;
//         reader.readAsDataURL(file);
//     });
// }

// async function processDocumentWithServer(base64Data, mimeType, fileName) {
//     const response = await fetch('http://localhost:3001/process-document', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             fileData: base64Data,
//             mimeType,
//             fileName
//         })
//     });
    
//     if (!response.ok) {
//         const error = await response.json().catch(() => ({}));
//         throw new Error(error.message || 'Server processing failed');
//     }
    
//     return await response.json();
// }
// }
// doc format 11-5-25

// doc format
// Update the file input event listener
// imageinput.addEventListener("change", () => {
//     const file = imageinput.files[0];
//     if (!file) return;

//     // Add size validation (100MB limit)
//     if (file.size > 100 * 1024 * 1024) {
//         alert('File size too large (max 100MB)');
//         resetImageSelection();
//         return;
//     }

//     // Check file type
//     const fileType = file.type;
//     const fileExt = file.name.split('.').pop().toLowerCase();
//     const isImage = fileType.startsWith('image/');
//     const isVideo = fileType.startsWith('video/');
//     const isDocument = [
//         'pdf', 'doc', 'docx', 'txt', 'rtf', 'odt', 
//         'xls', 'xlsx', 'csv',
//         'js', 'py', 'java', 'cpp', 'c', 'html', 'css', 
//         'php', 'rb', 'go', 'rs', 'ts', 'json', 'xml', 'sql'
//     ].includes(fileExt);

//     if (isImage || isVideo) {
//         // Existing image/video handling
//         let reader = new FileReader();
//         reader.onload = (e) => {
//             let base64string = e.target.result.split(",")[1];
//             user.file = {
//                 mime_type: file.type,
//                 data: base64string,
//                 isVideo: isVideo
//             };
            
//             if (isVideo) {
//                 showVideoPreview(file);
//                 image.src = 'video-icon.svg';
//             } else {
//                 image.src = `data:${user.file.mime_type};base64,${user.file.data}`;
//             }
//             image.classList.add("choose");
//         };
//         reader.readAsDataURL(file);
//     } else if (isDocument) {
//         // New document handling
//         const reader = new FileReader();
        
//         if ([
//             'pdf', 'txt', 'rtf', 'js', 'py', 'java', 'cpp', 'c', 
//             'html', 'css', 'php', 'rb', 'go', 'rs', 'ts', 'json', 
//             'xml', 'sql'
//         ].includes(fileExt)) {
//             // For text-based documents and code files
//             reader.onload = (e) => {
//                 const content = e.target.result;
//                 user.file = {
//                     mime_type: file.type,
//                     data: null,
//                     textContent: content,
//                     isDocument: true,
//                     isCode: [
//                         'js', 'py', 'java', 'cpp', 'c', 'html', 
//                         'css', 'php', 'rb', 'go', 'rs', 'ts', 
//                         'json', 'xml', 'sql'
//                     ].includes(fileExt)
//                 };
                
//                 // Show appropriate icon
//                 if (user.file.isCode) {
//                     image.src = 'code-icon.svg'; // Add this icon
//                 } else {
//                     image.src = 'document-icon.svg';
//                 }
//                 image.classList.add("choose");
                
//                 // Auto-prompt based on file type
//                 if (!prompt.value.trim()) {
//                     if (user.file.isCode) {
//                         prompt.value = "Please analyze this code and explain its functionality:";
//                     } else {
//                         prompt.value = "Please summarize the key points of this document:";
//                     }
//                 }
//             };
            
//             reader.readAsText(file);
//         } else if (['xlsx', 'xls', 'csv'].includes(fileExt)) {
//             // For Excel files, send to server for processing
//             reader.onload = async (e) => {
//                 const base64string = e.target.result.split(",")[1];
                
//                 try {
//                     const response = await fetch('http://localhost:3001/process-document', {
//                         method: 'POST',
//                         headers: { 'Content-Type': 'application/json' },
//                         body: JSON.stringify({
//                             fileData: base64string,
//                             mimeType: file.type,
//                             fileName: file.name
//                         })
//                     });
                    
//                     const data = await response.json();
//                     if (data.status === 'success') {
//                         user.file = {
//                             mime_type: file.type,
//                             data: null,
//                             textContent: data.textContent,
//                             isDocument: true,
//                             isSpreadsheet: true
//                         };
                        
//                         image.src = 'spreadsheet-icon.svg'; // Add this icon
//                         image.classList.add("choose");
                        
//                         if (!prompt.value.trim()) {
//                             prompt.value = "Please analyze this spreadsheet data:";
//                         }
//                     }
//                 } catch (error) {
//                     console.error('Document processing failed:', error);
//                     alert('Failed to process spreadsheet');
//                 }
//             };
//             reader.readAsDataURL(file);
//         } else {
//             // For other binary documents (like DOCX)
//             reader.onload = async (e) => {
//                 const base64string = e.target.result.split(",")[1];
                
//                 try {
//                     const response = await fetch('http://localhost:3001/process-document', {
//                         method: 'POST',
//                         headers: { 'Content-Type': 'application/json' },
//                         body: JSON.stringify({
//                             fileData: base64string,
//                             mimeType: file.type,
//                             fileName: file.name
//                         })
//                     });
                    
//                     const data = await response.json();
//                     if (data.status === 'success') {
//                         user.file = {
//                             mime_type: file.type,
//                             data: null,
//                             textContent: data.textContent,
//                             isDocument: true
//                         };
                        
//                         image.src = 'document-icon.svg';
//                         image.classList.add("choose");
                        
//                         if (!prompt.value.trim()) {
//                             prompt.value = "Please analyze this document:";
//                         }
//                     }
//                 } catch (error) {
//                     console.error('Document processing failed:', error);
//                     alert('Failed to process document');
//                 }
//             };
//             reader.readAsDataURL(file);
//         }
//     } else {
//         alert('Unsupported file type');
//         resetImageSelection();
//     }
// });
// doc format


// doc format
// imageinput.addEventListener("change", () => {
//     const file = imageinput.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file); // MUST match multer field

//     fetch("http://localhost:3001/process-document", {
//         method: "POST",
//         body: formData
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (!data || !data.data || !data.mime_type) {
//             throw new Error("Invalid response from server");
//         }

//         user.file = {
//             mime_type: data.mime_type,
//             data: data.data
//         };

//         image.src = `img.svg`; // generic icon instead of preview
//         image.classList.add("choose");
//     })
//     .catch(error => {
//         console.error("Error uploading file:", error);
//     });
// });



// doc format

// real time img

//18-3-2025 video
    // chat history
  
    
    // document.addEventListener("DOMContentLoaded", () => {
    //     // Sidebar toggle
    //     document.getElementById('menu-toggle').addEventListener('click', () => {
    //         document.getElementById('sidebar').style.width = '250px';
    //     });
    
    //     document.getElementById('close-sidebar').addEventListener('click', () => {
    //         document.getElementById('sidebar').style.width = '0';
    //     });
    
    //     const fileInput = document.querySelector('#fileInput');
    //     const defaultIcon = document.querySelector('.default-icon');
    //     const videoIcon = document.querySelector('.video-icon');
    
    //     fileInput.addEventListener('change', (e) => {
    //         const file = e.target.files[0];
    
    //         if (file) {
    //             if (file.type.startsWith('video/')) {
    //                 defaultIcon.hidden = true;
    //                 videoIcon.hidden = false;
    //             } else {
    //                 defaultIcon.hidden = false;
    //                 videoIcon.hidden = true;
    //             }
    //         } else {
    //             defaultIcon.hidden = false;
    //             videoIcon.hidden = true;
    //         }
    //     });
    
    //     // Chat history logic
    //     let chatHistory = [];
    
    //     function addToChatHistory(promptText) {
    //         if (promptText.trim() === "") return;
    //         const timestamp = new Date().toLocaleTimeString();
    //         const chatEntry = { text: promptText, time: timestamp };
    //         chatHistory.unshift(chatEntry);
    //         updateChatHistoryUI();
    //     }
    
    //     function updateChatHistoryUI() {
    //         const chatHistoryList = document.getElementById("chatHistoryList");
    //         chatHistoryList.innerHTML = "";
    //         chatHistory.forEach((entry) => {
    //             const li = document.createElement("li");
    //             li.textContent = `${entry.text.slice(0, 25)}...`;
    //             li.title = entry.text;
    //             chatHistoryList.appendChild(li);
    //         });
    //     }
    
    //     document.getElementById("submit").addEventListener("click", () => {
    //         const promptInput = document.getElementById("prompt");
    //         const promptText = promptInput.value;
    //         addToChatHistory(promptText);
    //         promptInput.value = "";
    //     });
    // });
    
    // Chat storage and management

    // chat history
// real time image

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
  
// real time image
});
// real time image

// real time image



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
// new
// tts

// video format 10-5-25
// async function handleVideoUpload(file) {
//     const imageBtn = document.getElementById('image');
//     const statusDisplay = document.createElement('div');
//     statusDisplay.className = 'upload-status';
//     imageBtn.innerHTML = '';
//     imageBtn.appendChild(statusDisplay);
    
//     try {
//         // Step 1: Read file
//         statusDisplay.textContent = 'Reading video...';
//         const base64Data = await readFileAsBase64(file);
        
//         // Step 2: Process with server
//         statusDisplay.textContent = 'Processing video...';
//         const result = await processVideoWithServer(base64Data, file.type);
        
//         // Step 3: Display thumbnail
//         statusDisplay.textContent = '';
//         const thumbnail = createThumbnail(result.thumbnail);
//         imageBtn.innerHTML = '';
//         imageBtn.appendChild(thumbnail);
        
//         return {
//             mime_type: file.type,
//             data: base64Data,
//             thumbnail: result.thumbnail
//         };
//     } catch (error) {
//         console.error('Video upload error:', error);
//         imageBtn.innerHTML = '<img src="img.svg" alt="Upload">';
//         throw error;
//     }
// }

// Helper functions
// function readFileAsBase64(file) {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = e => resolve(e.target.result.split(',')[1]);
//         reader.onerror = reject;
//         reader.readAsDataURL(file);
//     });
// }

// async function processVideoWithServer(base64Data, mimeType) {
//     const response = await fetch('http://localhost:3001/process-video', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ videoData: base64Data, mimeType })
//     });
    
//     if (!response.ok) {
//         const error = await response.json().catch(() => ({}));
//         throw new Error(error.message || 'Server processing failed');
//     }
    
//     return await response.json();
// }

// function createThumbnail(thumbnailData) {
//     const img = document.createElement('img');
//     img.src = `data:image/png;base64,${thumbnailData}`;
//     img.className = 'video-thumbnail';
//     img.alt = 'Video thumbnail';
//     return img;
// }
// video format 10-5-25
// video format 10-5-25
// async function uploadVideo(file) {
//     const statusElement = document.getElementById('upload-status');
//     statusElement.textContent = 'Processing video...';
    
//     try {
//         // Read file as base64
//         const base64Data = await new Promise((resolve, reject) => {
//             const reader = new FileReader();
//             reader.onload = () => resolve(reader.result.split(',')[1]);
//             reader.onerror = reject;
//             reader.readAsDataURL(file);
//         });

//         // Send to server
//         const response = await fetch('/process-video', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 videoData: base64Data,
//                 mimeType: file.type
//             })
//         });

//         if (!response.ok) {
//             const error = await response.json();
//             throw new Error(error.error || 'Processing failed');
//         }

//         const result = await response.json();
//         return result.thumbnail;

//     } catch (error) {
//         console.error('Upload failed:', error);
//         statusElement.textContent = `Error: ${error.message}`;
//         throw error;
//     }
// }

// Usage example
// document.getElementById('video-upload').addEventListener('change', async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     try {
//         const thumbnail = await uploadVideo(file);
//         document.getElementById('thumbnail-preview').src = 
//             `data:image/jpeg;base64,${thumbnail}`;
//     } catch {
//         // Error already displayed
//     }
// });
// video upload 10-5-25


// image appear 11-5
// document.getElementById('image-input').addEventListener('change', async function (event) {
//   const file = event.target.files[0];
//   if (!file) return;

//   const formData = new FormData();
//   formData.append('image', file);

//   // Show image preview before upload
//   const imgPreview = document.createElement('img');
//   imgPreview.src = URL.createObjectURL(file);
//   imgPreview.style.maxWidth = '200px';
//   imgPreview.style.margin = '10px';
//   appendMessage('user', imgPreview);

//   try {
//     const res = await fetch('/upload', {
//       method: 'POST',
//       body: formData
//     });
//     const data = await res.json();
//     if (data.success && data.imageUrl) {
//       const img = document.createElement('img');
//       img.src = data.imageUrl;
//       img.style.maxWidth = '200px';
//       img.style.margin = '10px';
//       appendMessage('user', img);
//     } else {
//       appendMessage('user', 'Image upload failed');
//     }
//   } catch (err) {
//     console.error('Upload error:', err);
//     appendMessage('user', 'Error uploading image');
//   }
// });

// function appendMessage(sender, content) {
//   const chat = document.getElementById('chat');
//   const messageDiv = document.createElement('div');
//   messageDiv.className = sender;
  
//   if (typeof content === 'string') {
//     messageDiv.innerText = content;
//   } else {
//     messageDiv.appendChild(content);
//   }

//   chat.appendChild(messageDiv);
//   chat.scrollTop = chat.scrollHeight;
// }

// image appear 11-5
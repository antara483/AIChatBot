// let prompt=document.querySelector("#prompt")
// let submitbtn=document.querySelector("#submit")
// let chatContainer=document.querySelector(".chat-container")
// let imagebtn=document.querySelector("#image")
// let image=document.querySelector("#image img")
// let imageinput=document.querySelector("#image input")
// //first
// // const Api_Url="https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=Your-Api-Key"
// //second
// let user={
//     message:null,
//     file:{
//         mime_type:null,
//           data:null
//     }

// }
// //api adjust
// // async function fetchApiKey() {
// //     try {
// //         let response = await fetch('http://localhost:3000/api/key'); // Fetch API key from backend
// //         let data = await response.json();
// //         return data.apiKey;
// //     } catch (error) {
// //         console.error('Error fetching API key:', error);
// //         return null;
// //     }
// // }
// // //api adjust
// async function generateResponse(aiChatBox){
//     let text=aiChatBox.querySelector(".ai-chat-area")
//     //api adjust
//     // let apiKey = await fetchApiKey();
//     // if (!apiKey) {
//     //     text.innerHTML = "Error: API key not found.";
//     //     return;
//     // }

//     // let Api_Url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    
       
//     //api adjust
//     let RequestOption={
//         method:"POST",
//         headers:{'Content-Type': 'application/json'},
//         body:JSON.stringify({
            
//                 "contents": [
//                     {"parts":[{"text": user.message},(user.file.data?[{"inline_data":user.file}]:[])

//                     ]
//                   }]
                 
//         })
//     }
//     try{
//         let response=await fetch(Api_Url,RequestOption)
//         let data=await response.json()
//         // console.log(data);
//         let apiResponse=data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim()
//         text.innerHTML=apiResponse
        
//     }
//   catch(error){
//     console.log(error);
//   }
//   finally{
//     chatContainer.scrollTo({top:chatContainer.scrollHeight,behavior:"smooth"})
//     image.src=`img.svg`
//     image.classList.remove("choose")
//     user.file={}
//   }

// }
// function createChatBox(html,classes){
//     let div=document.createElement("div")
//     div.innerHTML=html
//     div.classList.add(classes)
//     return div
// }


// function handlechatResponse(userMessage){
//     user.message=userMessage
//     let html=`<img src="user.png" at="" id="userImage" width="8%">
// <div class="user-chat-area">
// ${user.message}
// ${user.file.data?`<img src="data:${user.file.mime_type};base64,${user.file.data}" class="chooseimg" />` : ""}
// </div>`
// prompt.value=""
// let userChatBox=createChatBox(html,"user-chat-box")
// chatContainer.appendChild(userChatBox)
// chatContainer.scrollTo({top:chatContainer.scrollHeight,behavior:"smooth"})
// setTimeout(()=>{
// let html=`<img src="ai.avif" alt="" id="aiImage" width="10%">
// <div class="ai-chat-area">
// <img src="loading.webp" alt="" class="load" width="50px">
// </div>`
// let aiChatBox=createChatBox(html,"ai-chat-box")
// chatContainer.appendChild(aiChatBox)
// generateResponse(aiChatBox)
// },600)

// }
// prompt.addEventListener("keydown",(e)=>{
//     if(e.key=="Enter"){
//     handlechatResponse(prompt.value)


//     }

// })
// submitbtn.addEventListener("click",()=>{
//     handlechatResponse(prompt.value)
// })
// imageinput.addEventListener("change",()=>{
//     const file=imageinput.files[0]
//     if(!file) return
//     let reader= new FileReader()
//     reader.onload=(e)=>{
//         let base64string=e.target.result.split(",")[1]
//         user.file={
//             mime_type:file.type,
//               data:base64string
//         }
//      image.src=`data:${user.file.mime_type};base64,${user.file.data}`
//      image.classList.add("choose")
//     }
   
//     reader.readAsDataURL(file)
// })

// imagebtn.addEventListener("click",()=>{
//     imagebtn.querySelector("input").click()
// })



//video
// const defaultIcon = document.querySelector('.default-icon');
// const videoIcon = document.querySelector('.video-icon');
//video
// take photo
// const cameraModal = document.getElementById("cameraModal");
// const uploadOptionsModal = document.getElementById("uploadOptionsModal");
// const video = document.getElementById("video");
// const canvas = document.getElementById("canvas");
// const captureBtn = document.getElementById("capture");
// const fromComputerBtn = document.getElementById("fromComputer");
// const takePhotoBtn = document.getElementById("takePhoto");
// const closeButtons = document.querySelectorAll(".close");
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
// voice open app
// mic
//updated mic 932025
// let networkTimeout = null;
//updated mic932025


let user = {
    message: null,
    file: {
        mime_type: null,
        data: null,
    }
};

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



// Function to generate AI response
// async function generateResponse(aiChatBox) {
//     let text = aiChatBox.querySelector(".ai-chat-area");
//     let apiKey = await fetchApiKey();//get api key
//     //video
//     // if (user.file.data && user.file.mime_type.startsWith('video/')) {
//     //     try {
//     //         const response = await fetch('http://localhost:3000/process-video', {
//     //             method: 'POST',
//     //             headers: { 'Content-Type': 'application/json' },
//     //             body: JSON.stringify({
//     //                 videoData: user.file.data,
//     //                 mimeType: user.file.mime_type
//     //             })
//     //         });
          
            
//             const result = await response.json();//real
            
        
            
          
// }

//             //video
//                 // Add thumbnail to user's message
//                 // const userChatBox = document.querySelector('.user-chat-box:last-child');
//                 // if (userChatBox) {
//                 //     const thumbnail = document.createElement('img');
//                 //     thumbnail.src = `data:image/png;base64,${result.thumbnail}`;
//                 //     thumbnail.style.maxWidth = '200px';
//                 //     userChatBox.querySelector('.user-chat-area').appendChild(thumbnail);
//                 // }
                
            
//             user.message = `${user.message}\n[Video Processed - Thumbnail Attached]`;
            
//     //         // Add thumbnail to chat

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
//         text.innerHTML = apiResponse;

//     } catch (error) {
//         console.error("Error fetching AI response:", error);
//         text.innerHTML = "Error: Unable to fetch response.";
//     } finally {
//         chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: "smooth" });

//         resetImageSelection();
//     }



// // Function to create a chat message box
// function createChatBox(html, classes) {
//     let div = document.createElement("div");
//     div.innerHTML = html;
//     div.classList.add(classes);
//     return div;
// }
//testing
// ... (previous code remains the same)

// uncomment if below doc doesnt work
async function generateResponse(aiChatBox) {
    let text = aiChatBox.querySelector(".ai-chat-area");
    let apiKey = await fetchApiKey();

    if (!apiKey) {
        text.innerHTML = "Error: API key not found.";
        return;
    }

    let Api_Url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    let requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "contents": [
                {
                    "parts": [
                        // uncomment format if below line dont work
                        { "text": user.message },
                        // uncomment format if below line dont work

                        // format para
                        // {
                        //     "text": `Please answer this question in a well-formatted manner using:
                        //   - Bullet points
                        //   - Headings
                        //   - Step-by-step explanation
                        //   - Code blocks (if needed)
                          
                        //   Question: ${user.message}`
                        //   },
                          
                        // format para
                        ...(user.file.data ? [{ "inline_data": user.file }] : [])
                    ]
                }
            ]
        })
    };

    try {
       
       
        let response = await fetch(Api_Url, requestOptions);
                
        let data = await response.json();

        if (!data.candidates || data.candidates.length === 0) {
            text.innerHTML = "Error: No response from AI.";
            return;
        }

        let apiResponse = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
        // uncomment if below format doesnt work
        
        // text.innerHTML = apiResponse;
        // uncomment if below format doesnt work

        // tts
        
        // tts
        // format para
        text.innerHTML = marked.parse(apiResponse);


        // tts
         speakText(apiResponse);
        // tts
        // format para
    } catch (error) {
        console.error("Error fetching AI response:", error);
        text.innerHTML = "Error: Unable to fetch response.";
    } finally {
        chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: "smooth" });
        resetImageSelection();
    }
} 
// uncomment if doc below code dont work

// doc format 
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

//     if (user.file) {
//         if (user.file.isDocument && user.file.textContent) {
//             // For documents and code files
//             let prefix = "";
//             if (user.file.isCode) {
//                 prefix = "Here is the code content to analyze:\n```\n";
//             } else if (user.file.isSpreadsheet) {
//                 prefix = "Here is the spreadsheet data to analyze:\n";
//             } else {
//                 prefix = "Here is the document content to analyze:\n";
//             }
            
//             parts.push({ 
//                 text: prefix + user.file.textContent + (user.file.isCode ? "\n```" : "")
//             });
//         } else if (user.file.data) {
//             // For images/videos
//             parts.push({ inline_data: user.file });
//         }
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
//     } catch (error) {
//         console.error("Error fetching AI response:", error);
//         text.innerHTML = "Error: Unable to fetch response.";
//     } finally {
//         chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: "smooth" });
//         resetImageSelection();
//     }
// }
// doc format


// take a photo generate response function
// async function generateResponse(aiChatBox) {
//     const text = aiChatBox.querySelector(".ai-chat-area");
//     const apiKey = await fetchApiKey();

//     if (!apiKey) {
//         text.innerHTML = "Error: API key not found.";
//         return;
//     }

//     // Try current endpoints
//     // const endpoints = [
//     //     `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
//     //     `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`
//     // ];

//         // Replace your endpoints array with this:
// const endpoints = [
//     `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
//     `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`
// ];

//     const parts = [{ text: user.message }];
//     if (user.file.data) {
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
//             contents: [{ parts }],
//             generationConfig: {
//                 maxOutputTokens: 2048
//             }
//         })
//     };

//     for (const endpoint of endpoints) {
//         try {
//             const response = await fetch(endpoint, requestOptions);
//             const data = await response.json();
            
//             if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
//                 text.innerHTML = formatResponse(data.candidates[0].content.parts[0].text);
//                 return;
//             }
//         } catch (error) {
//             console.error(`Failed with endpoint ${endpoint}:`, error);
//         }
//     }

//     text.innerHTML = "Error: Could not get response from any API endpoint";
// }
// take a photo generate response function



// tts



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



// uncomment if below take a photo doesnt work
function handleChatResponse(userMessage)

{
    if (!userMessage.trim()) return; // Prevent empty messages
    // uncomment if below line dont work
    // user.message = userMessage;
    // uncomment it if below line dont work

    // format
    const basePrompt = userMessage.trim();
user.message = basePrompt.length > 60
  ? `Please answer the following clearly and in well-formatted style using bullet points, headers, and code blocks where needed:\n\n${basePrompt}`
  : basePrompt;

    // format
//    format para
// If message is small-talk, keep it short and casual
// const smallTalk = ["hello", "hi", "hey", "how are you", "what's up"];
// const normalizedMessage = userMessage.toLowerCase().trim();

// if (smallTalk.some(q => normalizedMessage.includes(q))) {
//     user.message = `Give a short and friendly response to: "${userMessage}"`;
// }

// format para


    //
    //video
    // const defaultIcon = document.querySelector('.default-icon');
    // const videoIcon = document.querySelector('.video-icon');
    // let fileContent = '';
    // if (user.file.data) {
    //     if (user.file.isVideo) {
    //         fileContent = `
    //             <div class="video-indicator">
    //                 <img src="video-icon.svg" class="video-icon-small">
    //             </div>
    //         `;
    //     } else {
    //         fileContent = `<img src="data:${user.file.mime_type};base64,${user.file.data}" class="chooseimg" />`;
    //     }
    // }
    //video
//video
//sentiment
// user.message = userMessage;
//sentiment
let html = `
<img src="user.png" alt="User" id="userImage" width="8%">
<div class="user-chat-area">
    ${user.message}
 ${user.file.data ? `<img src="data:${user.file.mime_type};base64,${user.file.data}" class="chooseimg" />` : ""}

    
</div>
`;
//video(real code in notepad)
// Reset icons
// defaultIcon.hidden = false;//video
// videoIcon.hidden = true;//video
    prompt.value = ""; // Clear input field

    let userChatBox = createChatBox(html, "user-chat-box");
    chatContainer.appendChild(userChatBox);
    chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: "smooth" });

    setTimeout(() => {
        let html = `
            <img src="ai.avif" alt="AI" id="aiImage" width="10%">
            <div class="ai-chat-area">
                <img src="loading.webp" alt="Loading" class="load" width="50px">
            </div>
        `;
        let aiChatBox = createChatBox(html, "ai-chat-box");
        chatContainer.appendChild(aiChatBox);
        generateResponse(aiChatBox);
    }, 600);
}
// uncomment if below take a photo doesnt work

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
  
//testing
//     let reader = new FileReader();
//     reader.onload = (e) => {
//         let base64string = e.target.result.split(",")[1];
//         user.file = {
//             mime_type: file.type,
//             data: base64string,
          
//         };
     
//         image.src = `data:${user.file.mime_type};base64,${user.file.data}`;
       
//         image.classList.add("choose");
//     };
//     reader.readAsDataURL(file);
// //testing

//uncomment if below doc code dont work
function resetImageSelection() {
    //video
    // const defaultIcon = document.querySelector('.default-icon');
    // const videoIcon = document.querySelector('.video-icon');
    // defaultIcon.hidden = false;
    // videoIcon.hidden = true;
    //video
    image.src = `img.svg`;
    image.classList.remove("choose");
    user.file = { mime_type: null, data: null,isVideo:false };//uncomment it if video lines do not work in function resetImageSelection(now uncomment it)
}
// uncomment if below code dont work


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


// uncomment if below video format dont work 10-5-25
if (imageinput) {
    imageinput.addEventListener("change", () => {
        const file = imageinput.files[0];
        if (!file) return;

        // Add size validation (optional)
        if (file.size > 100 * 1024 * 1024) {
            alert('File size too large (max 100MB)');
            return;
        }

        let reader = new FileReader();
        reader.onload = (e) => {
            let base64string = e.target.result.split(",")[1];
            user.file = {
                mime_type: file.type,
                data: base64string
            };
            image.src = `data:${user.file.mime_type};base64,${user.file.data}`;
            image.classList.add("choose");
        };
        reader.readAsDataURL(file);
    });
}
// uncomment if below video format dont work 10-5-25


// video format 10-5-25
// if (imageinput) {
//     imageinput.addEventListener("change", () => {
//         const file = imageinput.files[0];
//         if (!file) return;

//         if (file.size > 100 * 1024 * 1024) {
//             alert('File size too large (max 100MB)');
//             return;
//         }

//         const reader = new FileReader();
//         reader.onload = async (e) => {
//             let base64string = e.target.result.split(",")[1];

//             if (file.type.startsWith('video/')) {
//                 user.file = {
//                     mime_type: file.type,
//                     data: base64string
//                 };

//                 // Request thumbnail from backend
//                 const response = await fetch("http://localhost:3001/process-video", {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({
//                         videoData: base64string,
//                         mimeType: file.type
//                     })
//                 });

//                 const result = await response.json();
//                 if (result.thumbnail) {
//                     image.src = `data:image/png;base64,${result.thumbnail}`;
//                     image.classList.add("choose");
//                     user.file.thumbnail = result.thumbnail; // Save for chat
//                 } else {
//                     alert("Thumbnail generation failed");
//                 }

//             } else {
//                 // Image file
//                 user.file = {
//                     mime_type: file.type,
//                     data: base64string
//                 };
//                 image.src = `data:${user.file.mime_type};base64,${user.file.data}`;
//                 image.classList.add("choose");
//             }
//         };
//         reader.readAsDataURL(file);
//     });
// }

// video format 10-5-25

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
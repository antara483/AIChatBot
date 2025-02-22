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
let prompt = document.querySelector("#prompt");
let submitbtn = document.querySelector("#submit");
let chatContainer = document.querySelector(".chat-container");
let imagebtn = document.querySelector("#image");
let image = document.querySelector("#image img");
let imageinput = document.querySelector("#image input");
// mic
let micBtn = document.querySelector("#mic");
let isListening = false;
let recognition = null;
// mic

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
        let response = await fetch('http://localhost:3000/api/key'); // Fetch API key securely//uncomment it
        let data = await response.json();
        return data.apiKey;
    } catch (error) {
        console.error("Error fetching API key:", error);
        return null;
    }
}
//video

//video


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
                        { "text": user.message },
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
        text.innerHTML = apiResponse;

    } catch (error) {
        console.error("Error fetching AI response:", error);
        text.innerHTML = "Error: Unable to fetch response.";
    } finally {
        chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: "smooth" });
        resetImageSelection();
    }
} // Added missing closing brace

// Function to create a chat message box
function createChatBox(html, classes) {
    let div = document.createElement("div");
    div.innerHTML = html;
    div.classList.add(classes);
    return div;
}

// ... (rest of the code remains the same)
//testing

// Function to handle user chat input
function handleChatResponse(userMessage) {
    if (!userMessage.trim()) return; // Prevent empty messages

    user.message = userMessage;
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
imageinput.addEventListener("change", () => {
    const file = imageinput.files[0];
    if (!file) return;
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
    let reader = new FileReader();
    reader.onload = (e) => {
        let base64string = e.target.result.split(",")[1];
        user.file = {
            mime_type: file.type,
            data: base64string,
            // isVideo: user.file.isVideo
        };
        
        if (user.file.isVideo) {
            showVideoPreview(file);//real
            // defaultIcon.hidden = true;
            // videoIcon.hidden = false;
            //video
            image.src = 'video-icon.svg';
            //video
        } else {
            //video
            // defaultIcon.hidden = false;
            // videoIcon.hidden = true;
            //video
            image.src = `data:${user.file.mime_type};base64,${user.file.data}`;
        }
        image.classList.add("choose");
    };
    reader.readAsDataURL(file);
});
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

// Function to reset image selection
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

// Click event for image upload
imagebtn.addEventListener("click", () => {
    imagebtn.querySelector("input").click();
});
// mic
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

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        prompt.value = transcript;
    };

    recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        stopSpeechRecognition();
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
// mic

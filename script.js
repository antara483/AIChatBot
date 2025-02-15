// let prompt=document.querySelector("#prompt")
// let submitbtn=document.querySelector("#submit")
// let chatContainer=document.querySelector(".chat-container")
// let imagebtn=document.querySelector("#image")
// let image=document.querySelector("#image img")
// let imageinput=document.querySelector("#image input")
// //first
// // const Api_Url="https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=Your-Api-Key"
// //second
//  const Api_Url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyB97SPNbgTUXdOGZrBIR05dAl_2atggM2c`;
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




let prompt = document.querySelector("#prompt");
let submitbtn = document.querySelector("#submit");
let chatContainer = document.querySelector(".chat-container");
let imagebtn = document.querySelector("#image");
let image = document.querySelector("#image img");
let imageinput = document.querySelector("#image input");

let user = {
    message: null,
    file: {
        mime_type: null,
        data: null
    }
};

// Function to fetch API key from the backend
async function fetchApiKey() {
    try {
        let response = await fetch('http://localhost:3000/api/key'); // Fetch API key securely
        let data = await response.json();
        return data.apiKey;
    } catch (error) {
        console.error("Error fetching API key:", error);
        return null;
    }
}

// Function to generate AI response
async function generateResponse(aiChatBox) {
    let text = aiChatBox.querySelector(".ai-chat-area");

    // Get API key
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
}

// Function to create a chat message box
function createChatBox(html, classes) {
    let div = document.createElement("div");
    div.innerHTML = html;
    div.classList.add(classes);
    return div;
}

// Function to handle user chat input
function handleChatResponse(userMessage) {
    if (!userMessage.trim()) return; // Prevent empty messages

    user.message = userMessage;

    let html = `
        <img src="user.png" alt="User" id="userImage" width="8%">
        <div class="user-chat-area">
            ${user.message}
            ${user.file.data ? `<img src="data:${user.file.mime_type};base64,${user.file.data}" class="chooseimg" />` : ""}
        </div>
    `;

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
imageinput.addEventListener("change", () => {
    const file = imageinput.files[0];
    if (!file) return;

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

// Function to reset image selection
function resetImageSelection() {
    image.src = `img.svg`;
    image.classList.remove("choose");
    user.file = { mime_type: null, data: null };
}

// Click event for image upload
imagebtn.addEventListener("click", () => {
    imagebtn.querySelector("input").click();
});

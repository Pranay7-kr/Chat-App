//Created an array for UserList
const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];
// Created an array for emojis
const emojis = ['😀', '😂', '😍', '😊', '👍', '🎉', '❤️', '🙌', '😎', '😘', '🥳', '🤩', '👏', '😉', '💪'];
const messageInput = document.getElementById('message-input');  // get message input for adding listners.
const chatContainer = document.querySelector('.chat-container'); // get chat container for adding emojis section.
const userListContainer = document.querySelector('.user-list'); // get user List container for adding user when anyone write '@' in the message input section.

// Added a event listner, when you write message and click on enter key then your message will display on the screen.
messageInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        console.log(e.key);
        sendMessage();
    }
});


// Created a sendMessage function, when you write message and click on submit button then your message will display on the screen .
function sendMessage() {

    message = messageInput.value.trim();
    // If you click on submit button or Enter key without writing message it will return and send a message in ur console.
    if (message === '') {
        console.log("you have to write something in ur message-input");
        return;
    }
    // Created a randomUser for taking random name from the user_List.
    const randomUser = user_list[Math.floor(Math.random() * user_list.length)];
    const scrollSection = document.querySelector('.scroll-section'); // get a scroll section for adding the message in the scroll section and display on the screen.

    // Created a time for displaying at what timing you sent the message.
    const currentTime = new Date();
    let hours = currentTime.getHours();
    let minute = currentTime.getMinutes();


    // Create a message container for adding all neccessary message for displaying on screen such as profile logo, name, message, timing.
    const messageContainer = `
                    <div class="profile-section">
                        <div class="profile-text">${randomUser.substring(0, 2)}</div>
                        <div class="name-text">${randomUser}</div>
                        <span class="time-section">${hours}:${minute}</span>
                    </div>
                    <div class="new-message">
                        <p>${message}</p>
                    </div>
                    <span class="like"><i class="fa-solid fa-heart fa-beat" style="color: #9b0303;"></i><span class="like-count">0</span></span>
                
    `;

    
    const messageElement = document.createElement('div'); // Created an div tag. 
    messageElement.classList.add('message-section'); // Added the class in the message element.
    messageElement.innerHTML = messageContainer; // Storing the message in the message element.
    scrollSection.appendChild(messageElement); // After that add the message element in scroll section.
    scrollToBottom(scrollSection); // Created a function, scroll bar always in the down. 

    // Every profile log have diffrent background color
    const profileText = document.querySelectorAll('.profile-text');
    for (let i = 0; i < profileText.length; i++) {
        if (i % 2 != 0) {
            profileText[i].style.backgroundColor = '#110e69';
        }
    }
    messageInput.value = '';  // After sent the message, the message section will be empty.

    // Created a like button for every message, when you double click on message then like will display. 
    const likeBtn = messageElement.querySelector('.like');
    const likeCount = likeBtn.querySelector('.like-count');
    messageElement.addEventListener('dblclick', () => {
        likeBtn.style.display = 'flex';
        let count = parseInt(likeCount.innerHTML);
        likeCount.innerHTML = count + 1;
    })
}

// Scroll bar always in the bottom.
function scrollToBottom(element) {
    element.scrollTop = element.scrollHeight;
}

// created a event listner for mention the user name.
messageInput.addEventListener('keyup', () => {
    const message = messageInput.value;
    if (message.startsWith('@')) {
        const emojiSection = document.querySelector('.emoji-section');
        if(emojiSection){
            emojiSection.style.display = 'none';
        }
        displayUserList();
    } else {

        hideUserList();
    }
});

// Displaying the user list on the screen.
function displayUserList() {
    userListContainer.innerHTML = ''; // Clear previous list
   
    userListContainer.style.display = 'inline-block';
    const searchTerm = messageInput.value.substring(1).toLowerCase();
    const filteredUsers = user_list.filter(user => user.toLowerCase().includes(searchTerm));

    filteredUsers.forEach(user => {
        const div = document.createElement("div");
        div.classList.add("name");
        div.textContent = user;
        div.addEventListener('click', () => {
            messageInput.value = user;
            hideUserList();
        });
        userListContainer.appendChild(div);
    });
}

function hideUserList() {
    userListContainer.style.display = 'none';
}


// created a emoji button for displaying the emoji on the screen.
const emojiButton = document.getElementById('emoji-btn');

emojiButton.addEventListener('click', () => {
    let emojiSection = document.querySelector('.emoji-section');
    if (!emojiSection) {
        const div = document.createElement('div');
        div.classList.add('emoji-section');
        div.innerHTML = '';
        emojis.forEach((emoji) => {
            const span = document.createElement('span');
            span.classList.add('emoji');

            span.setAttribute('onclick', 'insertEmoji(this)');
            span.innerHTML = `${emoji}`;

            div.appendChild(span);
        })
        div.style.display = 'flex';
        chatContainer.appendChild(div);
    }else{
        emojiSection.style.display = emojiSection.style.display === 'flex' ? 'none' : 'flex';
    }
});

// adding emoji on message input.
function insertEmoji(emoji) {
    const messageInput = document.getElementById('message-input');
    
    messageInput.value += emoji.innerHTML;
}

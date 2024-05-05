
const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];
const emojis = ['😀', '😂', '😍', '😊', '👍', '🎉', '❤️', '🙌', '😎', '😘', '🥳', '🤩', '👏', '😉', '💪'];
const messageInput = document.getElementById('message-input');
const chatContainer = document.querySelector('.chat-container');
const userListContainer = document.querySelector('.user-list');
messageInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        console.log(e.key);
        sendMessage();
    }
})

function sendMessage() {

    message = messageInput.value.trim();
    if (message === '') {
        console.log("you have to write something in ur message-input");
        return;
    }
    const randomUser = user_list[Math.floor(Math.random() * user_list.length)];
    const scrollSection = document.querySelector('.scroll-section');
    const currentTime = new Date();
    let hours = currentTime.getHours();
    let minute = currentTime.getMinutes();



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


    const messageElement = document.createElement('div');
    messageElement.classList.add('message-section');
    messageElement.innerHTML = messageContainer;
    scrollSection.appendChild(messageElement);
    scrollToBottom(scrollSection);
    const profileText = document.querySelectorAll('.profile-text');
    for (let i = 0; i < profileText.length; i++) {
        if (i % 2 != 0) {
            profileText[i].style.backgroundColor = '#110e69';
        }
    }
    messageInput.value = '';
    const likeBtn = messageElement.querySelector('.like');
    const likeCount = likeBtn.querySelector('.like-count');
    messageElement.addEventListener('dblclick', () => {
        likeBtn.style.display = 'flex';
        let count = parseInt(likeCount.innerHTML);
        likeCount.innerHTML = count + 1;
    })
}


function scrollToBottom(element) {
    element.scrollTop = element.scrollHeight;
}

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

function insertEmoji(emoji) {
    const messageInput = document.getElementById('message-input');
    
    messageInput.value += emoji.innerHTML;
}
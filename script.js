const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const emptyS = '';

// Game Messages have been made into constants
const winningMsg = 'Congratulations! You won! 😁';
const losingMsg = "Unfortunately you lost. 😢";

const words = [
    'application', 'programming', 'interface', 'wizard', 'corona', 'mustang', 'netflix',
    'remote', 'binge', 'unemployment', 'video', 'home', 'mask', 'election', 'code',
    'computer', 'bored', 'editor', 'music', 'virtual', 'game', 'pandemic', 'distancing'
];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];

const wrongLetters = [];

function displayWord(){
    wordEl.innerHTML = `
        ${selectedWord
            .split('')
            .map(letter => `
                <span class="letter">
                    ${correctLetters.includes(letter) ? letter : ''}
                </span>
            `).join('')
        }
    `;

    const innerWord = wordEl.innerText.replace(/\n/g, '');

    if(innerWord === selectedWord){
        finalMessage.innerText = winningMsg;
        popup.style.display = 'flex';
    }
}


//  Update Wrong Letters
 function updateWrongLettersEl(){
    wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if(index < errors){
            part.style.display = 'block';
        }
        else{
            part.style.display = 'none';
        }
    });

    // Check if lost
    if(wrongLetters.length === figureParts.length){
        finalMessage.innerText = losingMsg;
        popup.style.display = 'flex';
    }
 }

 //Show Notification
 function showNotification(){
    
    if(finalMessage == winningMsg || finalMessage == losingMsg){
        notification.classList.remove('show');
    }
    else{
        notification.classList.add('show'); 

        setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
    }
 }

// KeyDown Letter Press
window.addEventListener('keydown', e => {
    if(e.keyCode >= 65 && e.keyCode <= 90){
        let letter = e.key;

        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);

                displayWord();
            }
            else{
                showNotification();
            }
        }
        else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);

                updateWrongLettersEl();
            }
            else{
                showNotification();
            }
        }
    }
});

// Restart the Game
playAgainBtn.addEventListener('click', () => {
    // Empty Arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    updateWrongLettersEl();

    popup.style.display = 'none';
});

displayWord();
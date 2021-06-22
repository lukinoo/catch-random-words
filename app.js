// global variables
const word = document.getElementById('word');
const textArea = document.getElementById('word-type');
const introButton = document.getElementById('intro-button');
const timer = document.getElementById('timer');
const score = document.getElementById('score');
const popUp = document.getElementById('pop-up-cont');
const URL = "https://random-words-api.vercel.app/word";
let time = 60;
let scoreIncrement = 0;

textArea.addEventListener('keyup',() => {
    const spanWords = document.querySelectorAll('span');
    const textAreaValue = textArea.value.split("");
    let state = true; 
    // characters looping here and creating span for wordOption function
    spanWords.forEach((eachSpan,index) => {
        const chars = textAreaValue[index];
        wordsOption(eachSpan,chars)
    })
    // function which indicates characters is correct or NOT
    function wordsOption(spancharacters,textareachars) { 
        if (textareachars == null) {
            spancharacters.classList.remove('correct')
            spancharacters.classList.remove('incorrect')
            state = false
          } else if (textareachars === spancharacters.innerHTML) {
            spancharacters.classList.add('correct')
            spancharacters.classList.remove('incorrect')
          } else {
            spancharacters.classList.remove('correct')
            spancharacters.classList.add('incorrect')
            state = false
          }
    }
    // checking if random word is correct then call's nextWordGenerate function
    if (state) {
        nextWordGenerate()
    }
})

// when this function event done timer start's decresing
introButton.addEventListener('click', () => {
    const intro = document.getElementById('intro');
    intro.classList.add('intro-transform')
    let Interval = setInterval(() => {
        timer.innerHTML = `0:${time}⌛`;
        time--;
        // checking if timer is less then 0
        if (time < 0) {
            popUp.style.animation = "popup 0.75s ease forwards";
            popUp.style.display = "flex";
            clearInterval(Interval)
        }
    },1000);
})
// fetching url which generate random world
function fetchUrl() {
    return fetch(URL)
        .then(res => res.json())
        .then(Data => Data[Math.floor(Math.random()*Data.length)])
}

async function nextWordGenerate() {
    // random word generate here 
    const nextWord = await fetchUrl();
    // this variable clear up main word part
    word.innerHTML = "";
    score.innerHTML = `score:${scoreIncrement}`;
    popuptext(scoreIncrement);
    scoreIncrement++;
    // random word looped here
    nextWord.word.split("").forEach(char => {
        const eachChar = document.createElement('span');
        // each character will be in lower case
        eachChar.innerHTML = char.toLowerCase();
        word.appendChild(eachChar);
    })
    // this variable clear up textarea typing side every time when nextWordGenerate function called
    textArea.value = null;
}

function popuptext(score) {
    const currentScore = document.getElementById('current-score');
    // score result when popup showing
    currentScore.innerHTML = score;
}
// game restart function
function replayGame() {
    window.location = "index.html";
}

nextWordGenerate();
'use strict';


import { onEvent, select, selectAll, print } from './utilis.js';
import { Score } from './score.js';

const restart = select('.restart')
const shake = select('.restart2')
const body = select('body')
const para = select(' p')
const first = select('.first')
const two = select('.two')
const button = select('.select')
const hits = select('.hits')
const timer = select('.seconds')
const winner = select('.winner')
const play = select('.play');
const score = select('.score2')
const box = select('.score')
const animation = select('.animation')
const feedback = select('.feedback')
const start = new Audio('./assets/audio/start-game.wav')
start.type = 'audio/mp3';
const bonus = new Audio('./assets/audio/bonus.wav')
bonus.type = 'audio/mp3'
const onload = new Audio('./assets/audio/onload.mp3')
onload.type = 'audio/mp3'
const lose = new Audio('./assets/audio/lose.wav')
lose.type = 'audio/mp3'
const bgmusic = new Audio('./assets/audio/bgmusic.mp3')
lose.type = 'audio/mp3'


window.addEventListener('load', () => {
    first.disabled = true;
    restart.style.display = 'none'
});

/*------Function to get random words--------------*/
let words = ['dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building', 'population',
    'weather', 'bottle', 'history', 'dream', 'character', 'money', 'absolute',
    'discipline', 'machine', 'accurate', 'connection', 'rainbow', 'bicycle',
    'eclipse', 'calculator', 'trouble', 'watermelon', 'developer', 'philosophy',
    'database', 'periodic', 'capitalism', 'abominable', 'component', 'future',
    'pasta', 'microwave', 'jungle', 'wallet', 'canada', 'coffee', 'beauty', 'agency',
    'chocolate', 'eleven', 'technology', 'alphabet', 'knowledge', 'magician',
    'professor', 'triangle', 'earthquake', 'baseball', 'beyond', 'evolution',
    'banana', 'perfumer', 'computer', 'management', 'discovery', 'ambition', 'music',
    'eagle', 'crown', 'chess', 'laptop', 'bedroom', 'delivery', 'enemy', 'button',
    'superman', 'library', 'unboxing', 'bookstore', 'language', 'homework',
    'fantastic', 'economy', 'interview', 'awesome', 'challenge', 'science', 'mystery',
    'famous', 'league', 'memory', 'leather', 'planet', 'software', 'update', 'yellow',
    'keyboard', 'window'];



// const deck1 = [...new Array(90).keys()];
// deck1.sort(() => Math.random()-0.5);
// console.log(deck1);

let count = 0;
function random() {
    let random = Math.floor(Math.random() * words.length);
   
    para.innerHTML = words[random]
    words.splice(random, 1)
    
    // start.play()
}


/*-----Function to get scores-------*/

function date() {
    const percentage = (count / 90 * 100).toPrecision(3)
    const now = new Date();
    const newdate = now.toString().substring(3, 15);
    const newValue = new Score(newdate, count, percentage);
    const newscore = newValue.getInfo();
    box.style.display = 'inline'


    /*---Feedback to the player---*/
    if (count > 40) {
        feedback.innerHTML = 'Amazing!'
    } else if (count > 20 && count < 40) {
        feedback.innerHTML = 'Good Job'
    } else {
        feedback.innerHTML = 'Good Luck next time'
    }
    score.innerHTML = newscore;
}

/*----count the hits-----*/
function value() {
    if (first.value.toLowerCase().trim() == para.innerHTML) {
        first.value = '';
        count++;
        hits.innerHTML = `Hits : ${count}`;
        random()
        bonus.play()
    }
}




/*---Function for the focus of input value----*/
function focus() {
    first.value = '';
    first.focus();
    first.scrollIntoView();
}

/*----Function to start the game -----*/
button.addEventListener('click', () => {
    onload.pause();
    first.disabled = false;
    bgmusic.play();
    play.innerHTML = 'Type as fast as you can';
    focus()
    button.style.display = 'none'


    let timer = 5;
    let progress = setInterval(displayTime, 1000);
    /*------Function to display time -----*/
    function displayTime() {
        document.querySelector(".seconds").innerHTML = timer + " Seconds";
        timer -= 1;
        if (timer === 0) {
            clearInterval(progress);
            first.innerHTML = '';
            first.disabled = true;
            button.disabled = true;
            para.innerHTML = 'Click on Restart to play again';
            restart.style.display = 'none';
            shake.style.display = 'inline';
            bgmusic.pause();
            lose.play();
            document.querySelector(".seconds").innerHTML = "Time Over !";
            play.style.visibility = 'visible';
            date();
            
           }
    }
    random()
})

restart.addEventListener('click', () => {
    window.location.reload()
})

shake.addEventListener('click', () => {
    onload.pause();
    bgmusic.play();
    play.innerHTML = 'Type as fast as you can';
    first.disabled = false
    focus();
    button.style.display = 'none'
    box.style.display = 'none'
    shake.style.display = 'none'


    let timer = 5;
    let progress = setInterval(displayTime, 1000);
    /*------Function to display time -----*/
    function displayTime() {
        document.querySelector(".seconds").innerHTML = timer + " Seconds";
        timer -= 1;
        if (timer === 0) {
            clearInterval(progress);
            first.innerHTML = '';
            first.disabled = true;
            button.disabled = true;
            para.innerHTML = 'Click on Restart to play again';
            restart.style.display = 'none';
            shake.style.display = 'inline';
            bgmusic.pause();
            lose.play();
            document.querySelector(".seconds").innerHTML = "Time Over !";
            play.style.visibility = 'visible';
            date();
            
           }
    }
    random()
})
onEvent('load', window, () => {
    onload.play();
})

window.addEventListener('keyup', (event) => {
    value()

})

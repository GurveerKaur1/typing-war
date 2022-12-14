'use strict';


import { onEvent, select, selectAll, print } from './utilis.js';
import { Score } from './score.js';

const restart = select('.restart')
const shake = select('.restart2')
const body = select('.flex')
const para = select(' p')
const first = select('.first')
const two = select('.row')
const button = select('.select')
const hits = select('.hits')
const timer = select('.seconds')
const icon2 = select('.icon2')
const play = select('.play');
const score = select('.score2')
const box = select('.score')
const icon = select('.icon')
const feedback = select('.feedback')
const valued = select('.highScores')
const time3 =document.querySelector(".seconds") 

const my = select('.my')

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
// const hide = select('.')


window.addEventListener('load', () => {
    first.disabled = true;
    // restart.style.display = 'none'
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
let high;



let count = 0;
let turns = 0;
let array = [];
function random() {
    let random = Math.floor(Math.random() * words.length);

    para.innerHTML = words[random]
    words.splice(random, 1)

    start.play()
}

const paragraph = document.createElement('p');


/*-----Function to get scores-------*/

function date() {
    const percentage = (count / 90 * 100).toPrecision(3)
    const now = new Date();
    const newdate = now.toString().substring(3, 15);
    const newValue = new Score(newdate, count, percentage);
    const newscore = newValue.getInfo();
    box.style.visibility = 'visible'


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


    let timer = 9;
    let progress = setInterval(displayTime, 1000);
    /*------Function to display time -----*/
    function displayTime() {
        document.querySelector(".seconds").innerHTML = timer + " Sec";
        timer -= 1;
        if (timer === -1) {
            turns++;
            clearInterval(progress);
            first.innerHTML = '';
            first.disabled = true;
            button.disabled = true;
            para.innerHTML = 'Click on Restart to play again';
            // restart.style.display = 'none';
            icon.style.display = 'none'
            // shake.style.display = 'inline';
            bgmusic.pause();
            lose.play();
            document.querySelector(".seconds").innerHTML = "Over !";
            play.style.visibility = 'visible';
            date();

            // getData()
            // box.style.display = 'grid'
            box.style.visibility = 'visible'
        //   two.style.display = 'none'
        }
    }

    random()
})


shake.addEventListener('click', () => {
    hits.innerText = 'Hits : 0';
    count = 0;
    onload.pause();
    bgmusic.play();
    play.innerHTML = 'Type as fast as you can';
    first.disabled = false
    focus();
icon.style.display = 'flex'
    button.style.display = 'none'
    box.style.visibility = 'hidden'
    // shake.style.display = 'none'
    two.style.display = 'grid'


    let timer = 9;
    let progress = setInterval(displayTime, 1000);
    /*------Function to display time -----*/
    function displayTime() {
        document.querySelector(".seconds").innerHTML = timer + " Sec";
        timer = timer - 1;
        if (timer === -1) {
            turns++
            clearInterval(progress);
            first.innerHTML = '';
            first.disabled = true;
            button.disabled = true;
            icon.style.display = 'none'
            para.innerHTML = 'Click on Restart to play again';
            // restart.style.display = 'none';
            // shake.style.display = 'inline';
            box.style.visibility = 'visible'
            bgmusic.pause();
            lose.play();
            document.querySelector(".seconds").innerHTML = "Over !";
            play.style.visibility = 'visible';
            date();

            value();

            // getData();


        }
    }
    random()
})
onEvent('click', restart, () => {
    onload.play();
    valued.style.visibility = 'visible'
    two.style.visibility = 'hidden'
    box.style.visibility = 'hidden'
    play.innerHTML = ''
   
    getData()

})

onEvent('click', icon2, () => {
    valued.style.visibility = 'hidden'
    box.style.visibility = 'visible'
    two.style.visibility = 'visible'
    play.innerHTML = 'Type as fast as you can';
})

window.addEventListener('keyup', (event) => {
    value()

})
function saveScores() {
    const printScores = JSON.parse(localStorage.getItem('printScores')) || [];

    printScores.sort((a , b) => b.score - a.score);
    printScores.splice(9);


    
if (localStorage.getItem('printScores') == null) {
    my.innerHTML = ''
} else {
    my.innerHTML = printScores.map(update => {
        return `<li>${update.score} Words  <span></span>  || ${update.percent}%</li>`
    }).join(' ')

}



}

function getData() {
    let percentage = ((count / 90) * 100).toFixed(2);
    const printScores = JSON.parse(localStorage.getItem('printScores')) || [];
    const update = {
        score: count,
        percent: percentage
    };

    printScores.push(update);
    localStorage.setItem('printScores', JSON.stringify(printScores))



    saveScores()

}


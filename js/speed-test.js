let easyWords=["Hello","Code","Town","Task","Scala","Funny","Roles","Rust"];
let normalWords=easyWords.concat(["Country","Testing","Youtube","Linkedin","Twitter","Github","Leetcode","Internet","Python","Cascade","Coding","Working","Playing"]);
let hardWords=normalWords.concat(["Programming","Javascript","Destructuring","Paradigm","Styling","Documentation","Dependencies"]);
let words=[];
let levels={
    "Easy":5,
    "Normal":3,
    "Hard":2
};
let selectLevel=document.getElementById("levels");
let theLevel=document.querySelector(".message .level");
let totalSeconds=document.querySelector(".message .seconds");
let startButton=document.getElementsByTagName("button")[0];
let theWord=document.querySelector(".the-word");
let input=document.getElementsByClassName("input")[0];
let upcomingWords=document.querySelector(".upcoming-words");
let timeLeft=document.querySelector(".control .time span");
let userScore=document.querySelector(".control .score .got");
let totalScore=document.querySelector(".control .score .total");
let finish=document.querySelector(".finish");
let gameInstrcution=document.querySelector(".game .game-instruction p");
let theLastScore=document.querySelector(".the-last .last-score span");
let theHighScore=document.querySelector(".the-last .high-score span");
let word='';
let firstTime=true;
let highScore;
let lastScore;


fillGameInstruction();
getScoresFromLocalStorage();
initalizeDefaultValues();
selectTheLevel();
clickStartButton();
input.onpaste=function(){
    return false;
};

function fillGameInstruction(){
    gameInstrcution.innerHTML=`
    Select your level do you want to play on it.</br>
    <u>Levels</u></br>
    <b>Easy   :</b>  you should  finish the word that written before the input before ${levels["Easy"]} second.</br>
    <b>Normal :</b> you should  finish the word that written before the input before ${levels["Normal"]} second.</br>
    <b>Hard   :</b> you should finish the word  that written before the input before ${levels["Hard"]} second.</br>
    `
}
function initalizeDefaultValues(){
    theLevel.innerHTML="Normal";
    totalSeconds.innerHTML=levels["Normal"];
    timeLeft.innerHTML = totalSeconds.innerHTML;
    words.push(...normalWords);
    totalScore.innerHTML = words.length;
    userScore.innerHTML=0;
}
function selectTheLevel(){
    selectLevel.addEventListener("click",function(){
        theLevel.innerHTML=selectLevel.value;
        totalSeconds.innerHTML=levels[selectLevel.value];
        timeLeft.innerHTML =levels[selectLevel.value];
        arrayForEveryLevel();
        totalScore.innerHTML = words.length;
    });
}
function arrayForEveryLevel(){
    words=[];
    if(selectLevel.value=="Easy"){
        words.push(...easyWords);
    }
    else if(selectLevel.value=="Normal"){
        words.push(...normalWords);
    }
    else if(selectLevel.value=="Hard"){
        words.push(...hardWords);
    }
}
function clickStartButton(){
    startButton.onclick=function(){
        startButton.style.display='none';
        input.focus();
        if(startButton.innerHTML=="Play Again"){
            getScoresFromLocalStorage();
            playAgain();
        }
        startGame();   
    };
}

function startGame(){
    generateWord()
    generateUpComingWords();
    startTimeCount();
}
function generateWord(){
    let wordIndex=Math.floor(Math.random()*words.length);
    word=words[wordIndex];
    theWord.innerHTML=word;
    words.splice(wordIndex,1);
}
function generateUpComingWords(){
    upcomingWords.innerHTML='';
    upcomingWords.style.display='flex';
    for(let i=0;i<words.length;i++){
        let div=document.createElement("div");
        let text=document.createTextNode(words[i]);
        div.appendChild(text);
        upcomingWords.appendChild(div);
    }
}
function startTimeCount(){
    if(firstTime){
        timeLeft.innerHTML=Number(timeLeft.innerHTML)+3;
        firstTime=false;
    }
    let timeCount=setInterval(() => {
        timeLeft.innerHTML--;
        if(timeLeft.innerHTML==0){
            clearInterval(timeCount);
            checkTheInput();
        }
    }, 1000);
}
function checkTheInput(){
    if(input.value.toLowerCase()==word.toLowerCase()){
        input.value='';
        userScore.innerHTML++;
        timeLeft.innerHTML = totalSeconds.innerHTML;
        if(words.length>0){
            startGame();
        }
        else{
            finish.innerHTML="Excellent";
            finish.classList.remove("bad");
            finish.classList.add("good");
            finish.style.display="block";
            theWord.innerHTML="";
            addScoresToLocalStorage();
            showPlayAgain();
        }
    }
    else{
        finish.innerHTML="Game Over";
        finish.classList.add("bad");
        finish.style.display="block";
        upcomingWords.style.display='none';
        input.value='';
        theWord.innerHTML="";
        addScoresToLocalStorage();
        showPlayAgain();
    }
}
function playAgain(){
    userScore.innerHTML=0;
    finish.style.display="none";
    timeLeft.innerHTML =levels[selectLevel.value];
    arrayForEveryLevel();
    clickStartButton();
}
function showPlayAgain(){
    startButton.innerHTML="Play Again"
    startButton.style.display='block';
}
function addScoresToLocalStorage(){
    let lastScore=`${userScore.innerHTML} / ${totalScore.innerHTML}`;
    if(highScore<userScore.innerHTML){
        highScore=userScore.innerHTML;
    }
    localStorage.setItem("last-score",lastScore);
    localStorage.setItem("high-score",highScore);
}
function getScoresFromLocalStorage(){
    if(localStorage.getItem("high-score")){
        highScore=localStorage.getItem("high-score");
    }
    else{
        highScore=0;
    }
    if(localStorage.getItem("last-score")){
        lastScore=localStorage.getItem("last-score");
    }
    else{
        lastScore="0";
    }
    theHighScore.innerHTML=highScore;
    theLastScore.innerHTML=lastScore;
}
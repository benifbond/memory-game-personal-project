
const cardPlate = ["box.png", "box.png", "clock.png", "clock.png", "instagram.png", "instagram.png", "linkedin.png", "linkedin.png", "tinder.png", "tinder.png", "new.png", "new.png", "sprechblase.png", "sprechblase.png", "twitter.png","twitter.png"];
const slot = document.querySelector(".slot");


let opened = [];

let matched = [];



let gif =document.getElementById("gif");
let scoreboard = document.querySelector('.scoreBoard');
const modal = document.getElementById("modal");
const reset = document.querySelector(".reset-btn");
const playAgain = document.querySelector(".try-again");
const startButton = document.querySelector(".start-button")
const sectionOne = document.querySelector('.sectionOne')
const container = document.querySelector('.container')

const movesCount = document.querySelector(".moves-counter");
let moves = 0;


const timeCounter = document.querySelector(".timer");

let time;

let minutes = 0;
let seconds = 0;
let timeStart = false;

//////////////////////////////////// audio Section////////////////////////////////////////////////////////
function playSound(url){
	new Audio(url).play();
	}

function matchSound (){
let myAudio = document.createElement("audio");
	myAudio.src = "/audio/achievement.wav";
	myAudio.play();
}
;
function winSound(){
	let winAudio = document.createElement("audio");
	winAudio.src = "/audio/winning-swoosh.wav";
	winAudio.play();
}

function nomatchSound(){
	let wrongMatchAudio = document.createElement("audio");
	wrongMatchAudio.src = "/audio/wrong.wav";
	wrongMatchAudio.play();
}
function backgroundAudio(){
	let backgroundAudio = document.createElement("audio");
	backgroundAudio.src = "/audio/epic-trailer.mp3";
	backgroundAudio.play();
	backgroundAudio.volume = 0.2;
	backgroundAudio.loop=true
}
////////////////////////////////////////END OF AUDIO/////////////////////////////////
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
  }
  return array;
}



 function startGame() {
	const shuffledDeck = shuffle(cardPlate); 
	for (let i = 0; i < shuffledDeck.length; i++){
		const liTag = document.createElement('li');
		liTag.classList.add('card');
		const addImage = document.createElement("img");
		liTag.appendChild(addImage);
		addImage.setAttribute("src", "https://github.com/benifbond/memory-game-personal-project/tree/master/images" + shuffledDeck[i] + "?raw=true");
		addImage.setAttribute("alt", "images");
		slot.appendChild(liTag);
	};
	backgroundAudio();

}


window.addEventListener('load',() => {
	container.style.display = 'none';
	gif.style.display ="none"
})


startButton.addEventListener('click',function(){
	sectionOne.style.display='none';
	container.style.display = 'block'
	startGame()
})

function removeCard() {
	while (slot.hasChildNodes()) {
		slot.removeChild(slot.firstChild);
	}
}

function timer() {
	time = setInterval(function() {
		seconds++;
			if (seconds === 60) {
				minutes++;
				seconds = 0;
			}
		timeCounter.innerHTML = "<i class='fa fa-hourglass-start'></i>" + " Timer: " + minutes + " Mins " + seconds + " Secs" ;
	}, 1000);
	
}



function stopTime() {
	clearInterval(time);
}


function resetEverything() {
	stopTime();
	timeStart = false;
	seconds = 0;
	minutes = 0;
	timeCounter.innerHTML = "<i class='fa fa-hourglass-start'></i>" + " Timer: 00:00";

	moves = 0;
	movesCount.innerHTML = 0;
	matched = [];
	opened = [];
	removeCard();
	startGame();
	
}


function movesCounter() {
	movesCount.innerHTML ++;
	moves ++;
}

function compareTwo() {
	if (opened.length === 2) {
  		document.body.style.pointerEvents = "none";
  }
	if (opened.length === 2 && opened[0].src === opened[1].src) {
		match();
	} else if (opened.length === 2 && opened[0].src != opened[1].src) {
		noMatch();
	}
}

function match() {
	setTimeout(function() {
		opened[0].parentElement.classList.add("match");
		opened[1].parentElement.classList.add("match");
		matched.push(...opened);
		document.body.style.pointerEvents = "auto";
		winGame();
		matchSound ();
		opened = [];
	}, 600);
	movesCounter();
}


function noMatch() {
	setTimeout(function() {
		opened[0].parentElement.classList.remove("flip");
		opened[1].parentElement.classList.remove("flip");
		document.body.style.pointerEvents = "auto";
		opened = [];
	}, 700);
	nomatchSound();
	movesCounter();
}


function displayModal() {
const modalClose = document.getElementsByClassName("close")[0];
	modal.style.display= "block";
	modalClose.onclick = function() {
		modal.style.display = "none";
	};
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	};
}
 





function winGame() {
	
	if (matched.length === 16) {
		stopTime();
		winSound();
		}
		
}



slot.addEventListener("click", function(evt) {
	if (evt.target.nodeName === "LI") {
		
		if (timeStart === false) {
			timeStart = true; 
			timer();
		}
		flipCard();
	}
	function flipCard() {
		evt.target.classList.add("flip");
		addToOpened();
	}
	
	function addToOpened() {
		if (opened.length === 0 || opened.length === 1) {	
			opened.push(evt.target.firstElementChild);
		}
		compareTwo();
	}
	
}); 

reset.addEventListener('click', resetEverything);



playAgain.addEventListener('click',function() {
	resetEverything();
	playSound()
}) 




/////////////////////////////////// Greeting ///////////////////////////

function Heading() {
	const date = new Date();
	const currentHour = date.getHours();
	
	
	var greeting = "";
	if (currentHour > 0 && currentHour < 12) {
	  greeting = "Good morning";
	  
	} else if (currentHour > 12 && currentHour < 18) {
	  greeting = "Good Afternoon";
	  
	} else {
	  greeting = "Good Evening";
	  
	}
	return greeting
  }

let greetingMessge = document.getElementById('greeting').innerHTML = Heading()
 
let trySomethingOut = document.getElementById('trySomethingOut').innerText = "Woo! ready for a challenge? I still don't wanna tell you that ....... sorry!!!🤣"





//TODO: fix "winner" but - not working when reset

//declare variables
let moves = 0;
let timer = 0;
let seconds = "0" + 0;
let minutes = 0;
let cardFlipCount = 0;
let interval;

// Create a list that holds all of your cards
let cardDeck = document.querySelectorAll('.card');
let cardArray = [];

for (i=0; i < cardDeck.length; i++) {
	cardArray.push(cardDeck[i].innerHTML);
}

reset();

function resetStars() {  //adding stars back to score (no more than 3 stars)
	let stars = document.querySelectorAll('.fa-star');
	for (i = 0; i < stars.length; i++) {
		stars[i].classList.remove('fa');
		stars[i].classList.remove('far');
		stars[i].classList.add('fa');
	}
}
 
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Reset function - used to shuffle and reset the deck for a new game
function reset() {
//shuffle the list of cards using the provided "shuffle" method
	let shuffledCards = shuffle(cardArray);
//reset move count to 0
	cardFlipCount = 0;
	moves = 0;
	//reset the display of move count
	document.querySelector('.moves').innerText = moves;
//reset timer to 0:00
	timer = 0;
	seconds = "0" + 0;
	minutes = 0;
	//reset the display of the timer to 0:00
	document.querySelector('.timer').innerHTML = minutes + ':' + seconds;
//reset the star count
	resetStars();
//loop through each card and create its HTML
	for (i=0; i < shuffledCards.length; i++) {
		//add each card's HTML to the page
		cardDeck[i].setAttribute('class', 'card');
		//Display the cards on the page
		cardDeck[i].innerHTML = shuffledCards[i];
	}
}
//initialize timer display
document.querySelector('.timer').innerHTML = minutes + ':' + seconds;
function gameTimer () {
	if (timer > 59) {
		seconds = (timer % 60);
		minutes = ((timer - seconds) / 60);
		if (seconds < 10) {
			seconds = "0" + seconds;
		}
	} else {
		seconds = timer;
		if (seconds < 10) {
			seconds = "0" + seconds;
		}
	}
	document.querySelector('.timer').innerHTML = minutes + ':' + seconds;
	timer++;
	}
function timeCount() {
	if (timer < 1) {
		interval = setInterval(gameTimer, 1000);
	}
}
////if all cards have matched, display a message with the final score
function winner() {
	setTimeout(function() {
		if (document.querySelectorAll('.match').length === 16) {
			clearInterval(interval);
			let starList = document.querySelectorAll('.stars li');
			let starCount = 0;
			for (i=0; i < starList.length; i++) {
				if (starList[i].querySelector('.fa')) {
					starCount++;
				}
			}
			if (starCount === 1) {
				if (confirm('Congratulations, you have won!\nIt took you ' + 
					moves + ' moves.\nYou have ' + starCount + 
					' star.\nIt only took you ' + minutes + ' minutes, ' + 
					seconds + ' seconds!\n' + 'Would you like to play again?')) {
					reset();
				}
			} else {
				if (confirm('Congratulations, you have won!\nIt took you ' + 
					moves + ' moves.\nYou have ' + starCount + 
					' stars.\nIt only took you ' + minutes + ' minutes, ' + 
					seconds + ' seconds!\n' + 'Would you like to play again?')) {
					reset();
				}
			}
		}
	}, 500);
}

//if the cards do match, lock the cards in the open position
function match () {
	for (k=0; k<2; k++) {
		pair[k].classList.remove('show', 'open');
		pair[k].classList.add('match');
		winner();
	}
}

//if the cards do not match, remove the cards from the list and hide the card's symbol
function noMatch () {
	setTimeout(function() {
		for (k=0; k<2; k++) {
			pair[k].classList.remove('open', 'show');
		}
	}, 500);
}

//increment the move counter and display it on the page
function addMove () {
	moves++;
	document.querySelector('.moves').innerText = moves;
//TODO:	//CHANGE MOVES TO MOVE when (turn === 1)
//	if (moves === 1) {
//		document.querySelector('.score-panel').innerText = "   1 Move";
//	}  COMMENTED CODE IMMEDIATELY ABOVE CURRENTLY REALLY SUCKS & NEEDS WORK
}

//add the card to "open" cards
function flipCard(event) {
	event.target.classList.add('open');
}

//display the card's symbol
function showCard(event) {
	event.target.classList.add('show');
	flipCard(event);
	cardFlipCount++;
	if (cardFlipCount % 2 === 0) {
		addMove();

		pair = document.querySelectorAll('.open');
		card1 = pair[0].querySelector('i').className;
		card2 = pair[1].querySelector('i').className;

		if (card1 === card2) { ////check to see if the two cards match
			match();
		} else {
			noMatch();
		}
		if (moves === 16) { //remove a star at 16 moves if game not won
			let stars = document.querySelectorAll('.fa-star');
			stars[2].classList.remove('fa');
			stars[2].classList.add('far');
		}
		if (moves === 24) { //remove a star at 24 moves if game not won
			let stars = document.querySelectorAll('.fa-star');
			stars[1].classList.remove('fa');
			stars[1].classList.add('far');
		}
	}
}

function initClick(event) {
	if (cardFlipCount === 0) {
		showCard(event);
		timeCount();
	} else {
		showCard(event);
	}
}

//set up the event listener for a card.
document.querySelector('.deck').addEventListener('click', initClick);

document.querySelector('.restart').addEventListener('click', reset);
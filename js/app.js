 let turns = 0;
/*
 * Create a list that holds all of your cards
 */
 let cardDeck = document.querySelectorAll('.card');
 let cardArray = [];

 for (i=0; i < cardDeck.length; i++) {
 	 cardArray.push(cardDeck[i].innerHTML);
 }
 
 function resetStars() {  //adding stars back to score (no more than 3 stars)
	 let stars = document.querySelectorAll('.fa-star');
	 for (i = 0; i < stars.length; i++) {
		 stars[i].classList.remove('fa');
		 stars[i].classList.remove('far');
		 stars[i].classList.add('fa');
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
function reset() {
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method
 */
 let shuffledCards = shuffle(cardArray);
 turns = 0;
 document.querySelector('.moves').innerText = turns;
 resetStars();
 /*
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 for (i=0; i < shuffledCards.length; i++) {
	 cardDeck[i].setAttribute('class', 'card');
	 cardDeck[i].innerHTML = shuffledCards[i];
 }
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  x display the card's symbol (put this functionality in another function that you call from this one)
 *  x add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  x if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 let cardFlipCount = 0;
 function flipCard(event) {
	 event.target.classList.add('open');
 }
 function showCard(event) {
	 event.target.classList.add('show');
	 flipCard(event);
	 cardFlipCount++;
	 if (cardFlipCount % 2 === 0) {
		 cardFlipCount = 0;
		 turns++;
		 document.querySelector('.moves').innerText = turns;
//CHANGE MOVES TO MOVE when (turn === 1)		 if (turns === 1) {
//			 
//		 }
		 
		 let pair = document.querySelectorAll('.open');
		 let card1 = pair[0].querySelector('i').className;
		 let card2 = pair[1].querySelector('i').className;
			 	 
		 if (card1 === card2) { //CARDS MATCH
			 for (k=0; k<2; k++) {
				 pair[k].classList.remove('show', 'open');
				 pair[k].classList.add('match');
			 }
		 } else { //CARDS DO NOT MATCH
			 setTimeout(function() {
				 for (k=0; k<2; k++) {
					 pair[k].classList.remove('open', 'show');
				 }
			 }, 500);
		 }
		 if (turns === 16) { //remove a star at 16 turns if game not won
			 let stars = document.querySelectorAll('.fa-star');
			 stars[2].classList.remove('fa');
			 stars[2].classList.add('far');
		 }
		 if (turns === 24) { //remove a star at 24 turns if game not won
			 let stars = document.querySelectorAll('.fa-star');
			 stars[1].classList.remove('fa');
			 stars[1].classList.add('far');
		 }
	 }
 }


 document.querySelector('.deck').addEventListener('click', showCard);
 
 document.querySelector('.restart').addEventListener('click', reset);
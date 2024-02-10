const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}



/*
Help acquired from:
https://www.youtube.com/watch?v=bznJPt4t_4s
*/

//variables that indicate current state of the game
let flippedCount= 0;
let activeCard = null;
let awaitingEndOfMove = false;
let count = 0;


// TODO: Implement this function!
function handleCardClick(event) {

  //prevents user from attempting again while waiting for cards to turn back
  //also prevents user from clicking on already flipped card
  if (awaitingEndOfMove || event.target.classList.contains("flipped")){
    return;
  }

  //set a clicked card object to change bg color to class color
  let clickedCard = event.target;
  clickedCard.style.backgroundColor = clickedCard.classList[0];

  //if no first card selected at the moment
  if (activeCard === null){
    activeCard = clickedCard;
    //ends first move
    return;
  }
  
  //ALL CODE BELOW runs when not awaiting end of move and there is an active card already selected
    
  //second click must be different - does not let user match card with itself
  if(activeCard === clickedCard){
    return;
  }

  //after second card clicked, checks if cards match
  if (activeCard.style.backgroundColor === clickedCard.style.backgroundColor){
    //marks revealed cards with class "flipped"
    activeCard.classList.add('flipped');
    clickedCard.classList.add('flipped');
    awaitingEndOfMove = false;
    activeCard = null;
    flippedCount +=2;
    count++;
    //ends game when all cards have been matched and flipped
    if (flippedCount === COLORS.length){
      alert (`You won! It took you ${count} attempts. Refresh to play again.`);
    }
    //ends matching attempt to start next attempt
    return;
  }

  //prevents any further cards from being clicked
  awaitingEndOfMove = true;

  //when no match is made, after 1 second, hides color of cards
  setTimeout (function (){
    activeCard.style.backgroundColor = null;
    clickedCard.style.backgroundColor = null;
    //clears out variables and lets user attempt a new match
    awaitingEndOfMove = false;
    activeCard = null;
    count++;
  }, 1000);
  // you can use event.target to see which element was clicked
  // console.log("you just clicked", event.target);
  
  
}

// when the DOM loads
createDivsForColors(shuffledColors);


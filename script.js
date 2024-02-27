const guessesRemainingText = document.querySelector(".guesses-remaining");
const guessesRemainingTextSpan = document.querySelector(".guesses-remaining span");
const userGuess = document.querySelector(".guess");
const guessButton = document.querySelector(".guess-btn");
const playAgainButton = document.querySelector(".play-again-btn");
const message1 = document.querySelector(".message1");
console.log(message1);
const message2 = document.querySelector(".message2");
const input = document.querySelector(".guess");

let numGuesses = 3;
let guessedNumbers = [];
let randomNumber;

const validAnswersUl = document.querySelector(".valid-answers");
const validAnswersArray = [];

// for loop to create list item for each valid answer
for (let i = 0; i < 10; i++) {
    // create new li
    const listItem = document.createElement('li');

    // set innerHTML content
    listItem.innerHTML = `${i + 1}`;

    // add class to each li
    listItem.classList.add('valid-answer');

    // push into the array
    validAnswersArray.push(listItem);
}

// Append each li to the valid-answers ul
validAnswersArray.forEach(item => {
    validAnswersUl.appendChild(item);
});

console.log(validAnswersArray);




// generate random integer between 1-10
const getRandomNumber = function() {

    // calculate the random number
    randomNum = Math.ceil(Math.random() * 10);

    // return the array item that user must guess
    return randomNum;
}

// call function to get random number
randomNumber = getRandomNumber();
console.log("randomNumber = " + randomNumber);




// guess button event listener
guessButton.addEventListener("click", function (e) {

    // create variable to capture input value
    const guess = input.value;
    console.log(guess);

    // call function to validate input
    const validGuess = validateInput(guess); // value of goodGuess returns true or false
    console.log("validGuess = " + validGuess);

    if(validGuess) {             // if true
        makeGuess(guess);       // allow valid guess
    }

    input.value = "";           // reset input field

});




// validate whether guess is an integer between 1-10
const validateInput = function (input) {

    // if input is null
    if (input === null) {
        message1.innerText = `Please enter a number between 1-10`;
        message2.innerText = ``;
        return false;
    }

    // if input isn't an integer
    else if (input % 1 != 0) {
        message1.innerText = `${input} is not an integer`;
        message2.innerText = ``;
        return false;
    }

    // if input isn't between 1-10
    else if (input < 1 || input > 10) {
        message1.innerText = `${input} is not a number between 1-10`;
        message2.innerText = ``;
        return false;
    }

    // if input is between 1-10
    else if (input >= 1 && input <= 10) {
        return true;
    }

};




// guess has been confirmed valid - check whether it is correct
const makeGuess = function (input) {

    // convert input to a number
    input = parseInt(input);

    // if incorrect guess
    if (input != randomNumber) {

        // display failure message1
        message1.innerHTML = `🤔</br>NOPE!`;

        // run hint function to populate message2
        hint(input, randomNumber);

        // decrement guesses remaining
        numGuesses--;

        // update guesses remaining text
        guessesRemainingTextSpan.innerText = numGuesses;

        // call lose function
        if (numGuesses == 0) {
            lose();
        }

        // remove guessed number from list
        validAnswersArray[input - 1].remove(); // remove the li

    }

    // if correct guess
    if (input == randomNumber) {

        // hide guess button
        guessButton.classList.add("hide");

        // show play again button
        playAgainButton.classList.remove("hide");

        // apply css .highlight class to highlight correct number
        validAnswersArray.forEach((item, index) => {
            if(index + 1 == randomNumber) {
                item.classList.add("highlight");
                item.classList.add("underline");
            }
        });

        // call win function
        win(input);
    }

};




// HINT function
const hint = function (input, randomNumber) {
    if (input > randomNumber) {
        message2.innerText = `GUESS LOWER THAN ${input}`;
    }
    else {
        message2.innerText = `GUESS HIGHER THAN ${input}`;
    }
};




// LOSE function

const lose = function (input) {

    message1.innerText = `GAME OVER`;
    message2.innerText = ``;
    guessButton.classList.add("hide");
    playAgainButton.classList.remove("hide");

}




// WIN function
const win = function (input) {

    message1.classList.add("win");
    message1.innerText = `${input} IS THE NUMBER 🥳 YOU WIN!`;
    message2.innerText = ``;

};




// event listener for reset (PLAY AGAIN button)
playAgainButton.addEventListener("click", function (e) {
    
    // remove styles on prior randomNumber in ul
    validAnswersArray.forEach((item, index) => {
        if(index + 1 == randomNumber) {
            item.classList.remove("highlight");
            item.classList.remove("underline");
        }
    });
    
    // reset all original values
    message1.classList.remove("win");
    message1.innerText = "";
    numGuesses = 3;

    // get new random number
    randomNumber = getRandomNumber();
    console.log("new randomNumber = " + randomNumber);

    // show the correct UI elements
    guessButton.classList.remove("hide");
    playAgainButton.classList.add("hide");
    guessesRemainingText.classList.remove("hide");

});
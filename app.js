//GAMESHOW APP

//The purpose of this game is to figure out the hidden message by 
//clicking each letter to see if it's contained in the message.

//Pseudo-code:
//Players make a guess by clicking a letter on the on-screen keyboard
//They can keep guessing up to 5 times, but after that the game will end

//Step 1- Get the ids of qwerty and phrase, then store them in variables.
//Create a 'missed'variable and initialize it to 0. This will be 
//your counter for missed letters.

//Step 2= Attach an event listener to the “Start Game” button to hide the start screen overlay.

//Step 3-Create an array called "phrases" that contains at least 5 different
//phrases as strings
//Each phrase should contain only letters and spaces

//Step 4- create a getRandomPhraseAsArray function which will:
//randomly choose a phrase from the phrases array and 
//return a new split-up array (you'll be splitting up the old one)
//This new split up string will be an array of characters
//So think of a phrase like "The lazy brown fox jumped over the cow"
//that's stored in an array - this string will be selected from the array
//and the characters in it will then become the new array
//create the function so that it takes any string as a value
//this means pass in the value after the function and have a string returned

//Step 5- Create an addPhraseToDisplay function which will loop through the array
//of characters we just got from the previous function
//for each character in the array, you'll create a list item,
//put the character inside of the list item, and append that list
//item to the #phrase ul in the doc. 
//if the character in the array is a letter and not a space, the 
//function should add the class "letter" to the list item.
//Write the function so that it can take any array of letters and
//add it to the display.
//In order to use the function, you'll get the value returned by
//getRandomPhraseAsArray and save it to a variable
//Then you'll pass it to addPhraseToDisplay as an argument:
//const phraseArray = getRandomPhraseAsArray(phrases);
//addPhrasetoDisplay(phraseArray);

//Step 6- Create the checkLetter function
//This function will be used inside the next step's event listener
//This function should have one parameter: The button the player
//has clicked when guessing a letter
//the checkLetter function should get all of the elements with a 
//class of "letter"
//The function should loop over the letters and check if they match
//the letter in the button the player has chosen.
//If there's a match, the function should add the "show" class to
//the list item containing that letter, store the matching letter inside
//of a variable, and return that letter.
//if a match wasn't found, the function should return null

//step 7- Add an event listener to the keyboard
//Use event delegation to listen only to button events (click) from the 
//keyboard. When a player chooses a letter, add the “chosen” class 
//to that button so the same letter can’t be chosen twice. Note that
// button elements have an attribute you can set called “disabled” that
// when set to true will not respond to user clicks.
// See the MDN documentation for more details.
//Pass the button to the checkLetter function, and store the letter
// returned inside of a variable called letterFound. At this point, you
// can open the index.html file, click any of the letters on the keyboard,
// and start to see the letters appear in the phrase.

//step 8= Count the missed guesses in the game
//If the checkLetter function returns a null value, the player has
//guessed the wrong letter. In the keyboard event listener, after
//checkLetter is called, write a statement to check the value of the
//letterFound variable. If the value is null, remove one of the tries 
//from the scoreboard. If you haven't created it yet, make sure you have
//a missed variable to store the state of the scoreboard (initialized to 0).
//When you remove a try from the scoreboard, make sure to increase
//the missed count by 1.
//the hearts are lis with the class "tries"

//step 9- Create a checkWin function
//Each time the player guesses a letter, this function will check
//whether the game has been won or lost. At the very end of  the keyboard
//event listener,you'llrun this function to checkif the number of
//letters with class "show" is equal to the number of letters with class
//"letters". If they're equal, show the overlay screen with the "win"
//class and appropriate text. Otherwise,if the number of misses is 
//equal to or greater than 5, show the overlay screen with the "lose"
//class and appropriate text.

//querySelector <--copy/paste

const keyboard = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
const letters = document.querySelectorAll('.letter');
const scoreboard = document.querySelectorAll('#scoreboard .tries');
const displayStartScreen = document.getElementById("overlay");
const reset = document.createElement("button");

let missed = 0;

const phrases = [
    "A Dime a Dozen",
    "An apple a day keeps the doctor away",
    "The early bird gets the worm",
    "Barking up the wrong tree",
    "Piece of Cake"];

const btnStart = document.querySelector(".btn__reset");
btnStart.addEventListener('click', function (e) {
    displayStartScreen.style.display = "none";
});

const getRandomPhraseAsArray = arr => {
    //this returns an array of randomized phrases
    let randomPhrase = Math.floor(Math.random() * arr.length);
    //this chooses one phrase from the array
    let choosePhrase = arr[randomPhrase];
    //this splits that phrase into a new array of letters/spaces
    let splitPhrase = choosePhrase.split("");
    return splitPhrase;
}

const addPhraseToDisplay = arr => {
    return arr.forEach(item => {
        let ul = phrase.firstElementChild;
        let li = document.createElement('li');
        li.textContent = item;
        ul.appendChild(li);
        if (item !== " ") {
            li.className = "letter";
        } else {
            li.className = "space";
        }
    });
}

let phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);


const checkLetter = (button) => {
    let lis = document.querySelectorAll("#phrase li");
    let match = null;
    for (let i = 0; i < lis.length; i++) {

        if (button === lis[i].textContent.toLowerCase()) {
            lis[i].classList.add("show");
            match = button.textContent;
        }

    }
    return match;
}

keyboard.addEventListener('click', (e) => {

    //if you're pressing a button
    if (e.target.tagName === "BUTTON") {
        const letterFound = checkLetter(e.target.textContent.toLowerCase());
        if (e.target.className !== "chosen") {
            // let letterFound = checkLetter(e.target.textContent.toLowerCase());
            e.target.className = "chosen";
            e.target.disabled = true;

        } if (letterFound === null) {

            let image = document.getElementsByTagName("IMG");
            image[missed].src = "images/lostHeart.png";
            missed++;
        }
    }
    checkWin();
});

const checkWin = () => {
    //const displayWinScreen = document.querySelector(".win");
    let letters = document.querySelectorAll(".letter");
    let shownLetters = document.querySelectorAll(".show");
    let header = document.querySelector("#overlay .title");

    if (letters.length === shownLetters.length) {
        displayStartScreen.classList.add("win");
        header.textContent = "You Won!";
        displayStartScreen.style.display = "flex";
        Reset();


    } else if (missed > 4) {
        displayStartScreen.classList.add("lose");
        header.textContent = "You Lost";
        displayStartScreen.style.display = "flex";
        Reset();
    }

}

const Reset = () => {
    //append the reset button to the display
    displayStartScreen.appendChild(reset);
    reset.className = "btn_restart";
    reset.textContent = "restart";
    btnStart.style.display = "none";
    let newButtons = document.getElementsByTagName("BUTTON");
    for (let i = 0; i < newButtons.length; i++) {
        if (newButtons[i].disabled = true) {
            newButtons[i].disabled = false;
        }
    }

    let phraseLis = phrase.querySelectorAll("li");
    for (let i = 0; i < phraseLis.length; i++) {
        let ul = phrase.querySelector("ul");
        ul.removeChild(phraseLis[i]);
    }
    let buttons = document.querySelectorAll(".keyrow button");
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].className === "chosen") {
            buttons[i].classList.remove("chosen");
        }
    }
    let heartIcons = document.querySelectorAll("#scoreboard li img");
    for (let i = 0; i < heartIcons.length; i++) {
        if (heartIcons[i].src = "images/lostHeart.png") {
            heartIcons[i].src = "images/liveHeart.png";
        }
    }

    if (displayStartScreen.className === "win") {
        displayStartScreen.classList.remove("win");


        // } else if (displayStartScreen.className === "lose") {
        //     displayStartScreen.classList.remove("lose");

    } else {
        displayStartScreen.classList.remove("lose");
    }



}

reset.addEventListener('click', (e) => {
    missed = 0;
    phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);

    //addPhraseToDisplay(phraseArray);
    displayStartScreen.style.display = "none";

    // keyboard.addEventListener('click', (e) => {

    //     //if you're pressing a button
    //     if (e.target.tagName === "BUTTON") {
    //         const letterFound = checkLetter(e.target.textContent.toLowerCase());
    //         if (e.target.className !== "chosen") {
    //             // let letterFound = checkLetter(e.target.textContent.toLowerCase());
    //             e.target.className = "chosen";
    //             e.target.disabled = true;

    //         } if (letterFound === null) {

    //             let image = document.getElementsByTagName("IMG");
    //             image[missed].src = "images/lostHeart.png";
    //             missed++;
    //         }
    //     }
    //     checkWin();
    // });
});




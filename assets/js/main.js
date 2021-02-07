console.log("Hello, World from main!");

function setRewardScreen() {
  $("#information-box").html(`<h2>Greetings!</h2>
  <p>You win! Click <strong>Restart</strong> to play again.</p>`);
  $("#game-box").html(`<i class="fas fa-trophy"></i>
  <form id="form-reward" onsubmit="return sendMail(this);">
                        <div class="mb-3">
                            <label for="recipient-name" class="col-form-label">Mail:</label>
                            <input type="mail" class="form-control" id="form-reward-mail" name="emailaddress" placeholder="email" required>
                            <input type="submit" class="btn btn-primary">Send message</button>
                        </div>                        
                    </form>
  `);
  $("#button-box")[0].innerHTML = `
    <button id="restart-button" type="button" class="btn btn-primary">Restart</button>
  `;
}

/* ogni slot è un oggetto a cui vengono date delle proprietà */
function newGame(level) {
  let slotCollection = $(".game-slot");
  let choiceCollection = $(".button-game-choice");
  let timeLeft = 5;
  let arrayOfPossibilities = [
    "#4a4238",
    "#4d5359",
    "#508484",
    "#79c99e",
    "#97db4f",
    "#f5dd90",
    "#f68e5f",
    "#f76c5e",
    "#e5d1d0",
  ];

  setHiddenValues(
    generateRandomSequence(level, arrayOfPossibilities, copyArray),
    slotCollection
  );
  initializeGameArea(level, slotCollection);
  storeChoiceValues(choiceCollection, arrayOfPossibilities);
  hideButtonBox($("#button-box"));
  setWaitScreen(timeLeft);
  setTimer(timeLeft, coverGameSlots);
}

/* rende invisibili gli oggetti del livello corrente e ripristina le classi originali*/
function resetGame() {
  let slotActiveCollection = $(".level-active");
  slotActiveCollection.addClass("d-none");
  slotActiveCollection.removeClass("level-active");
  $(".slot-active").removeClass("slot-active");
  $(".game-slot-button").addClass("d-none");
  $(".fas.fa-check.correct-answer")
    .removeClass("fas")
    .removeClass("fa-check")
    .removeClass("correct-answer");
  $(".fas.fa-times.wrong-answer")
    .removeClass("fas")
    .removeClass("fa-times")
    .removeClass("wrong-answer");    
}

/* rende visibili gli oggetti del livello corrente e aggiunge delle classi*/
function initializeGameArea(level, slotCollection) {
  for (let i = 0; i < level; i++) {
    slotCollection[i].classList.remove("d-none");
    slotCollection[i].classList.add("level-active");
  }
}

/*dichiara le proprietà delle scelte e le inizializza */
function storeChoiceValues(choiceCollection, arrayOfPossibilities) {
  for (let i = 0; i < choiceCollection.length; i++) {
    choiceCollection[i].storedValue = arrayOfPossibilities[i];
    choiceCollection[i].style.background = choiceCollection[i].storedValue;
    console.log(arrayOfPossibilities[i]);
  }
}

/* genera una sequenza random */
function generateRandomSequence(numberOfElements, arrayOfPossibilities, copy) {
  let randomSequence = [];
  let possibilities = copy(arrayOfPossibilities);
  for (let i = 0; i < numberOfElements; i++) {
    let randomIndex = Math.floor(Math.random() * possibilities.length);
    randomSequence[i] = possibilities.splice(randomIndex, 1)[0];
  }
  console.log("The sequence to match is: " + randomSequence);
  return randomSequence;
}

/* restituisce una copia dell'array originale */
function copyArray(arrayToCopy) {
  let copiedArray = [];
  for (let i = 0; i < arrayToCopy.length; i++) {
    copiedArray[i] = arrayToCopy[i];
  }
  return copiedArray;
}

/* setta i valori all'interno degli oggetti */
function setHiddenValues(randomSequence, slotCollection) {
  for (let i = 0; i < randomSequence.length; i++) {
    slotCollection[i].hiddenValue = randomSequence[i];
    slotCollection[i].style.background = slotCollection[i].hiddenValue;
    slotCollection[i].isCorrect = false;
  }
}

/* controlla se il valore nascosto e il valore dato corrispondono */
function checkValue(gameSlot) {
  if (gameSlot.hiddenValue == gameSlot.givenValue) {
    gameSlot.isCorrect = true;
    console.log("il valore è corretto");
    return true;
  } else {
    setLoseScreen();
    console.log("il valore è sbagliato");
    return false;
  }
}

/* controlla tutte le risposte date */
function checkAllValues(slotCollection) {
  for (let slot of slotCollection) {
    console.log(slot.isCorrect);
    if (slot.isCorrect) {
    } else {
      return false;
    }
  }
  return true;
}

/* imposta il conto alla rovescia per memorizzare la sequenza*/
function setTimer(timeLeft, functionAfterTimer) {
  let timer = setInterval(function () {
    console.log(timeLeft);
    timeLeft--;
    updateWaitScreen(timeLeft);
    
    if (timeLeft <= 0) {
      clearInterval(timer);
      console.log("tempo esaurito");
      functionAfterTimer($(".game-slot-button"));
    }
  }, 1000);
}

function hideButtonBox(buttonBox) {
  buttonBox.addClass("d-none");
}

/* rende visibili i bottoni di gioco */
function coverGameSlots(gameButtonCollection) {
  gameButtonCollection.removeClass("d-none");
  setGameScreen();
}

function incrementProgressBar(level) {
  $(`#lv-${level}`).css("width", "100%");
  setTimeout(function () {
    $(`#dot-${level}`).css("background-color", "#0d6efd");
  }, 400);
}

function resetProgressBar(){
  $(".progress-bar-game").css("width","0%");  
  $(".dot").css("background-color", "#e9ecef");
}

function setWinScreen() {
  $("#button-box").removeClass("d-none");
  $("#information-box")[0].innerHTML = `<h2>Correct!</h2>
  <p>Click <strong>Continue</strong> for the next level.</p>`;
  $("#button-box")[0].innerHTML = `
<button id="continue-button" type="button" class="btn btn-primary">Continue</button>
`;
}

function setLoseScreen() {
  $("#button-box").removeClass("d-none");
  $("#information-box")[0].innerHTML = `<h2>Wrong!</h2>
  <p>I'm sorry! Click <strong>Restart</strong> to try again.</p>`;
  $("#button-box")[0].innerHTML = `
<button id="restart-button" type="button" class="btn btn-primary">Restart</button>
`;
}

function setWaitScreen(timeLeft) {
  $("#information-box")[0].innerHTML = `
    <p><strong>${timeLeft}</strong> seconds left!</p>
    `;
}

function updateWaitScreen(timeLeft) {
  $("#information-box strong").html(`${timeLeft}`);
}

function setGameScreen() {
  $("#information-box")[0].innerHTML = `
  <p><strong>Click</strong> to choose a color!</p>
  `;
}

/* handlers modificati */

$("#game-box").on("click", ".game-slot-button", function () {
  $(".slot-active").removeClass("slot-active");
  $(this).parent().addClass("slot-active");
  let thisButtonHiddenValue = $(this).parent()[0].hiddenValue;
  console.log("il valore nascosto è: " + thisButtonHiddenValue);
});

$(".button-game-choice").click(function () {
  let slotToCheck = $(".slot-active")[0];
  let slotIcon = $(".slot-active i");
  let slotButton = $(".slot-active button");
  let slotCollection = $(".level-active");
  let currentLevel = slotCollection.length;

  slotToCheck.givenValue = this.storedValue;
  slotToCheck.style.background = slotToCheck.givenValue;
  slotButton.addClass("d-none");

  console.log("il valore assegnato è: " + slotToCheck.givenValue);

  if (checkValue(slotToCheck)) {
    $(".slot-active").addClass("fas fa-check correct-answer");
  } else {
    $(".slot-active").addClass("fas fa-times wrong-answer");
  }

  if (checkAllValues(slotCollection)) {
    console.log("tutti i valori sono giusti");
    incrementProgressBar($(".level-active").length);
    currentLevel === 6 ? console.log("hai vinto") : setWinScreen();
  } else {
    console.log("almeno un valore è sbagliato");
  }
});

$("#button-box").on("click", "#start-button", function () {
  newGame(1);
});
$("#button-box").on("click", "#restart-button", function () {
  resetProgressBar();
  resetGame();
  newGame(1);
});
$("#button-box").on("click", "#continue-button", function () {
  let currentLevel = $(".level-active").length;
  resetGame();
  newGame(currentLevel + 1);
});

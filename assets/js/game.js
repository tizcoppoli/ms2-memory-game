console.log("Hello, World from game!");

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

  initializeGameObjects(slotCollection);
  setHiddenValues(
    generateRandomSequence(level, arrayOfPossibilities),
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
  $("#game-box").removeClass("d-none");
  let slotActiveCollection = $(".level-active");
  slotActiveCollection.addClass("d-none");
  slotActiveCollection.removeClass("level-active");
  $("#endgame-box").addClass("d-none");

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
  activateDot($("#dot-0"));
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
function generateRandomSequence(numberOfElements, arrayOfPossibilities) {
  let randomSequence = [];
  let possibilities = cloneArray(arrayOfPossibilities);
  for (let i = 0; i < numberOfElements; i++) {
    let randomIndex = Math.floor(Math.random() * possibilities.length);
    randomSequence[i] = possibilities.splice(randomIndex, 1)[0];
  }
  console.log("The sequence to match is: " + randomSequence);
  return randomSequence;
}

/* restituisce una copia dell'array originale */
function cloneArray(arrayToClone) {
  let clonedArray = [];
  for (let i = 0; i < arrayToClone.length; i++) {
    clonedArray[i] = arrayToClone[i];
  }
  return clonedArray;
}

/* setta i valori all'interno degli oggetti */
function setHiddenValues(randomSequence, slotCollection) {
  for (let i = 0; i < randomSequence.length; i++) {
    slotCollection[i].hiddenValue = randomSequence[i];
    slotCollection[i].style.background = slotCollection[i].hiddenValue;
    /* slotCollection[i].isCorrect = undefined; */
  }
}

function initializeGameObjects(slotCollection) {
  console.log("initializeGameObjects chiamata");

  for (let i = 0; i < slotCollection.length; i++) {
    slotCollection[i].isCorrect = undefined;
    slotCollection[i].givenValue = undefined;
    slotCollection[i].hiddenValue = undefined;
  }
}

/* controlla se il valore nascosto e il valore dato corrispondono */
function checkValue(gameSlot) {
  if (gameSlot.hiddenValue == gameSlot.givenValue) {
    gameSlot.isCorrect = true;
    console.log("il valore è corretto");
    return true;
  } else {
    gameSlot.isCorrect = false;
    console.log("il valore è sbagliato");
    return false;
  }
}

function checkAllFilled(slotCollection) {
  for (let slot of slotCollection) {
    if (slot.isCorrect == undefined) {
      console.log("almeno un undefined");
      return false;
    }
  }
  console.log("tutti i valori sono definiti");
  return true;
}

function checkAllCorrect(slotCollection) {
  for (let slot of slotCollection) {
    if (!slot.isCorrect) {
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

/* PROGRESS-SCORE */

function incrementProgressBar(level) {
  $(`#lv-${level}`).css("width", "100%");
  setTimeout(function () {
    let dot = $(`#dot-${level}`);

    activateDot(dot);
    dot.css("background-color", "#0d6efd");
    dot.children().css("background-color", "#ffffff").children().remove();
  }, 400);
}

function activateDot(dot) {
  dot.css("background-color", "#0d6efd");
  dot.children().css("background-color", "#ffffff").children().remove();
}

function resetProgressBar() {
  $(".progress-bar-game").css("width", "0%");
  $(".dot").css("background-color", "#e9ecef");
  $("#dot-0").css("background-color", "#e9ecef");
}

function incrementGlobalScore() {
  let globalScore = parseFloat($("#score-text").html());
  globalScore += 4.76;
  /* $(".level-active").length === 6 ? (globalScore = 100) : (globalScore += 4.76); */
  if (globalScore > 99) {
    globalScore = 100;
  }
  $("#score-text").html(globalScore.toFixed(2));
}

/* INFORMATION-SCREENS */

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
    <p>Memorize the sequence! <strong>${timeLeft}</strong> seconds left!</p>
    `;
}

function updateWaitScreen(timeLeft) {
  $("#information-box strong").html(`${timeLeft}`);
}

function setGameScreen() {
  $("#information-box")[0].innerHTML = `
  <p><strong>Click</strong> the <strong>"?"</strong> to choose a color!</p>
  `;
}

function setGoodOptionScreen() {
  $("#information-box")[0].innerHTML = `
  <h2>Good!</h2><p><strong>Click</strong> the <strong>"?"</strong> to choose a color!</p>
  `;
}

function setBadOptionScreen() {
  $("#information-box")[0].innerHTML = `
  <h2>Ouch!</h2><p><strong>I'm sorry!</strong> The game is over but you can still improve your score!</p>
  `;
}

function setEndScreen() {
  let score = $("#score-text").html();
  $("#endgame-box").removeClass("d-none");
  $("#game-box").addClass("d-none");

  $("#information-box").html(`<h2>Thanks for playing!</h2>
  <p>Your score is: <strong>${score}%</strong><br>Insert an <strong>email address</strong> to share your result!</p>`);

  $("#button-box")[0].innerHTML = `
    <button id="restart-button" type="button" class="btn btn-primary">Restart</button>
  `;
}

/* EVENT-HANDLERS */

$("#button-box").on("click", "#start-button", function () {
  newGame(1);
});

$("#button-box").on("click", "#restart-button", function () {
  $("#score-text").html("0");
  resetProgressBar();
  resetGame();
  newGame(1);
});

$("#button-box").on("click", "#continue-button", function () {
  let currentLevel = $(".level-active").length;
  resetGame();
  newGame(currentLevel + 1);
});

$("#game-box").on("click", ".game-slot-button", function () {
  $(".slot-active").removeClass("slot-active");
  $(this).parent().addClass("slot-active");
  let thisButtonHiddenValue = $(this).parent()[0].hiddenValue;
  console.log("il valore nascosto è: " + thisButtonHiddenValue);
});

$(".button-game-choice").click(function () {
  let slotToCheck = $(".slot-active")[0];
  /* let slotIcon = $(".slot-active i"); */
  let slotButton = $(".slot-active button");
  let slotCollection = $(".level-active");
  let currentLevel = slotCollection.length;

  slotToCheck.givenValue = this.storedValue;
  slotToCheck.style.background = slotToCheck.givenValue;
  slotButton.addClass("d-none");

  console.log("il valore assegnato è: " + slotToCheck.givenValue);

  if (checkValue(slotToCheck)) {
    $(".slot-active").addClass("fas fa-check correct-answer");
    setGoodOptionScreen();
    incrementGlobalScore();
  } else {
    $(".slot-active").addClass("fas fa-times wrong-answer");
    setBadOptionScreen();
  }

  if (checkAllFilled(slotCollection)) {
    if (checkAllCorrect(slotCollection)) {
      console.log("tutti i valori sono giusti");
      incrementProgressBar($(".level-active").length);
      currentLevel === 6 ? setEndScreen() : setWinScreen();
    } else {
      console.log("almeno un valore è sbagliato");
      setLoseScreen();
      setEndScreen();
    }
  } else {
    console.log("riempi gli altri slot");
  }
});

/********** MAIN-GAME-FUNCTIONS **********/

function newGame(level) {
  let slotCollection = $(".game-slot");
  let choiceCollection = $(".button-game-choice");
  let timeLeft = level + 1;
  let arrayOfPossibilities = [
    "netherlands",
    "china",
    "japan",
    "uk",
    "usa",
    "france",
    "italy",
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

function initializeGameObjects(slotCollection) {
  for (let i = 0; i < slotCollection.length; i++) {
    slotCollection[i].isCorrect = undefined;
    slotCollection[i].givenValue = undefined;
    slotCollection[i].hiddenValue = undefined;
  }
}

function generateRandomSequence(numberOfElements, arrayOfPossibilities) {
  let randomSequence = [];
  let possibilities = cloneArray(arrayOfPossibilities);
  for (let i = 0; i < numberOfElements; i++) {
    let randomIndex = Math.floor(Math.random() * possibilities.length);
    randomSequence[i] = possibilities.splice(randomIndex, 1)[0];
  }  
  return randomSequence;
}

function setHiddenValues(randomSequence, slotCollection) {
  for (let i = 0; i < randomSequence.length; i++) {
    slotCollection[i].hiddenValue = randomSequence[i];
    slotCollection[
      i
    ].style.backgroundImage = `url(assets/images/${slotCollection[i].hiddenValue}.png)`;
  }
}

function initializeGameArea(level, slotCollection) {
  for (let i = 0; i < level; i++) {
    slotCollection[i].parentElement.classList.remove("d-none");
    slotCollection[i].classList.remove("d-none");
    slotCollection[i].classList.add("level-active");
  }
  activateDot($("#dot-0"));
}

function storeChoiceValues(choiceCollection, arrayOfPossibilities) {
  for (let i = 0; i < choiceCollection.length; i++) {
    choiceCollection[i].storedValue = arrayOfPossibilities[i];
    choiceCollection[i].style.backgroundImage = `
    url(assets/images/${choiceCollection[i].storedValue}.png)
    `;
  }
}

function setTimer(timeLeft, functionAfterTimer) {
  let timer = setInterval(function () {
    timeLeft--;
    updateWaitScreen(timeLeft);
    if (timeLeft <= 0) {
      clearInterval(timer);
      functionAfterTimer($(".game-slot-button"));
    }
  }, 1000);
}

function coverGameSlots(gameButtonCollection) {
  gameButtonCollection.removeClass("d-none");
  setGameScreen();
}

function cloneArray(arrayToClone) {
  let clonedArray = [];
  for (let i = 0; i < arrayToClone.length; i++) {
    clonedArray[i] = arrayToClone[i];
  }
  return clonedArray;
}

function hideButtonBox(buttonBox) {
  buttonBox.addClass("d-none");
}

/********** /MAIN-GAME-FUNCTIONS **********/

/********** CHECK-RESULT-FUNCTIONS **********/

function checkValue(gameSlot) {
  if (gameSlot.hiddenValue == gameSlot.givenValue) {
    gameSlot.isCorrect = true;
    return true;
  } else {
    gameSlot.isCorrect = false;
    return false;
  }
}

function checkAllFilled(slotCollection) {
  for (let slot of slotCollection) {
    if (slot.isCorrect == undefined) {
      return false;
    }
  }
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

/********** /CHECK-RESULT-FUNCTIONS **********/

/********** PROGRESS-BAR-SCORE-FUNCTIONS  **********/

function incrementProgressBar(level) {
  $(`#lv-${level}`).attr("aria-valuenow", 100).css("width", "100%");
  setTimeout(function () {
    let dot = $(`#dot-${level}`);
    activateDot(dot);
  }, 400);
}

function activateDot(dot) {
  dot.css("background-color", "#a64253");
  dot.children().css("background-color", "cornsilk").children().remove();
}

function incrementGlobalScore() {
  let globalScore = parseFloat($("#score-text").html());
  globalScore += 4.76;
  if (globalScore > 99) {
    globalScore = 100;
  }
  $("#score-text").html(globalScore.toFixed(2));
}

function incrementLevelText() {
  let actualLevel = parseInt($("#level-text").html());
  actualLevel++;
  $("#level-text").html(actualLevel);
}

/********** /PROGRESS-BAR-SCORE-FUNCTIONS  **********/

/********** RESET-GAME-FUNCTIONS **********/

function resetGame() {
  $(".game-frame").addClass("d-none");
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

function resetProgressBar() {
  $(".progress-bar-game").attr("aria-valuenow", 0).css("width", "0%");
  $(".dot").css("background-color", "#f2d492");
  $("#dot-0").css("background-color", "#f2d492");
}

/********** /RESET-GAME-FUNCTIONS **********/

/********** SET-SCREEN-FUNCTIONS **********/

function setWinScreen() {
  $("#button-box").removeClass("d-none");
  $("#information-box")[0].innerHTML = `<h2>Correct!</h2>`;

  $("#button-box")[0].innerHTML = `
  <p>Click <button id="continue-button" type="button" class="btn btn-primary d-inline-block">Continue</button> for the next level.</p>
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
  <p><strong>Click</strong> the <strong>"?"</strong> to choose a picture!</p>
  `;
}

function setGoodOptionScreen() {
  $("#information-box")[0].innerHTML = `
  <h2>Good!</h2>
  `;
}

function setBadOptionScreen() {
  $("#information-box")[0].innerHTML = `
  <h2>Ouch!</h2><p><strong>I'm sorry!</strong> The game is over but you can still improve your score!</p>
  `;
}

function setEndScreen() {
  let score = $("#score-text").html();
  let trophy;

  if (score == 100.0) {
    trophy = "gold";
  } else if (score > 30.0) {
    trophy = "silver";
  } else {
    trophy = "bronze";
  }

  $("#endgame-box").removeClass("d-none");
  $("#game-box").addClass("d-none");
  $("#information-box").html(`<h2>Thanks for playing!</h2>
  <p>Your score is:</p>
  <h2>${score}%</h2>
 <img src="assets/images/${trophy}.png" class="reward-trophy" alt="trophy"> `);
  $("#button-box")[0].innerHTML = `
    <button id="restart-button" type="button" class="btn btn-primary">Play Again</button> <br>
    <button class="fade-trigger btn btn-primary" id="hard-reset-button" type="button">Title Screen</button>
  `;
  $("#button-box").removeClass("d-none");
}

/********** /SET-SCREEN-FUNCTIONS **********/

/********** EVENT-HANDLERS **********/

$("body").on("click", "#start-button", function () {
  newGame(1);
});

$("body").on("click", "#restart-button", function () {
  $("#score-text").html("0");
  $("#level-text").html("1");
  resetProgressBar();
  resetGame();
  newGame(1);
});

$("body").on("click", "#hard-reset-button", function () {
  setTimeout(function () {
    $("#score-text").html("0");
    $("#level-text").html("1");
    $("#music-icon")
      .removeClass("fa-volume-up")
      .removeClass("volume-active")
      .addClass("volume-inactive")
      .addClass("fa-volume-mute");
    $("#bg-music")[0].pause();
    resetProgressBar();
    resetGame();
    $("#information-box").html(`
    <h2>Instructions</h2>
    <p>You have <strong>7 seconds</strong> to memorize the pictures in the photos. If you guess
    <strong> each </strong>
    picture you can continue to the next level! There are <strong>six</strong> levels in total!
    </p>`);
    $("#button-box").html(`<p>
                            Press <button id="start-button" type="button" class="btn btn-primary">Start</button> to
                            begin!
                           </p>`);
  }, 400);
});

$("body").on("click", "#continue-button", function () {
  let currentLevel = $(".level-active").length;
  resetGame();
  newGame(currentLevel + 1);
  incrementLevelText();
});

$("#game-box").on("click", ".game-slot-button", function () {
  $(".slot-active").removeClass("slot-active");
  $(this).parent().addClass("slot-active");
  let thisButtonHiddenValue = $(this).parent()[0].hiddenValue;
});

$(".button-game-choice").click(function () {
  let slotToCheck = $(".slot-active")[0];

  let slotButton = $(".slot-active button");
  let slotCollection = $(".level-active");
  let currentLevel = slotCollection.length;

  slotToCheck.givenValue = this.storedValue;
  slotToCheck.style.background = slotToCheck.givenValue;
  slotButton.addClass("d-none");

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
      incrementProgressBar($(".level-active").length);

      currentLevel === 6 ? setEndScreen() : setWinScreen();
    } else {
      setLoseScreen();
      setEndScreen();
    }
  } else {
  }
});

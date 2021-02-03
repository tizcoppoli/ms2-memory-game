console.log("Hello, World!");

let gameSeq = [];
let newSequence = [];
let level = 0;
let maximumLevel = 5;

function startGame() {
  let arrayOfPossibilities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let gameButtons = $(".btn-game.btn-level-active");
  let sequence = generatingSequence(level, arrayOfPossibilities);

  $("#information-box")[0].innerHTML = `
    <p>You have <h2>5</h2> seconds!</p>
    `;

  for (let i = 0; i < gameButtons.length; i++) {
    gameButtons[i].innerHTML = `
    <img src="assets/images/figure-${sequence[i]}.png">
    `;
    console.log(sequence[i]);
  }

  $("#button-box").children().remove();

  setTimer();
}

function generatingSequence(level, arrayOfPossibilities) {
  for (let i = 0; i < level; i++) {
    let random = Math.floor(Math.random() * arrayOfPossibilities.length);
    newSequence[i] = arrayOfPossibilities.splice(random, 1)[0];
  }

  console.log(newSequence);
  console.log(gameSeq);
  return newSequence;
}

function setTimer() {
  let timeLeft = 5;

  let timer = setInterval(function () {
    timeLeft--;

    $("#information-box")[0].innerHTML = `
    <p>You have <h2>${timeLeft}</h2> seconds!</p>
    `;

    console.log(timeLeft);

    if (timeLeft <= 0) {
      clearInterval(timer);
      coverImages();
    }
  }, 1000);
}

function coverImages(timer) {
  let gameButtons = $(".btn-game");

  for (let button of gameButtons) {
    button.innerHTML = `
<img src="assets/images/figure-x.png">
`;
    console.log("success");
  }

  $("#information-box")[0].innerHTML = `
  <p><strong>Click</strong> a box to choose a color!<br>
  Once you have done click <strong>Check Result</strong>.</p>
  `;

  $("#button-box")[0].innerHTML = `
  <button id="check-button" type="button" class="btn btn-primary">Check Result</button>
  `;
}

function arrayToString(initialArray) {
  let convertedString = "";
  for (let element of initialArray) {
    convertedString = convertedString + " " + element;
  }
  return convertedString;
}

function checkSequence() {
  let sequenceString = arrayToString(newSequence);
  let gameString = arrayToString(gameSeq);

  if (sequenceString === gameString) {
    $("#information-box")[0].innerHTML = `<h2>Correct!</h2>`;

    $("#button-box")[0].innerHTML = `
    <button id="continue-button" type="button" class="btn btn-primary">Continue</button>
  `;
  } else {
    $("#information-box")[0].innerHTML = `<h2>Wrong!</h2>`;

    $("#button-box")[0].innerHTML = `
    <button id="restart-button" type="button" class="btn btn-primary">Restart</button>
  `;
  }
}

/* LEVELS */

function initializeLevel() {
  if (level < maximumLevel) {
    level++;
    $("#game-box").append(`
<button class="btn-game btn-level-active" id="gm-${level}" data-bs-toggle="modal" data-bs-target="#gameModal">
</button>
`);
  }

  startGame();
}

function resetGame() {
  level = 1;
  gameSeq = [];
  newSequence = [];
  $(".btn-game").remove();

  initializeLevel();
}

/* EVENT HANDLERS */

$("#start-button").click(initializeLevel);
//$("#restart-button").click(resetGame);
$("#button-box").on("click", "#restart-button", resetGame);
//$("#check-button").click(checkSequence);
//$("#continue-button").click(initializeLevel);
$("#button-box").on("click", "#continue-button", initializeLevel);
$("#button-box").on("click", "#check-button", checkSequence);

$("#game-box").on("click", ".btn-game", function () {
  $(this).addClass("game-active");
});

$(".btn-selector").click(function () {
  let wantedId = this.id;
  let buttonPosition = $(".game-active")[0].id.slice(3);
  console.log(buttonPosition);
  $(".game-active")[0].innerHTML = `
  <img src="assets/images/figure-${wantedId}.png">`;

  $(".game-active").removeClass("game-active");
  gameSeq[buttonPosition - 1] = wantedId;
  console.log(gameSeq);
});

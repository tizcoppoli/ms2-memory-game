console.log("Hello, World!");

let playerSequence = [];
let randomSequence = [];
let level = 0;
let maximumLevel = 10;

function initializeLevel() {
  if (level < maximumLevel) {
    level++;
    $("#game-box").append(`
<button class="btn-game btn-level-active d-none" id="gm-${level}" data-bs-toggle="modal" data-bs-target="#gameModal">
</button>
`);
  }

  startGame();
}

function startGame() {
  let arrayOfPossibilities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let gameButtons = $(".btn-game.btn-level-active");
  playerSequence = [];

  let sequence = generatingSequence(level, arrayOfPossibilities);

  $("#information-box")[0].innerHTML = `
    <p>You have <h2>${setTimeLeft()}</h2> seconds!</p>
    `;

  for (let i = 0; i < gameButtons.length; i++) {
    console.log(sequence[i]);

    $("#game-box").append(`
    <img src="assets/images/figure-${sequence[i]}.png">
    `);

    $(".btn-game").addClass("d-none");
  }

  $("#button-box").children().remove();

  setTimer();
}

function generatingSequence(level, arrayOfPossibilities) {
  for (let i = 0; i < level; i++) {
    let random = Math.floor(Math.random() * arrayOfPossibilities.length);
    randomSequence[i] = arrayOfPossibilities.splice(random, 1)[0];
  }

  console.log(randomSequence);
  console.log(playerSequence);
  return randomSequence;
}

function setTimer() {
  let timeLeft = setTimeLeft();

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

function setTimeLeft(){
  return level+2;
}

function coverImages(timer) {
  let gameButtons = $(".btn-game");

  $(".btn-game").removeClass("d-none");
  $("#game-box img").remove();

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
  let sequenceString = arrayToString(randomSequence);
  let gameString = arrayToString(playerSequence);

  if (playerSequence.includes(undefined) || playerSequence.length === 0) {
    $("#information-box")[0].innerHTML = `<p> 
    Please fill <strong>all</strong> the boxes before checking the result!</p>`;
  } else {
    if (sequenceString === gameString) {
      $("#information-box")[0].innerHTML = `<h2>Correct!</h2>
      <p>Click <strong>Continue</strong> for the next level.</p>`;
      $("#button-box")[0].innerHTML = `
    <button id="continue-button" type="button" class="btn btn-primary">Continue</button>
  `;
    } else {
      $("#information-box")[0].innerHTML = `<h2>Wrong!</h2>
      <p>I'm sorry! Click <strong>Restart</strong> to try again.</p>`;
      $("#button-box")[0].innerHTML = `
    <button id="restart-button" type="button" class="btn btn-primary">Restart</button>
  `;
    }
  }
}



function resetGame() {
  console.log("il livello è" + level);
  level = 0;
  console.log("il livello ORA è" + level);
  playerSequence = [];
  randomSequence = [];
  $(".btn-game").remove();

  initializeLevel();
}

/* EVENT HANDLERS */

$("#start-button").click(initializeLevel);
$("#button-box").on("click", "#restart-button", resetGame);
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
  playerSequence[buttonPosition - 1] = wantedId;
  console.log(playerSequence);
});

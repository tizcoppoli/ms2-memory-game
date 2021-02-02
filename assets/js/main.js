console.log("Hello, World!");

let gameSeq = [1, 2, 3, 4, 5];
let newSequence = [];

function generatingSequence(num, array) {
  newSequence = [];

  for (let i = 0; i < num; i++) {
    let random = Math.floor(Math.random() * array.length);
    newSequence[i] = array.splice(random, 1)[0];
  }
  console.log(newSequence);
  console.log(gameSeq);
  return newSequence;
}

function initializeButtons() {
  $(".btn-game img").css("opacity", 1);
  let gameButtons = $(".btn-game");

  let sequence = generatingSequence(5, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  for (let i = 0; i < gameButtons.length; i++) {
    gameButtons[i].innerHTML = `
    <img src="assets/images/figure-${sequence[i]}.png">
    `;
  }

  let time = $("#game-span")[0].innerHTML;

  $("#start-button").addClass("d-none");
  $("#restart-button").addClass("d-none");
  $("#check-button").addClass("d-none");

  $("#game-text").addClass("d-none");
      $("#intro-text").removeClass("d-none");

  let timer = setInterval(function () {
    time--;
    $("#game-span")[0].innerHTML = time;

    console.log(time);

    if (time <= 0) {
      //$(".btn-game img").css("opacity", 0);

      for (let button of gameButtons) {
        button.innerHTML = `
  <img src="assets/images/figure-x.png">
  `;
        console.log("success");
      }
      $("#restart-button").removeClass("d-none");
      $("#check-button").removeClass("d-none");
      $("#game-text").removeClass("d-none");
      $("#intro-text").addClass("d-none");



      $("#game-span")[0].innerHTML = "";
      clearInterval(timer);
      $("#game-span")[0].innerHTML = 5;
    }
  }, 1000);
}

function arrayToString(array) {
  let string="";

  for (let element of array) {
    string = string + " " + element;
  }

  console.log(string);
  return string;
}

function checkSequence() {
  let sequenceString = arrayToString(newSequence);
  let gameString = arrayToString(gameSeq);

  if (sequenceString === gameString) {
    window.alert("Correct Sequence!");
  } else {
    window.alert("Wrong Sequence!");
  }
}

/* EVENT HANDLERS */

$("#start-button").click(initializeButtons);
$("#restart-button").click(initializeButtons);
$("#check-button").click(checkSequence);

$(".btn-game").click(function () {
  console.log(this.id);

  $(this).addClass("game-active");
  let wantedId;
});

$(".btn-selector").click(function () {
  wantedId = this.id;

  let buttonPosition = $(".game-active")[0].id.slice(3);
  console.log(buttonPosition);

  $(".game-active")[0].innerHTML = `
  <img src="assets/images/figure-${wantedId}.png">
  `;

  $(".game-active").removeClass("game-active");

  gameSeq[buttonPosition - 1] = wantedId;
  console.log(gameSeq);
});

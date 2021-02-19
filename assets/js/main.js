$("body").on("click", ".fade-trigger", function () {
  if (!$("#main-game").hasClass("screen-active")) {
    $(".callout").fadeToggle();

    setTimeout(function () {
      $("#main-game").fadeToggle();
    }, 400);

    $("#main-game").addClass("screen-active");
  } else {
    $("#main-game").fadeToggle();

    setTimeout(function () {
      $(".callout").fadeToggle();
    }, 400);

    $("#main-game").removeClass("screen-active");
  }
});

$("body").on("click", ".volume-inactive", function () {
  $("#bg-music")[0].play();

  $("#music-icon")
    .removeClass("fa-volume-mute")
    .removeClass("volume-inactive")
    .addClass("volume-active")
    .addClass("fa-volume-up");
});

$("body").on("click", ".volume-active", function () {
  $("#bg-music")[0].pause();
  $("#music-icon")
    .removeClass("fa-volume-up")
    .removeClass("volume-active")
    .addClass("volume-inactive")
    .addClass("fa-volume-mute");
});

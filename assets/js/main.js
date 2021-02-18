console.log("Hello, World from main!");

$("body").on("click", ".js-scroll-trigger", function () {
  $(".callout").fadeToggle();

  setTimeout(function () {
    $("#main-game").fadeToggle();
  }, 400);
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

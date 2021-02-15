console.log("Hello, World from main!");

$("body").on("click", ".js-scroll-trigger", function () {
  $(".callout").fadeToggle();
  setTimeout(function () {
    $("#main-game").fadeToggle();
  }, 400);


  /* var windowWidth = window.innerWidth;

  if (windowWidth > 600) {
    $(".callout").toggle("slide");
    setTimeout(function () {
      $("#main-game").toggle("slide");
    }, 500);
  } else {
    $(".callout").fadeToggle();
    setTimeout(function () {
      $("#main-game").fadeToggle();
    }, 400);
  } */
});

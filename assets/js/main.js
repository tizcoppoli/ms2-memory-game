console.log("Hello, World from main!");

$("body").on("click", ".js-scroll-trigger", function () {
  $(".callout").fadeToggle();
  setTimeout(function () {
    $("#main-game").fadeToggle();
  }, 400);

});

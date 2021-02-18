(function () {
  emailjs.init("user_A5MWxehUDlslEy00CCF6R");
})();

function sendMail(contactForm) {
  console.log("la funzione sendMail viene chiamata");
  emailjs
    .send("gmail", "memory", {      
      "score": $("#score-text").html(),
      "to-email": contactForm.emailaddress.value,
    })
    .then(
      function (response) {
        console.log("SUCCESS", response);

        $("#form-button").append(`
<i class="fas fa-check correct-answer"></i>
`);
      },
      function (error) {
        console.log("FAILED", error);
        $("#form-button").append(`
<i class="fas fa-times wrong-answer"></i>
`);
      } 
    );

  return false;
}

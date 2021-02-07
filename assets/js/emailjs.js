console.log("Hello, World from emailjs!");

(function () {
    emailjs.init("user_A5MWxehUDlslEy00CCF6R");      
})();

function sendMail(contactForm) {
    console.log("la funzione sendMail viene chiamata")
    emailjs.send("gmail", "memory", {
        /* from_name: contactForm.name.value, */
        /* from_email: contactForm.emailaddress.value, */
        /* project_request: contactForm.projectsummary.value */
        "to-email": contactForm.emailaddress.value,
    })
        .then(
            function (response) {
                console.log("SUCCESS", response);
            },
            function (error) {
                console.log("FAILED", error);
            }
        );
    return false;
}
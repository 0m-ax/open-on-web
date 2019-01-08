const installButton = document.getElementById("install-button")
const buttonText = document.getElementById("button-text")
const noButtonText = document.getElementById("no-button-text")

let deferredPrompt;
window.addEventListener('beforeinstallprompt', function (e) {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  installButton.classList.remove("hidden");
  buttonText.classList.remove("hidden");
  noButtonText.classList.add("hidden");
});
installButton.addEventListener('click',(e)=>{
    installButton.classList.add("hidden");
    buttonText.classList.add("hidden");
    noButtonText.classList.remove("hidden");
    e.preventDefault();
    deferredPrompt.prompt();  // Wait for the user to respond to the prompt
    deferredPrompt.userChoice
    .then(function(choiceResult){
        console.log(choiceResult)
    })
})
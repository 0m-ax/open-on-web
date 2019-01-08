// Register the service worker
import M from 'materialize-css';
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
}).catch(function(err) {
    // registration failed :(
    	console.log('ServiceWorker registration failed: ', err);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {});
  });
let openSettings = document.getElementById("open-settings");
openSettings.value = localStorage.getItem('openSettings');
openSettings.addEventListener('change',()=>{
    localStorage.setItem('openSettings',openSettings.value);
})
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
  });

import{a as e}from"./chunk-99df54be.js";"serviceWorker"in navigator&&navigator.serviceWorker.register("/service-worker.js").then(function(e){console.log("ServiceWorker registration successful with scope: ",e.scope)}).catch(function(e){console.log("ServiceWorker registration failed: ",e)}),document.addEventListener("DOMContentLoaded",function(){var t=document.querySelectorAll(".sidenav");e.Sidenav.init(t,{})});let t=document.getElementById("open-settings");t.value=localStorage.getItem("openSettings"),t.addEventListener("change",()=>{localStorage.setItem("openSettings",t.value)}),document.addEventListener("DOMContentLoaded",function(){var t=document.querySelectorAll("select");e.FormSelect.init(t,{})});

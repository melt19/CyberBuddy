// buddy.js - Melissa Turner 2021

// global variables //
var done = false
var suspicious = true

// initialising elements //
let overlay = document.createElement('div')
let buddy = document.createElement('img')

// setting display of CyberBuddy //
buddy.id = 'cyber_buddy'
buddy.setAttribute('src', 'https://i.ibb.co/cDfHyhd/logo.png'); // this image link expires 8/1/22
buddy.style.display = 'block'
buddy.style.position = 'fixed'
buddy.style.zIndex = '999999'
buddy.style.width = '50px'
buddy.style.left = `${window.innerWidth - 70}px`
buddy.style.top = `${window.innerHeight - 80}px`

// adding CyberBuddy to the overlay //
overlay.appendChild(buddy)


function checkGoogleSafeBrowsing(url) {
  suspicious = false

  // inspiration from https://reqbin.com/req/javascript/uzf79ewc/javascript-post-request-example
  const API_KEY_GOOGLE =  "fakeAPI_abcdefghijklmnop123"
  var postUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${API_KEY_GOOGLE}`;

  var xhr = new XMLHttpRequest();
  xhr.open("POST", postUrl);

  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        console.log(xhr.status);
        console.log(xhr.responseText);
    }};

  var data = `{
    "client": {
      "clientId":      "CyberBuddy",
      "clientVersion": "1.5.2"
    },
    "threatInfo": {
      "threatTypes":      ["SOCIAL_ENGINEERING"],
      "platformTypes":    ["WINDOWS"],
      "threatEntryTypes": ["URL"],
      "threatEntries": [
        {"url": "${url}"}
      ]
    }
  }`;

  // inspiration from https://stackoverflow.com/questions/3038901/how-to-get-the-response-of-xmlhttprequest
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.responseText.toString() === "{}\n") {
        suspicious = false
      }
      done = true
    }
  }

  xhr.send(data);
}

// function to check the url as suspicious
function checkUrl() {
  currentUrl = window.location.href
  checkGoogleSafeBrowsing(currentUrl)
  setTimeout(() => {    
    if (suspicious) {
      speechPopup("Be Careful! This looks like a phishing website.")
    }
    done = false
    suspicious = false
  }, 500)

}

// calls CyberBuddy to check the url on website load //
window.addEventListener('load', function() {document.body.appendChild(overlay); checkUrl()}, false)

// keeps buddy in bottom right corner //
function adjustMargins() { 
  buddy.style.left = `${window.innerWidth - 70}px`
  buddy.style.top = `${window.innerHeight - 80}px`
  speechBubble.style.left = `${window.innerWidth - 250}px`
  speechBubble.style.top = `${window.innerHeight - 150}px`
  overlay.appendChild(buddy)
  overlay.appendChild(speechBubble)
  document.body.appendChild(overlay)
}

window.addEventListener('resize', adjustMargins)
// --------------------------------- //

// makes buddy bigger with hover //
buddy.addEventListener('mouseover', function() {
  buddy.style.width = '75px'

  let leftMargin = window.innerWidth - 100
  buddy.style.left = `${leftMargin}px`

  let topMargin = window.innerHeight - 110
  buddy.style.top = `${topMargin}px`
})

buddy.addEventListener('mouseout', function() {
  buddy.style.width = '50px'
  let leftMargin = window.innerWidth - 70
  buddy.style.left = `${leftMargin}px`

  let topMargin = window.innerHeight - 80
  buddy.style.top = `${topMargin}px`
})
// ---------------------------- //

// makes buddy disappear with click //
// inspired by overlay-clock-master // 
buddy.addEventListener('click', function() {
  buddy.style.display = 'none'
  setTimeout(function() {
    buddy.style.display = 'block'
  }, 3000)
})
// ------------------------------- //

// creates a speech bubble //
function speechPopup(text) {
  try {
    overlay.removeChild(speechBubble)
  }
  catch(error) {}

  let speechBubble = document.createElement('div')

  speechBubble.id = 'speechBubble';
  speechBubble.style.borderRadius = '6px';
  speechBubble.style.padding = '6px';
  speechBubble.style.color = "white";
  speechBubble.style.backgroundColor = "coral";
  speechBubble.style.fontSize = "12pt"
  speechBubble.style.textAlign = 'center'
  speechBubble.style.display = 'block'
  speechBubble.style.position = 'fixed'
  speechBubble.style.zIndex = '9999999'
  speechBubble.style.maxWidth = '140px'
  speechBubble.style.left = `${window.innerWidth - 220}px`
  speechBubble.style.top = `${window.innerHeight - 175}px`
  speechBubble.textContent = text

  overlay.appendChild(speechBubble)
}

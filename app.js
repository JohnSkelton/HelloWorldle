let keys =  {
  'q': '', 'w': '', 'e': '', 'r': '', 't': '', 'y': '', 'u': '', 'i': '', 'o': '', 'p': '', 'break': '',
  'a': '', 's': '', 'd': '', 'f': '', 'g': '', 'h': '', 'j': '', 'k': '', 'l': '', 'break2': '',
  'enter': '', 'z': '', 'x': '', 'c': '', 'v': '', 'b': '', 'n': '', 'm': '', '⌫': ''
};


let guesses = [];
let currentGuess = [];
let first=0;
let mysteryWord=''
let match=true;
var parameters = window.location.href.split('-')[1];
const param = new URLSearchParams(window. location. search)
var difficulty = param.get('difficulty')
let dict="f-dict.txt"
if (param=="f"){
  dict="f-dict.txt"
}
if (param=="e"){
  dict="e-dict.txt"
}
if (param=="t"){
  dict="t-dict.txt"
}
async function word(){
return await fetch(dict,{
  method: 'get'
})
.then(function(body){
	
  return body.text();
}).then(function(data) {

  let array=data.replaceAll("rn", '');
  array=array.split(" ");

for (var i = 0; i < array.length; i++) {
    let j=Math.floor(Math.random() * array.length);
    if (difficulty=='hard'){
    if ((array[j].trim().length>8)&&(array[j].trim().length<=12)){
    set(array[j].trim().toLowerCase());
    console.log(array[j].trim())
    initialize()
    return 
    }
  }
    if (difficulty=='medium'){
    if ((array[j].trim().length>5)&&(array[j].trim().length<=8)){
    set(array[j].trim().toLowerCase());
    console.log(array[j].trim())
    initialize()
    return 
    }
    }
    if (difficulty=='easy'){
    if (array[j].trim().length==5){
    set(array[j].trim().toLowerCase());
    console.log(array[j].trim())
    initialize()
    return
    }
    }
  }

});
}
word()

function set(word){
  mysteryWord=word;
}


const NumberOfGuesses = 6;
const Correct = 'correct';
const Found = 'found';
const Wrong = 'wrong';
const None = 'none';

function initialize() {
  let guessMatrix = document.getElementById("guessMatrix");
  for (let i = 0; i < NumberOfGuesses; i++) {
    for (let j = 0; j < mysteryWord.length; j++) {
      guessMatrix.innerHTML += `<div id="${i}${j}" class="key-guess"></div>`
    }
    guessMatrix.innerHTML += '<br/>'
  }
  let keyboard = document.getElementById("keyboard");
  Object.keys(keys).forEach((key) => {
    if (key.includes('break')) {
      keyboard.innerHTML += '<br/>';
    } else {
      keyboard.innerHTML += `<button id="${key}" class="key" onclick="keyClick('${key}')">` + key + '</button>';
    }
  });
}
function wait(ms)
{
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while(d2-d < ms);
}
function keyClick(key) {
  first++;
  if (first==1){

}
popup.innerHTML = `<div id="No Words Found" class="Container"> </p>
</div>`
  switch (key) {
    case '⌫':
      backspace();
      break;
    case 'enter':
      enter();
      break;
    default:
      if (currentGuess.length < mysteryWord.length
        && guesses.length < NumberOfGuesses) {
        currentGuess.push({ key: key, result: '' });
        updateCurrentGuess();
        
      }
  }
}

function backspace() {
  if (currentGuess.length > 0) {
    currentGuess.pop();
  }
  
  updateCurrentGuess(false);

}
function enter() {
  if (currentGuess.length < mysteryWord.length || guesses.length >= NumberOfGuesses) {
    return;
  }

  function check_if_word_exists(word) {
    let guess = "";
    currentGuess.forEach((keyGuess, index) => {
      guess= guess.concat(JSON.stringify(keyGuess.key));
    });
    guess=guess.replaceAll('"', '')
    if (guess!=mysteryWord){
    const url = "https://api.wordnik.com/v4/word.json/" + guess + "/definitions?limit=200&includeRelated=false&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
   
    $.ajax({
        type: "GET",
        url: url
    }).done(function (result) {
          updateCurrentGuess(true);
          guesses.push(currentGuess);
          currentGuess = [];  
          match=true        
    }).fail(function () {

      popup.innerHTML += `<div id="No Words Found" class="Container">   <p>Word does not exist in dictionary</p>
      </div>`
      //sets key results to null
      for (const key in keys) {
        keys[key]=''
      }
      match = false
      currentGuess = [];   
      updateCurrentGuess(false);       
      console.log("word does not exist");
    });
   
    }
    else{
      updateCurrentGuess(true);
          guesses.push(currentGuess);
        var div = document.getElementById('confetti');
 div.innerHTML = `
<div class="confetti-piece"></div>
<div class="confetti-piece"></div>
<div class="confetti-piece"></div>
<div class="confetti-piece"></div>
<div class="confetti-piece"></div>
<div class="confetti-piece"></div>
<div class="confetti-piece"></div>
<div class="confetti-piece"></div>
<div class="confetti-piece"></div>
<div class="confetti-piece"></div>
<div class="confetti-piece"></div>
<div class="confetti-piece"></div>
<div class="confetti-piece"></div>

`;
helloWorld.innerHTML += `<div id="HelloWorld" class="Container">   <p>Hello World!!</p>
</div>`
    currentGuess = []; 
    }
}


function getPosition(string, subString, index) {
  return string.split(subString, index).join(subString).length;
}
function getCurrentGuess(){
  let text = "";
  currentGuess.forEach((keyGuess, index) => {
    text += keyGuess.key;
  });
return text;

} 
let count=0;
  currentGuess.forEach((keyGuess, index) => {
   // if (match){
    if (mysteryWord.charAt(index) == keyGuess.key) {
      keyGuess.result = Correct
    } else if (mysteryWord.includes(keyGuess.key)) {
      console.log()
      //guess
      count=mysteryWord.split(keyGuess.key).length - 1
      // if the letter index is less than or equal to the position of the total count of that letter in
      // the mysteryWord (final letter position that equals the amount of letters in the mysteryWord), result=found
      if (index<=getPosition(getCurrentGuess(),keyGuess.key,count)){
      keyGuess.result = Found
      }
      else{
        keyGuess.result = Wrong

      }
    } else {
      keyGuess.result = Wrong
    }

    if (keys[keyGuess.key] != Correct) {
      keys[keyGuess.key] = keyGuess.result
    }
  

  
  });
  check_if_word_exists(currentGuess);
  
}


function updateKeyboard() {
  for (const key in keys) {
    if (keys[key] != '') {
      let keyElement = document.getElementById(`${key}`);
      keyElement.className = '';    
      keyElement.classList.add(keys[key]);
      keyElement.classList.add('key');
      
    }
  }
}

function updateGuess(guessed = false) {
  let index = guesses.length;
  for (let i = 0; i < mysteryWord.length; i++) {
    let guessMatrix = document.getElementById(`${index}${i}`);
    if (currentGuess[i]) {
      guessMatrix.innerHTML = currentGuess[i].key;
    } else {
      guessMatrix.innerHTML = '';
    }
    if (guessed) {
      guessMatrix.classList.add(currentGuess[i].result);
    }
  }
  if (guessed) {
    updateKeyboard();

  }
}

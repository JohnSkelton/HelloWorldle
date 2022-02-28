// dictionary: could have been an array but I chose a dictionary to track the state of each key
let keys =  {
  'q': '', 'w': '', 'e': '', 'r': '', 't': '', 'y': '', 'u': '', 'i': '', 'o': '', 'p': '', 'break': '',
  'a': '', 's': '', 'd': '', 'f': '', 'g': '', 'h': '', 'j': '', 'k': '', 'l': '', 'break2': '',
  'enter': '', 'z': '', 'x': '', 'c': '', 'v': '', 'b': '', 'n': '', 'm': '', '⌫': ''
};

//  array for all guesses and for current guess
let guesses = [];
let currentGuess = [];
// Word to guess from genre dictionaries
let mysteryWord=''
//gets the parameter from the url
const param = new URLSearchParams(window. location. search)
// gets the difficulty from url parameter
var difficulty = param.get('difficulty')
let dict="e-dict.txt"
//sets the genre dictionary based on the parameter in url
var parameters = window.location.href.split('-')[2];
if (parameters=="f"){
  dict="f-dict.txt"
}
if (parameters=="e"){
  dict="e-dict.txt"
}
if (parameters=="t"){
  dict="t-dict.txt"
}
console.log(difficulty+"/"+parameters+"/"+param)
// sets the mystery word depending on difficulty 
async function word(){
return await fetch(dict,{
  method: 'get'
})
.then(function(body){
	
  return body.text();
}).then(function(data) {

  let array=data.replaceAll("rn", '');
  array=array.split(" ");
// sets mystery word to size 9-12 if hard difficulty 
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
  // sets mystery word to size 6-8 if medium difficulty 

    if (difficulty=='medium'){
    if ((array[j].trim().length>5)&&(array[j].trim().length<=8)){
    set(array[j].trim().toLowerCase());
    console.log(array[j].trim())
    initialize()
    return 
    }
    }
    // sets mystery word to size 5 if easy difficulty 

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

// sets number of guesses might change this to let and edit based on difficulty in future version
const NumberOfGuesses = 6;

// for colouring tiles
const Correct = 'correct';
const Found = 'found';
const Wrong = 'wrong';
const None = 'none';
// initializes the matrix and keyboard
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
// wait function by ms can be used to set a timer on html elements such as pop up messages currently not used
function wait(ms)
{
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while(d2-d < ms);
}
// when key clicked update current guess based on key pushed unless row end reached and remove popup messages
function keyClick(key) {

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
// backspace current guess
function backspace() {
  if (currentGuess.length > 0) {
    currentGuess.pop();
  }
  
  updateCurrentGuess(false);

}
function enter() {
  // if end of row or end of matrix return otherwise continue
  if (currentGuess.length < mysteryWord.length || guesses.length >= NumberOfGuesses) {
    return;
  }
// checks if the word exists using an api dictionary 
  function check_if_word_exists(word) {
    let guess = "";
    // gets full guess
    currentGuess.forEach((keyGuess, index) => {
      guess= guess.concat(JSON.stringify(keyGuess.key));
    });
    guess=guess.replaceAll('"', '')
    // run the api if the guess doesnt equal the mystery word if it does then set confetti
    if (guess!=mysteryWord){
    const url = "https://api.wordnik.com/v4/word.json/" + guess + "/definitions?limit=200&includeRelated=false&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
   
    $.ajax({
        type: "GET",
        url: url
    }).done(function (result) {
          updateCurrentGuess(true);
          guesses.push(currentGuess);
          currentGuess = [];  
    }).fail(function () {

      popup.innerHTML += `<div id="No Words Found" class="Container">   <p>Word does not exist in dictionary</p>
      </div>`
      //sets key results to null
      for (const key in keys) {
        keys[key]=''
      }
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

// gets the position of the subString(letter/char in this case)
function getPosition(string, subString, index) {
  return string.split(subString, index).join(subString).length;
}
// get the full guess
function apend(){
  let text = "";
  currentGuess.forEach((keyGuess, index) => {
    text += keyGuess.key;
  });
return text;

} 

let count=0;
  currentGuess.forEach((keyGuess, index) => {
    if (mysteryWord.charAt(index) == keyGuess.key) {
      keyGuess.result = Correct
    } else if (mysteryWord.includes(keyGuess.key)) {
      console.log()
      //guess
      count=mysteryWord.split(keyGuess.key).length - 1
      // if the letter index is less than or equal to the position of the total count of that letter in
      // the mysteryWord (final letter position that equals the amount of letters in the mysteryWord), result=found
      if (index<=getPosition(apend(),keyGuess.key,count)){
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

//  updates keyboard keys
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

// updates guess
function updateCurrentGuess(guessed = false) {
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

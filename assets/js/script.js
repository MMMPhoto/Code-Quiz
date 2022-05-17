let body = document.body;
let highScores = document.getElementById("high-scores");
let timer = document.getElementById("timer");
let title = document.getElementById("title");
let subheading = document.getElementById("subheading");
let scoreboard = document.getElementById("scoreboard");
let buttonConatiner = document.getElementsByClassName("button-container");
let button = document.getElementsByClassName("button");
let button1 = document.getElementById("button1");
let button2 = document.getElementById("button2");
let button3 = document.getElementById("button3");
let button4 = document.getElementById("button4");
let enterScore = document.getElementById("enter-score");
let answer = document.getElementById("answer");

// Listen for click to start
button1.addEventListener("click",function() {

});

// Listen for click to view high scores
highScores.addEventListener("click", function() {
    hideElements(highScores);
    hideElements(timer);
    hideElements(subheading);
    revealElements(scoreboard);
    revealElements(button2);
    changeText(title, "High Scores");
    changeText(button1, "Go back");
    changeText(button2, "Clear Scores");
   
    // console.log(`highScores is now ${highScores.dataset.state}`);
    // console.log(`timer is now ${timer.dataset.state}`);
    // console.log(`subheading is now ${}`)
    // console.log(`scoreboard is now ${scoreboard.dataset.state}`);
    // console.log(`button`)
});

let hideElements = function(element) {
    element.dataset.state = "hidden";
    element.style.display = "none";
    console.log(`${element.id} is now ${element.dataset.state}`);
};

let changeText = function(element, newText) {
    element.textContent = newText;
}

let revealElements = function(element) {
    element.dataset.state = "visible";
    element.style.display = "inline";
    console.log(`${element.id} is now ${element.dataset.state}`);
}




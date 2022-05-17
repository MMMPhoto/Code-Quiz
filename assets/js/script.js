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

// Basic DOM manipulation functions
let hideElement = function(element) {
    element.dataset.state = "hidden";
    element.style.display = "none";
    console.log(`${element.id} is now ${element.dataset.state}`);
};
let changeText = function(element, newText) {
    element.textContent = newText;
};
let revealElement = function(element) {
    element.dataset.state = "visible";
    element.style.display = "inline";
    console.log(`${element.id} is now ${element.dataset.state}`);
};

// Function to load start page
let startPage = function() {
    body.dataset.page = "start";
    hideElement(scoreboard);
    hideElement(button2);
    hideElement(button3);
    hideElement(button4);    
    revealElement(highScores);
    revealElement(timer);
    revealElement(subheading);
    changeText(title, "Coding Quiz Challenge!");
    changeText(button1, "Start");
    changeText(subheading, "Welcome to the Coding Quiz! Try to answer the questions to test your coding knowledge. But beware! There is a timer, and you must finish before the time expires. Answer a question wrong, and you lose time. Run out of time, and you lose! Are you ready?");
};

// Function to show scoreboard
let showHighScores = function() {
    body.dataset.page = "high-scores";
    hideElement(highScores);
    hideElement(timer);
    hideElement(subheading);
    hideElement(button3);
    hideElement(button4);
    revealElement(scoreboard);
    revealElement(button2);
    changeText(title, "High Scores");
    changeText(button1, "Go back");
    changeText(button2, "Clear Scores");
};

// Function to play quiz
let quiz = function() {
    body.dataset.page = "Quiz1";
    hideElement(subheading);
    revealElement(button2);
    revealElement(button3);
    revealElement(button4);
    changeText(title, "Question number 1 text");
    changeText(button1, "Answer1");
    changeText(button2, "Answer2");
    changeText(button3, "Answer3");
    changeText(button4, "Answer4");
};

// Listen for click to start
button1.addEventListener("click", function() {
    if (body.dataset.page === "high-scores") {
        startPage();
    } else if (body.dataset.page === "start") {
        quiz();
    };
});

// Listen for click to view high scores
highScores.addEventListener("click", function() {
    showHighScores();
});




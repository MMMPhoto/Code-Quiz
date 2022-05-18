let body = document.body;
let highScores = document.getElementById("high-scores");
let timer = document.getElementById("timer");
let title = document.getElementById("title");
let subheading = document.getElementById("subheading");
let scoreboard = document.getElementById("scoreboard");
let buttonContainer = document.getElementsByClassName("button-container");
let button = document.getElementsByClassName("button");
let startButton = document.getElementById("start-button");
let goBackButton = document.getElementById("back-button");
let clearScores = document.getElementById("clear-scores");
let answer1 = document.getElementById("answer1");
let answer2 = document.getElementById("answer2");
let answer3 = document.getElementById("answer3");
let answer4 = document.getElementById("answer4");
let enterScore = document.getElementById("enter-score");
let answer = document.getElementById("answer");
var quizPageCounter = 0;

// Build Question object arrays
const questions = [];
for (let i = 0; i < 5; i++) {
    questions[i] = {
            questionNumber: `question${i+1}`,
            text: `This is question ${i+1}`,
            answer1: "answer1 text",
            answer2: "answer2 text",
            answer3: "answer3 text",
            answer4: "answer4 text",
            correct: "answer3"
        }
    };
console.log(questions);

// Basic DOM manipulation functions
let hideElement = function(element) {
    element.dataset.state = "hidden";
    element.style.display = "none";
    // console.log(`${element.id} is now ${element.dataset.state}`);
};
let changeText = function(element, newText) {
    element.textContent = newText;
};
let revealElement = function(element) {
    element.dataset.state = "visible";
    element.style.display = "inline";
    // console.log(`${element.id} is now ${element.dataset.state}`);
};

// Function to load start page
let startPage = function() {
    body.dataset.page = "start";
    console.log(`Page state is now ${body.dataset.page}`);
    hideElement(scoreboard);
    hideElement(goBackButton);
    hideElement(clearScores);
    hideElement(answer1);
    hideElement(answer2);
    hideElement(answer3);
    hideElement(answer4);    
    revealElement(highScores);
    revealElement(timer);
    revealElement(subheading);
    revealElement(startButton);
    changeText(title, "Coding Quiz Challenge!");
    changeText(startButton, "Start");
    changeText(subheading, "Welcome to the Coding Quiz! Try to answer the questions to test your coding knowledge. But beware! There is a timer, and you must finish before the time expires. Answer a question wrong, and you lose time. Run out of time, and you lose! Are you ready?");
};

// Function to show scoreboard
let highScoresPage = function() {
    body.dataset.page = "high-scores";
    console.log(`Page state is now ${body.dataset.page}`);
    hideElement(highScores);
    hideElement(timer);
    hideElement(subheading);
    hideElement(startButton);
    hideElement(answer1);
    hideElement(answer2);
    hideElement(answer3);
    hideElement(answer4);
    revealElement(scoreboard);
    revealElement(goBackButton);
    revealElement(clearScores);
    changeText(title, "High Scores");

};

// Function to start quiz
let quizStart = function() {
    // insert start timer here
    body.dataset.page = "quiz";
    console.log(`Page state is now ${body.dataset.page}`);
    hideElement(subheading);
    hideElement(startButton);
    revealElement(answer1);
    revealElement(answer2);
    revealElement(answer3);
    revealElement(answer4);
    quizPageNew();
};

let quizPageNew = function () {
    changeText(title, questions[quizPageCounter].text);
    changeText(answer1, questions[quizPageCounter].answer1);
    changeText(answer2, questions[quizPageCounter].answer2);
    changeText(answer3, questions[quizPageCounter].answer3);
    changeText(answer4, questions[quizPageCounter].answer4);        
    // }  
};

let quizChoice = function() {
    quizPageCounter += 1;
    if (quizPageCounter < questions.length) {
        quizPageNew();
    } else {
        donePage();
    };
};

let donePage = function() {
    body.dataset.page = "done";
    console.log(`Page state is now ${body.dataset.page}`);
    hideElement(scoreboard);
    hideElement(goBackButton);
    hideElement(clearScores);
    hideElement(answer1);
    hideElement(answer2);
    hideElement(answer3);
    hideElement(answer4);    
    hideElement(highScores);
    hideElement(timer);
    hideElement(startButton);
    revealElement(subheading);
    revealElement(enterScore);
    changeText(title, "All done!");
    changeText(subheading, "Please enter your score");
};

// Listen for clicks to start quiz or answer
startButton.addEventListener("click", function(){
    quizStart();
});
answer1.addEventListener("click", function() {
    quizChoice();
});
answer2.addEventListener("click", function() {
    quizChoice();
});
answer3.addEventListener("click", function() {
    quizChoice();
});
answer4.addEventListener("click", function() {
    quizChoice();
});

// Listen for click to view high scores and go back
highScores.addEventListener("click", function() {
    highScoresPage();
});
goBackButton.addEventListener("click", function() {
    startPage();
})

// buttonContainer.addEventListener("click", function(event) {
//     element = event.target;
//     if (body.dataset.page === "high-scores") {
//         startPage();
//     } else if (body.dataset.page === "start") {
//         quizPage();
//     } else if (body.dataset.page === "quiz" ) {
//         quizChoice();
//     };
// });



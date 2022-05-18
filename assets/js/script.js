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
let quizPageCounter;
let answerWrong;

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

// Load start page
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

// Show scoreboard
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

// Load first quiz page
let quizStart = function() {
    body.dataset.page = "quiz";
    console.log(`Page state is now ${body.dataset.page}`);
    quizPageCounter = 0;
    hideElement(subheading);
    hideElement(startButton);
    revealElement(highScores);
    revealElement(timer);
    revealElement(answer1);
    revealElement(answer2);
    revealElement(answer3);
    revealElement(answer4);
    quizPageNew();
};

// Start timer, run rest of quiz functions within
let timerActive = function() {
    let timeLeft = 59;
    let quizTimer = setInterval(function() {
        if (timeLeft <= 0) {
            changeText(timer, "Time's up!");
            clearTimeout(quizTimer);
            loserPage();
        } else if (timeLeft > 9) {
            changeText(timer, `Time: 0:${timeLeft}`);
        } else if (timeLeft <= 9) {
            changeText(timer, `Time: 0:0${timeLeft}`);
        }
        if (answerWrong) {
            timeLeft-=15;
            answerWrong= false;
        };
        timeLeft--;
        console.log(timeLeft);
    }, 1000);
    quizStart();
};

// Load new quiz pages
let quizPageNew = function() {
    console.log(`quizPageCounter value is ${quizPageCounter}`);
    changeText(title, questions[quizPageCounter].text);
    changeText(answer1, questions[quizPageCounter].answer1);
    changeText(answer2, questions[quizPageCounter].answer2);
    changeText(answer3, questions[quizPageCounter].answer3);
    changeText(answer4, questions[quizPageCounter].answer4);        
    // }  
};

// Iterate quiz pages
let quizChoice = function() {
    quizPageCounter += 1;
    if (quizPageCounter < questions.length) {
        quizPageNew();
    } else {
        loserPage();
    };
};

// Load done page
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

// Load loser page
let loserPage = function() {
    body.dataset.page = "loser";
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
    hideElement(enterScore);
    revealElement(startButton);
    revealElement(subheading);
    changeText(title, "You ran out of time!");
    changeText(subheading, "Would you like to play again?");
    changeText(startButton, "Play again");
}

// Listen for clicks to start quiz
startButton.addEventListener("click", function(){
    timerActive();
});

// Listen for click to view high scores and go back
highScores.addEventListener("click", function() {
    highScoresPage();
});
goBackButton.addEventListener("click", function() {
    startPage();
})

answer1.addEventListener("click", function() {
    answerWrong = true;
    quizChoice();
});
answer2.addEventListener("click", function() {
    answerWrong = true;
    quizChoice();
});
answer3.addEventListener("click", function() {
    answerWrong = false;
    quizChoice();
});
answer4.addEventListener("click", function() {
    answerWrong = true;
    quizChoice();
});

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



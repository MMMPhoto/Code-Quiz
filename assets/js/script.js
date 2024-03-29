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
let answerContainer = document.getElementById("answer-container");
let answer1 = document.getElementById("answer1");
let answer2 = document.getElementById("answer2");
let answer3 = document.getElementById("answer3");
let answer4 = document.getElementById("answer4");
let enterScore = document.getElementById("enter-score");
let initials = document.getElementById("initials");
let submitButton = document.getElementById("submit");
let realAnswer = document.getElementById("real-answer");
let quizPageCounter;
let score;
let highScoreTally = []; 
localStorage.setItem("allHighScores", JSON.stringify(highScoreTally));
let timeLeft;
let wrongRightDelay;

// Build Question object arrays
const questions = [];
    questions[0] = {
        text: "A Boolean is a data type that stores what?",
        answer1: "Numbers and letters",
        answer2: "A series of strings",
        answer3: "A value of 'true' or 'false'",
        answer4: "A random number",
        correct: ["wrong", "wrong", "right", "wrong"]
    };
    questions[1] = {
        text: "How do you signify that a variable is an Array?",
        answer1: "End the variable name with the word 'Array'",
        answer2: "Use brackets [ ] to enclose the values",
        answer3: "Separate values by semicolons",
        answer4: "Use single quotes '' around the values",
        correct: ["wrong", "right", "wrong", "wrong"]
    };
    questions[2] = {
        text: "Which of the following is a type of variable?",
        answer1: "Numbers",
        answer2: "Strings",
        answer3: "Arrays",
        answer4: "All of the above",
        correct: ["wrong", "wrong", "wrong", "right"]
    };
    questions[3] = {
        text: "What does a For loop do?",
        answer1: "Allows you to declare a variable for use in a function",
        answer2: "Is simply a type of function available for use",
        answer3: "Create an interation until a specfic value is met",
        answer4: "Loops the word 'for' over and over",
        correct: ["wrong", "wrong", "right", "wrong"]
    };
    questions[4] = {
        text: "What is String Concatenation?",
        answer1: "The process of appending a string to another string",
        answer2: "Shouting the code out loud so you can hear how it sounds",
        answer3: "Converting a string to a number",
        answer4: "The action of placing yourself in opposition to a cat",
        correct: ["right", "wrong", "wrong", "wrong"]
    };

// Basic DOM manipulation functions
let changeText = function(element, newText) {
    element.textContent = newText;
};
let hideElement = function(element) {
    element.dataset.state = "hidden";
    element.style.display = "none";
};
let revealElement = function(element) {
    element.dataset.state = "visible";
    element.style.display = "block";
};
// Hide multiple elements
let hideMany = function(hideArray) {
    for (i = 0; i < hideArray.length; i++) {
        hideElement(hideArray[i]);
    } 
};
// Reveal multiple elements
let revealMany = function(revealArray) {
    for (i = 0; i < revealArray.length; i++) {
        revealElement(revealArray[i]);
    } 
};

// Load start page
let startPage = function() {
    body.dataset.page = "start";
    changeText(title, "Coding Quiz Challenge!");
    changeText(startButton, "Start");
    changeText(timer, "Time: 1:00");
    changeText(subheading, "Welcome to the Coding Quiz! Try to answer the questions to test your coding knowledge. But beware! There is a timer, and you must finish before the time expires. Answer a question wrong, and you lose time. Run out of time, and you lose! Are you ready?");
    var hideArray = [scoreboard, goBackButton, clearScores, answerContainer];
    hideMany(hideArray);
    var revealArray = [highScores, timer, subheading, startButton];
    revealMany(revealArray);
};

// Load high scores page
let highScoresPage = function() {
    body.dataset.page = "high-scores";
    changeText(title, "High Scores");
    var hideArray = [highScores, timer, subheading, startButton, answerContainer, enterScore];
    hideMany(hideArray);
    var revealArray = [scoreboard, goBackButton, clearScores];
    revealMany(revealArray);
    displayScores();
};

// Pull high scores from local storage
let displayScores = function() {
    highScoreTally = []; 
    highScoreTally = JSON.parse(localStorage.getItem("allHighScores")) || [];
    scoreboard.innerHTML = "";
    var table = document.createElement('table');
    for (i = 0; i < highScoreTally.length; i++) {
        tr = document.createElement('tr');
        td = document.createElement('td');
        tr.appendChild(td);
        td.innerHTML = highScoreTally[i].initials;
        td = document.createElement('td');
        tr.appendChild(td);
        td.innerHTML = highScoreTally[i].score;
        table.appendChild(tr);
    }
    document.getElementById('scoreboard').appendChild(table);
};

// Clear scores from local storage
let clearLocalStorage = function() {
    highScoreTally = [];
    localStorage.setItem("allHighScores", JSON.stringify(highScoreTally));
};

// Start timer, run rest of quiz functions within
let timerActive = function() {
    timeLeft = 59;
    let quizTimer = setInterval(function() {
        if (quizPageCounter === questions.length) {
            score = timeLeft;
            clearTimeout(quizTimer);
            setTimeout(function(){}, 4000);
            hideElement(realAnswer);
            donePage();
        }
        if (timeLeft <= 0) {
            clearTimeout(quizTimer);
            setTimeout(function(){}, 4000);
            hideElement(realAnswer);
            loserPage();
        } else if (timeLeft > 9) {
            changeText(timer, `Time: 0:${timeLeft}`);
        } else if (timeLeft <= 9) {
            changeText(timer, `Time: 0:0${timeLeft}`);
        };
        highScores.addEventListener("click", function() {
            clearTimeout(quizTimer);
        });
        if (wrongRightDelay > timeLeft) {
            hideElement(realAnswer);
        };
        timeLeft--;
    }, 1000);
    quizStart();
};

// Load first quiz page
let quizStart = function() {
    body.dataset.page = "quiz";
    quizPageCounter = 0;
    var hideArray = [subheading, startButton];
    hideMany(hideArray);
    var revealArray = [highScores, timer, answerContainer];
    revealMany(revealArray);
    answerContainer.style.display = "flex";
    title.style.textAlign = "left";
    quizPageNew();
};

// Load new quiz pages
let quizPageNew = function() {
    changeText(title, questions[quizPageCounter].text);
    changeText(answer1, `1. ${questions[quizPageCounter].answer1}`);
    changeText(answer2, `2. ${questions[quizPageCounter].answer2}`);
    changeText(answer3, `3. ${questions[quizPageCounter].answer3}`);
    changeText(answer4, `4. ${questions[quizPageCounter].answer4}`);
};

// Iterate quiz pages
let quizChoice = function() {
    wrongRightDelay = timeLeft;
    quizPageCounter += 1;
    if (quizPageCounter < questions.length) {
        quizPageNew();
    };
};

// Load done page
let donePage = function() {
    body.dataset.page = "done";
    title.style.textAlign = "center";
    changeText(title, "All Done!");
    changeText(subheading, `Your Score is ${score}`);
    initials.value = "";
    var hideArray = [scoreboard, goBackButton, clearScores, answerContainer, highScores, timer, startButton];
    hideMany(hideArray);
    var revealArray = [subheading, enterScore];
    revealMany(revealArray);
};

// Load loser page
let loserPage = function() {
    body.dataset.page = "loser";
    title.style.textAlign = "center";
    changeText(title, "You Ran Out of Time!");
    changeText(subheading, "Would you like to play again?");
    changeText(startButton, "Play again");
    let hideArray = [scoreboard, goBackButton, clearScores, answerContainer, highScores, timer, enterScore];
    hideMany(hideArray);
    let revealArray = [startButton, subheading];
    revealMany(revealArray);
};

// Listen for click to start quiz
startButton.addEventListener("click", function(){
    timerActive();
});

// Listen for click to view high scores, clear scores, go back
highScores.addEventListener("click", function() {
    highScoresPage();
});
goBackButton.addEventListener("click", function() {
    startPage();
});
clearScores.addEventListener("click", function() {
    clearLocalStorage();
    displayScores();
})

// Listen for click on answers
answer1.addEventListener("click", function() {
    if (questions[quizPageCounter].correct[0] == "right") {
        changeText(realAnswer, "Right!");
    } else {
        changeText(realAnswer, "Wrong!");
        timeLeft-=15;
    };
    revealElement(realAnswer);
    quizChoice();
});
answer2.addEventListener("click", function() {
    if (questions[quizPageCounter].correct[1] == "right") {
        changeText(realAnswer, "Right!");
    } else {
        changeText(realAnswer, "Wrong!");
        timeLeft-=15;
    };
    revealElement(realAnswer);
    quizChoice();
});
answer3.addEventListener("click", function() {
    if (questions[quizPageCounter].correct[2] == "right") {
        changeText(realAnswer, "Right!");
    } else {
        changeText(realAnswer, "Wrong!");
        timeLeft-=15;
    };
    revealElement(realAnswer);
    quizChoice();
});
answer4.addEventListener("click", function() {    
    if (questions[quizPageCounter].correct[3] == "right") {
        changeText(realAnswer, "Right!");
    } else {
        changeText(realAnswer, "Wrong!");
        timeLeft-=15;
    };
    revealElement(realAnswer);
    quizChoice();
});

// Listen for click to enter score
submitButton.addEventListener("click", function(event) {
    event.preventDefault();
    let newScore = {
        initials : initials.value,
        score : score
    };
    highScoreTally = [];
    highScoreTally = JSON.parse(localStorage.getItem("allHighScores")) || [];
    highScoreTally.push(newScore);
    localStorage.setItem("allHighScores", JSON.stringify(highScoreTally));
    highScoresPage();
});
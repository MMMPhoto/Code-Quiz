let body = document.body;
let highScores = document.getElementById("high-scores");
let timer = document.getElementById("timer");
let title = document.getElementById("title");
let subheading = document.getElementById("subheading");
let scoreboard = document.getElementById("scoreboard");
let scoreBoardTable;
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
let initials = document.getElementById("initials");
let answer = document.getElementById("answer");
let quizPageCounter;
let answerWrong;
let score;
let highScoreTally = []; 
localStorage.setItem("allHighScores", JSON.stringify(highScoreTally));
let submitButton = document.getElementById("submit");
let scoresTable;
let newHTML
// Build Question object arrays
const questions = [];

    questions[0] = {
        text: "A Boolean is a data type that stores what?",
        answer1: "Numbers and Letters",
        answer2: "A Series of Strings",
        answer3: "A Value of True or False",
        answer4: "A Random Number",
        correct: ["wrong", "wrong", "right", "wrong"]
    };
    questions[1] = {
        text: "How do you signify that a variable is an Array?",
        answer1: "End the variable name with the word 'Array'",
        answer2: "Use Brackets [] to enclose the values",
        answer3: "Separate values by semicolons",
        answer4: "Use Single Quotes '' around the values",
        correct: ["wrong", "right", "wrong", "wrong"]
    };
    questions[2] = {
        text: "Question 3",
        answer1: "answer1 text",
        answer2: "answer2 text",
        answer3: "answer3 text",
        answer4: "answer4 text",
        correct: ["wrong", "wrong", "wrong", "right"]
    };
    questions[3] = {
        text: `This is question 4`,
        answer1: "answer1 text",
        answer2: "answer2 text",
        answer3: "answer3 text",
        answer4: "answer4 text",
        correct: ["wrong", "wrong", "right", "wrong"]
    };
    questions[4] = {
        text: `This is question 5`,
        answer1: "answer1 text",
        answer2: "answer2 text",
        answer3: "answer3 text",
        answer4: "answer4 text",
        correct: ["right", "wrong", "wrong", "wrong"]
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
    changeText(title, "Coding Quiz Challenge!");
    changeText(startButton, "Start");
    changeText(timer, "Time: 1:00");
    changeText(subheading, "Welcome to the Coding Quiz! Try to answer the questions to test your coding knowledge. But beware! There is a timer, and you must finish before the time expires. Answer a question wrong, and you lose time. Run out of time, and you lose! Are you ready?");
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
};

// Show scoreboard
let highScoresPage = function() {
    body.dataset.page = "high-scores";
    console.log(`Page state is now ${body.dataset.page}`);
    changeText(title, "High Scores");
    hideElement(highScores);
    hideElement(timer);
    hideElement(subheading);
    hideElement(startButton);
    hideElement(answer1);
    hideElement(answer2);
    hideElement(answer3);
    hideElement(answer4);
    hideElement(enterScore);
    revealElement(scoreboard);
    revealElement(goBackButton);
    revealElement(clearScores);
    displayScores();
    function displayScores() {
        highScoreTally = []; 
        highScoreTally = JSON.parse(localStorage.getItem("allHighScores")) || [];
        console.log(highScoreTally);
        scoreBoardTable = document.getElementById("score-table").innerHTML = "<p>" + highScoreTally[0].initials + "  :  " + highScoreTally[0].score + "</p>";
        // for (var i = 0; i < highScoreTally.length; i++) {
        //     scoreBoardTableContent += "<tr><td>" + highScoreTally[i].initials + "</td><td>" + highScoreTally[i].score + "</td></tr>";
        // }
        // console.log(scoreBoardTableContent);
        // newHTML = scoreBoardTableContent;
    };
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
        if (quizPageCounter === questions.length) {
            score = timeLeft;
            clearTimeout(quizTimer);
            donePage();
        }
        if (timeLeft <= 0) {
            changeText(timer, "Time's up!");
            clearTimeout(quizTimer);
            loserPage();
        } else if (timeLeft > 9) {
            changeText(timer, `Time: 0:${timeLeft}`);
        } else if (timeLeft <= 9) {
            changeText(timer, `Time: 0:0${timeLeft}`);
        };
        if (answerWrong) {
            timeLeft-=15;
            answerWrong= false;
        };
        highScores.addEventListener("click", function() {
            clearTimeout(quizTimer);
        });
        timeLeft--;
        console.log(timeLeft);
    }, 1000);
    quizStart();
};

// Load new quiz pages
let quizPageNew = function() {
    console.log(`quizPageCounter value is ${quizPageCounter}`);
    changeText(title, questions[quizPageCounter].text);
    changeText(answer1, `1. ${questions[quizPageCounter].answer1}`);
    changeText(answer2, `2. ${questions[quizPageCounter].answer2}`);
    changeText(answer3, `3. ${questions[quizPageCounter].answer3}`);
    changeText(answer4, `4. ${questions[quizPageCounter].answer4}`);
};

// Iterate quiz pages
let quizChoice = function() {
    quizPageCounter += 1;
    if (quizPageCounter < questions.length) {
        quizPageNew();
    };
};

// Load done page
let donePage = function() {
    body.dataset.page = "done";
    console.log(`Page state is now ${body.dataset.page}`);
    changeText(title, "All done!");
    changeText(subheading, `Your Score is ${score}`);
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
    submitButton.addEventListener("click", function(event) {
        event.preventDefault();
        let newScore = {
            initials : initials.value,
            score : score
        };
        highScoreTally = [];
        highScoreTally = JSON.parse(localStorage.getItem("allHighScores")) || [];
        highScoreTally.push(newScore);
        console.log(highScoreTally);      
        localStorage.setItem("allHighScores", JSON.stringify(highScoreTally));
        highScoresPage();
    });
};

// Load loser page
let loserPage = function() {
    body.dataset.page = "loser";
    console.log(`Page state is now ${body.dataset.page}`);
    changeText(title, "You ran out of time!");
    changeText(subheading, "Would you like to play again?");
    changeText(startButton, "Play again");
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

// Listen for click on answers
answer1.addEventListener("click", function() {
    console.log(questions[quizPageCounter].correct[0]);
    if (questions[quizPageCounter].correct[0] == "right") {
        answerWrong = false;        
    } else {
        answerWrong = true;
    };
    quizChoice();
});
answer2.addEventListener("click", function() {
    console.log(questions[quizPageCounter].correct[1]);
    if (questions[quizPageCounter].correct[1] == "right") {
        answerWrong = false;        
    } else {
        answerWrong = true;
    };
    quizChoice();
});
answer3.addEventListener("click", function() {
    console.log(questions[quizPageCounter].correct[2]);
    if (questions[quizPageCounter].correct[2] == "right") {
        answerWrong = false;        
    } else {
        answerWrong = true;
    };
    console.log(answerWrong);
    quizChoice();
});
answer4.addEventListener("click", function() {
    console.log(questions[quizPageCounter].correct[3]);
    if (questions[quizPageCounter].correct[3] == "right") {
        answerWrong = false;        
    } else {
        answerWrong = true;
    };
    quizChoice();
});



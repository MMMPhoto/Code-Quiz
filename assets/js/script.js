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
let answer = document.getElementById("answer");
let quizPageCounter;
let answerWrong;
let score;
let highScoreTally = []; 
localStorage.setItem("allHighScores", JSON.stringify(highScoreTally));
let submitButton = document.getElementById("submit");
let scoresTable;
let newHTML;

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
let changeText = function(element, newText) {
    element.textContent = newText;
};
let hideElement = function(element) {
    element.dataset.state = "hidden";
    element.style.display = "none";
    // console.log(`${element.id} is now ${element.dataset.state}`);
};
let revealElement = function(element) {
    element.dataset.state = "visible";
    element.style.display = "inline";
    // console.log(`${element.id} is now ${element.dataset.state}`);
};
// Hide multiple elements
let hideMany = function(hideArray) {
    for (i = 0; i < hideArray.length; i++) {
        hideElement(hideArray[i]);
    } 
}
// Reveal multiple elements
let revealMany = function(revealArray) {
    for (i = 0; i < revealArray.length; i++) {
        revealElement(revealArray[i]);
    } 
}

// Load start page
let startPage = function() {
    body.dataset.page = "start";
    console.log(`Page state is now ${body.dataset.page}`);
    changeText(title, "Coding Quiz Challenge!");
    changeText(startButton, "Start");
    changeText(timer, "Time: 1:00");
    changeText(subheading, "Welcome to the Coding Quiz! Try to answer the questions to test your coding knowledge. But beware! There is a timer, and you must finish before the time expires. Answer a question wrong, and you lose time. Run out of time, and you lose! Are you ready?");
    var hideArray = [scoreboard, goBackButton, clearScores, answerContainer];
    hideMany(hideArray);
    var revealArray = [highScores, timer, subheading, startButton];
    revealMany(revealArray);
};

// Show scoreboard
let highScoresPage = function() {
    body.dataset.page = "high-scores";
    console.log(`Page state is now ${body.dataset.page}`);
    changeText(title, "High Scores");
    var hideArray = [highScores, timer, subheading, startButton, answerContainer, enterScore];
    hideMany(hideArray);
    var revealArray = [scoreboard, goBackButton, clearScores];
    revealMany(revealArray);

    // Pull high scores from local storage
    displayScores();
    function displayScores() {
        highScoreTally = []; 
        highScoreTally = JSON.parse(localStorage.getItem("allHighScores")) || [];
        console.log(highScoreTally);
        var table = document.createElement('table'), tr, td;
        for (i = 0; i < highScoreTally.length; i++) {
            tr = document.createElement('tr');
            for (j = 0; j < 1; j++) {
                td = document.createElement('td');
                tr.appendChild(td);
                td.innerHTML = "<td>" + highScoreTally[i].initials + "</td><td>" + highScoreTally[i].score + "</td>";
            }
            table.appendChild(tr);
        }
        document.getElementById('scoreboard').appendChild(table);
    };
};

// Load first quiz page
let quizStart = function() {
    body.dataset.page = "quiz";
    console.log(`Page state is now ${body.dataset.page}`);
    quizPageCounter = 0;
    var hideArray = [subheading, startButton];
    hideMany(hideArray);
    var revealArray = [highScores, timer, answerContainer];
    revealMany(revealArray);
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
    var hideArray = [scoreboard, goBackButton, clearScores, answerContainer, highScores, timer, startButton];
    hideMany(hideArray);
    var revealArray = [subheading, enterScore];
    revealMany(revealArray);
    submitButton.addEventListener("click", function(event) {
        event.preventDefault();
        console.log(`submit button disabled: ${submitButton.disabled}`);
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
    var hideArray = [scoreboard, goBackButton, clearScores, answerContainer, highScores, timer, enterScore];
    hideMany(hideArray);
    var revealArray = [startButton, subheading];
    revealMany(revealArray);
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
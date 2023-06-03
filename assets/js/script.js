let container = document.getElementById("quiz-card");
let timerText = document.createElement("p");
let instructionText = document.getElementById("instructions");
container.appendChild(timerText);

let startButton = document.createElement("button");
let questionEl = document.createElement("h2");
let correctText = document.createElement("h3");
let score;
let timerCount = 60;

let buttons = [];
let finalScore;
let highscoreButton = document.getElementById("highscore");
let questions = [
    {
        question: "Array elements indices start at:",
        answers: ["1", "10", "0", "100"],
        correctAnswer: "0"
    },
    {
        question: "The following can be booleans:",
        answers: ["true", "wrong", "corret", "none"],
        correctAnswer: "true"
    },
    {
        question: "Anything following // will be a:",
        answers: ["function", "object", "comment", "expression"],
        correctAnswer: "comment"
    },
    {
        question: "Math.random() returns a random number between:s",
        answers: ["0 and 1", "1 and 10", "-1 and 1", "1 and 100"],
        correctAnswer: "0 and 1"
    },
    
];

init();

function init() {
    score = 0;
    timerCount = 60;
    questionEl.remove();
    container.appendChild(instructionText);
    startButton.textContent = "Start"; 
    container.appendChild(startButton); 
}
function showScores() {
    let scores = JSON.parse(localStorage.getItem("scores")) || [];
    scores.sort(function (a, b) {
        return b.score - a.score;
    });
    let scoreBoard = document.createElement("ul");
    for (let i = 0; i < scores.length; i++) {
        let userScore = document.createElement("li");
        userScore.textContent = scores[i].initials + "highest score: " + scores[i].score;
        scoreBoard.appendChild(userScore);
    }
    container.appendChild(scoreBoard);
    let backButton = document.createElement("button");
    backButton.textContent = "Back";
    scoreBoard.appendChild(backButton);
    backButton.addEventListener("click", function () {
        init();
        scoreBoard.remove();
        backButton.remove();
        container.appendChild(highscoreButton);
    });
}

highscoreButton.addEventListener("click", function () {
    showScores();
    highscoreButton.remove();
    questionEl.remove();
    instructionText.remove();
    hideAll();
});

function getCurrentQuestion() {
   
    questionEl.textContent = questions[score].question;

    container.appendChild(questionEl);
}

function startGame() {

    for (let i = 0; i < questions[score].answers.length; i++) {
        let answerButton = document.createElement("button");
        answerButton.textContent = questions[score].answers[i];
        container.appendChild(answerButton);

      
        buttons.push(answerButton);

        answerButton.addEventListener("click", function () {
            if (score > (questions.length - 2)) {
                winGame();
            }

            if (answerButton.textContent === questions[score].correctAnswer) {
                score++;
                for (let i = 0; i < buttons.length; i++) {
                    buttons[i].remove();
                }
                timerCount += 5;
                container.appendChild(correctText);
                correctText.textContent = "";
                getCurrentQuestion();
                startGame();
            }
            
            else {
                timerCount -= 5;
                correctText.textContent = "Wrong answer";
                container.appendChild(correctText);
            }
        });
    }
}

function startTimer() {
    timerInterval = setInterval(function () {
        if (timerCount > 0) {
            timerCount--;
            timerText.textContent = timerCount + " seconds left";
        }
        else {
            loseGame();
        }
    }, 1000);
}

function winGame() {
    clearInterval(timerInterval);
    finalScore = score + timerCount;
    questionEl.textContent = "You win! Your score is " + finalScore;
    hideAll();
    submitScore(finalScore);
}

function loseGame() {
    clearInterval(timerInterval);
    questionEl.textContent = "Sorry you ran out of time. Your score is " + score;
    hideAll();
    submitScore(score);
}

function hideAll() {
    startButton.remove();
    correctText.remove();
    timerText.remove();
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.display = "none";
    }
}

function submitScore(finalScore) {
    let nameField = document.createElement("input");
    nameField.setAttribute("type", "text");
    nameField.setAttribute("placeholder", "Input your initials");
    container.appendChild(nameField);

    let submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.setAttribute("id", "submit");
    container.appendChild(submitButton);

    submitButton.addEventListener("click", function () {
        let initials = nameField.value;
        
        let data = { score: finalScore, initials: initials };
      
        let scores = JSON.parse(localStorage.getItem("scores")) || [];
       
        scores.push(data);

        localStorage.setItem("scores", JSON.stringify(scores));
        submitButton.remove();
        nameField.remove();
        init();
        container.appendChild(highscoreButton);

    });
}

startButton.addEventListener("click", function startQuiz() {
    startButton.remove(); 
    getCurrentQuestion();
    startGame();
    startTimer();
    highscoreButton.remove();
});
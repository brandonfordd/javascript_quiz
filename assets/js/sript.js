//event listeners
let startBtn = $("#startBtn")
const leaderboardBtn = $("#leaderboardBtn")
let questionsEl = $("#questions");
let buttonA = $("#a");
let buttonB = $("#b");
let buttonC = $("#c");
let buttonD = $("#d");
const restartBtn = $("#restartBtn")
const restartBtnL = $("#restartBtnL")

let submitBtn = $("#submitScore")

//Global variables
let cardStarter = $("#card-starter")
let score = 0;
let cardQuiz = $("#cardQuiz")
let cardEnd = $("#cardEnd")
let scoreEl = $("#scorePh")
let lengthEl = $("#lengthPh")
let leaderboardEl = $("#leaderboardList")
let cardLeaderboard = $("#cardLeaderboard")
let quizTimer = $("#timer")
let timerInterval;
let timeLeft = 60;
let scoreInputName = document.getElementsByName("initials")[0];


//my question in a array
let quizQuestions = [{
    question: "How many elements can you apply an 'ID' attribute to?",
    choiceA: "As many as you want",
    choiceB: "3",
    choiceC: "1",
    choiceD: "128",
    correctAnswer: "c"},
  {
    question: "What does DOM stand for?",
    choiceA: "Document Object Model",
    choiceB: "Display Object Management",
    choiceC: "Digital Ordinance Model",
    choiceD: "Desktop Oriented Mode",
    correctAnswer: "a"},
   {
    question: "What is used primarily to add styling to a web page?",
    choiceA: "HTML",
    choiceB: "CSS",
    choiceC: "Python",
    choiceD: "React.js",
    correctAnswer: "b"},
    {
    question: "What HTML tags are JavaScript code wrapped in?",
    choiceA: "&lt;div&gt;",
    choiceB: "&lt;link&gt;",
    choiceC: "&lt;head&gt;",
    choiceD: "&lt;script&gt;",
    correctAnswer: "d"},
    {
    question: "When is localStorage data cleared?",
    choiceA: "No expiration time",
    choiceB: "On page reload",
    choiceC: "On browser close",
    choiceD: "On computer restart",
    correctAnswer: "a"},  
    {
    question: "What does WWW stand for?",
    choiceA: "Web World Workings",
    choiceB: "Weak Winter Wind",
    choiceC: "World Wide Web",
    choiceD: "Wendy Wants Waffles",
    correctAnswer: "c"},
    {
    question: "What HTML attribute references an external JavaScript file?",
    choiceA: "href",
    choiceB: "src",
    choiceC: "class",
    choiceD: "index",
    correctAnswer: "b"},
];
//Global var for questions above
let lastQuestionIndex = quizQuestions.length;
let currentQuestionIndex = 0;


//       functions-

//function to show score at end
function showScore() {
    scoreEl.text(`${score}`)
    lengthEl.text(`${quizQuestions.length}`)
    return
}

//sumbit score function
function submitScore() {
    if (scoreInputName.value == "") {
        alert("Initials must not be blank");
        return false;
    } else {
        let nameString = scoreInputName.value;
        leaderboardEl.append(`<ol>${nameString} ${score} out of ${quizQuestions.length}<ol>`)
        showScore();
        alert("Congrats! Your score has been saved, restart to try again!")
    }
}

//Show end card function
function showEndCard() {
    cardQuiz.attr("class", "card-quiz-hidden");
    cardEnd.attr("class", "card-end");

    showScore();
    return
}

//function for grabbing random question and answers from object
function generateQuizQuestion() {
    if (currentQuestionIndex === lastQuestionIndex) {
        return showEndCard();
    } else {
        let currentQuestion = quizQuestions[currentQuestionIndex]
        questionsEl.text(currentQuestion.question);
        buttonA.text(currentQuestion.choiceA)
        buttonB.text(currentQuestion.choiceB)
        buttonC.text(currentQuestion.choiceC)
        buttonD.text(currentQuestion.choiceD)
    }
}

//The quiz function 
function myQuiz() {
    generateQuizQuestion();

    //timer
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.text("Time left: " + timeLeft);
    
        if(timeLeft < 0) {
            alert("Oops! Time is up:(");
            clearInterval(timerInterval);
            showEndCard();
        }
    }, 1000);
}

//Decrement by 10 secs for wrong answer
function decrementHandler() {
    let decrementTime = timeLeft - 10;
    timeLeft = decrementTime;
    return
}

// This function checks the response to each answer 
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== lastQuestionIndex){
        score++;
        alert("That Is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is correct.
    }else if (answer !== correct && currentQuestionIndex !== lastQuestionIndex){
        alert("That Is Incorrect. 10 seconds have been lost.")
        decrementHandler();
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is wrong.
    }else{
        return
    }
}


//function for leaderboard on starter screen
leaderboardBtn.on("click", function() {
    if (cardStarter.attr("class", "card-starter")) {
        cardStarter.attr("class", "card-starter-hidden");
        cardLeaderboard.attr("class", "card-leaderboard");
    } else {
        return 
    }
})

//function to start game on click of startBtn
startBtn.on("click", function() {
    cardQuiz.attr("class", "card-quiz");
    cardStarter.attr("class", "card-starter-hidden");
   myQuiz();
   return
})


//event listener for restart on leaderboard
restartBtnL.on("click", function(){
    cardLeaderboard.attr("class", "card-leaderboard-hidden");
    cardStarter.attr("class", "card-starter");
})

//event listener for restart
restartBtn.on("click", function(){
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 60;
    clearInterval(timerInterval);
    cardEnd.attr("class", "card-end-hidden");
    cardStarter.attr("class", "card-starter");  
})

submitBtn.on("click", function(){
    submitScore();
})

//function to show score on leader board 
// function leaderboardHandler() {
    // let inputEl = 
    
// }
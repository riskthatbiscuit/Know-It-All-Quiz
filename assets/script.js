// Setting initial arrays for Trivia questions
const category = ["General Knowledge", "Mythology", "Animals"]
const categoryRef = [9, 20, 27]
const difficulty = ["Easy", "Medium", "Hard"]
const difficultyRef = ["easy", "medium", "hard"]
const type = ["Multiple Choice", "T/F"]
const typeRef = ["multiple", "boolean"]
const NoQ = ["5", "6", "7", "8", "9", "10"]

// Defining new arrays with Trivia questions for display & answers for URL generation
const lists = [category, difficulty, type, NoQ];
const listsRef = [categoryRef, difficultyRef, typeRef, NoQ];
const ansInput = []
const ansCorrect = []

// Assigning names to existing HTML elements
const playButton = document.querySelector("#Play");
const displayHighScore = document.querySelector("#HighScore");
const displayGuidance = document.querySelector("#home h2");
const home2 = document.querySelector("#home2");
const home3 = document.querySelector("#home3");

// Set highscores local storage
let highScores = JSON.parse(localStorage.getItem("highscores")) || [];

// --- SECTION 1 -------------------------------------------------------------------
// SCREEN CHANGES
function firstChange() {
    // Change instructions * hide the two initial buttons of Play & High Score
    displayGuidance.textContent = "Selection options for quiz";
    playButton.style.display = "none";
    displayHighScore.style.display = "none";

    // Create a new button for Starting the quiz
    const startButton = document.createElement("button");
    startButton.id = "start"
    startButton.textContent = "Start the Quiz!";
    home3.appendChild(startButton);
}

function secondChange() {
    const startButton = document.querySelector("#start");
    displayGuidance.textContent = "";
    home2.style.display = "none";
    startButton.style.display = "none";
}

function createSubmit() {
    const submitButton = document.createElement("button");
    submitButton.id = "submit"
    submitButton.textContent = "Submit your answers!";
    submitButton.addEventListener("click", submit)
    home3.appendChild(submitButton);
}

function resetPage() {
    const startButton = document.querySelector("#start");
    const submitButton = document.querySelector("#submit")
    displayGuidance.textContent = "Ready?";
    home2.style.display = "block";
    
    for (i = 0; i < ansCorrect.length; i++) {
        const question = document.querySelector("questionCard");
        question.remove();
    }

    for (i = 0; i < lists.length; i++) {
        const dropdowns = document.querySelector("p");
        dropdowns.remove();
    }
    startButton.remove();
    submitButton.remove();
    playButton.style.display = "block";
    displayHighScore.style.display = "block";
}

// --- SECTION 2 -------------------------------------------------------------------
// Launching the Trivia selections

playButton.addEventListener("click", function () {
    // For each of the categories contained in [lists] loop through to create a dropdown menu
    for (j = 0; j < lists.length; j++) {
        var select1 = document.createElement("select");
        for (var i = 0; i < lists[j].length; i++) {
            var option = document.createElement("option");
            option.value = (j + 1) * 100 + i;
            option.text = lists[j][i];
            select1.appendChild(option);
        }

        var button1 = document.createElement("p");
        button1.appendChild(select1);
        home2.appendChild(button1);
    }

    firstChange()
    const selections = []
    
    // Creating an eventlistener function for the Start the Quiz button to store selected values
    const startButton = document.querySelector("#start");
    startButton.addEventListener("click", function () {
        for (j = 0; j < lists.length; j++) {
            const selectedOption = document.querySelectorAll('select')[j].options[document.querySelectorAll('select')[j].selectedIndex];
            const selectedValue = selectedOption.text;
            const selectedRef = lists[j].indexOf(selectedValue);
            selections.push(listsRef[j][selectedRef])
        }
        console.log(selections);
        secondChange();
        getQs(selections);
        createSubmit();
    });

});

// --- SECTION 3 -------------------------------------------------------------------
// Get questions from API & create cards

// Generate URL from selections and pull data into pulledData
function getQs(selections) {
    const dynamicURL = "https://opentdb.com/api.php?amount=" + selections[3]
        + "&category=" + selections[0] +
        "&difficulty=" + selections[1] + "&type=" + selections[2]

    console.log(dynamicURL);

    fetch(dynamicURL)
        .then(function (response) {
            return response.json()
        })
        .then(function (jsonData) {
            const pulledData = jsonData;
            console.log(pulledData)
            generateQs(pulledData)
        })

}

// Generate cards from the pulled Questions
function generateQs(pulledData) {
    var results = pulledData.results;
    for (var k = 0; k < results.length; k++) {
        // Looping through each question and creating a question card
        ansCorrect[k] = results[k].correct_answer;
        console.log(results[k]);
        var questionBox = document.createElement("questionCard");
        // var questionCat = document.createElement("Category");
        var questionQn = document.createElement("p");
        var answerOptions = document.createElement("ul");

        // questionCat.textContent= results[k].category;        
        questionQn.textContent = results[k].question;
        document.getElementById("container").appendChild(questionBox);
        // questionBox.appendChild(questionCat);
        questionBox.appendChild(questionQn);
        questionBox.appendChild(answerOptions);

        // Creating list of answers available for each question
        if (results[k].type === "boolean") {
            answersAvail = ["True", "False"];
        } else {
            answersAvail = results[k].incorrect_answers;
            answersAvail.splice(Math.floor(Math.random() * answersAvail.length), 0, results[k].correct_answer);
        }
        ansInput[k] = "";

        // Iterating through each answer, appending to card & creating an event listenter
        for (i = 0; i < answersAvail.length; i++) {
            const booleanButton = document.createElement("Button");
            const Qnref = k;
            const ansSelected = answersAvail[i];
            booleanButton.className = "ansOptions"
            booleanButton.textContent = ansSelected;
            booleanButton.addEventListener("click", function () {
                if (ansInput[Qnref] !== "") {
                    booleanButton.className = "ansOptions";
                    // ansInput[Qnref] = "";
                    // TODO NEED TO ADD IN A CONTROL SO THAT ONLY ONE CAN BE SELECTED
                } else {
                    booleanButton.className = "ansOptions selected"
                    ansInput[Qnref] = ansSelected;
                }
                console.log(ansInput[Qnref])
            })
            answerOptions.appendChild(booleanButton);
        }
    }
}

// --- SECTION 3 -------------------------------------------------------------------
// Get results & reset page & set Highscore

// Click event
function submit() {
    // Calculating the results of the quiz
    scoreCalc = 0;
    for (i = 0; i < ansCorrect.length; i++) {
        if (ansInput[i] == ansCorrect[i]) {
            scoreCalc += 1;
        }
    }
    
    const scorePerc = scoreCalc / ansCorrect.length * 100;
    
    // Providing feedback to the user
    // TODO THIS IS WHERE THE SECOND API SHOULD COME INTO CODE
    const initials = prompt('Congratulations you got ' + scoreCalc + ' answers out of ' + ansCorrect.length + '. That is ' + scorePerc + '%. Enter your initials for a High Score')
    const newScore = { initials, scorePerc };
    highScores.push(newScore);
    highScores.sort((a, b) => b.scorePerc - a.scorePerc);
    highScores = highScores.slice(0, 5);
    localStorage.setItem("highscores", JSON.stringify(highScores));
    resetPage();
    // getComs();
    operationComs();
}

// --- SECTION 4 ---
// Highscores
displayHighScore.addEventListener("click", showHighScores);

function showHighScores() {
    let highScores = JSON.parse(localStorage.getItem("highscores")) || [];
    let message = "Top 5 High Scores:\n";
    highScores.forEach((scorePerc, index) => {
        message += `${index + 1}. ${scorePerc.initials}: ${scorePerc.scorePerc}% \n`;
    });
    alert(message);
}

// --- SECTION 5 ---
// Second API

function operationComs() {


    scoreCalc = 0;
    for (i = 0; i < ansCorrect.length; i++) {
        if (ansInput[i] == ansCorrect[i]) {
            scoreCalc += 1;
        }
    }

    const scorePerc = scoreCalc / ansCorrect.length * 100

    if (scorePerc < 50) {
        prompt(negativeData)
        console.log(negativeData)
    }
    else {
        prompt(positiveData)
        console.log(positiveData)
    }
    const supportURL = "https://www.foaas.com/operations";

    fetch(supportURL)
        .then(function (response) {
            return response.json()
        })
        .then(function (jsonData) {
            const pulledData = jsonData;
            console.log(pulledData)
        })
}
// --- SECTION 6 ---
// Specified commands pulled from API's listed options (One positive comment; One negative comment)
// Command resides in URL for fetch request listed
    const commentPos = "https://www.foaas.com/legend/Johnny/us"
    let positiveData;
    let negativeData;

    fetch(commentPos, {
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(function (response) {
            return response.text()
        })
        .then(function (jsonData) {
            var parser = new DOMParser()
            parsedData = parser.parseFromString(jsonData, "text/html")
            positiveData = parsedData.body.children[0].children[0].children[0].children[0].innerText;
            console.log(positiveData)
        })
// Command resides in URL for fetch request listed
    const commentNeg = "https://www.foaas.com/ridiculous/us"
    
    fetch(commentNeg, {
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(function (response) {
            return response.text()
        })
        .then(function (jsonData) {
            var parser = new DOMParser()
            parsedData = parser.parseFromString(jsonData, "text/html")
            negativeData = parsedData.body.children[0].children[0].children[0].children[0].innerText;
            console.log(negativeData)
        })
// Setting initial arrays for Trivia questions
const category = ["General Knowledge", "Mythology", "Animals"]
const categoryRef = [9,20,27]
const difficulty = ["Easy", "Medium", "Mard"]
const difficultyRef = ["easy", "medium", "hard"]
const type = ["Multiple Choice", "T/F"]
const typeRef = ["multiple","boolean"]
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

// --- SECTION 1 ----
// Launching the Trivia selections

playButton.addEventListener("click", function() {
    // For each of the categories contained in [lists] loop through to create a dropdown menu
    for (j=0; j < lists.length; j++) {
        var select1 = document.createElement("select");
        for (var i = 0; i < lists[j].length; i++) {
            var option = document.createElement("option");
            option.value = (j+1)*100 + i;
            option.text = lists[j][i];
            select1.appendChild(option);
        }

        var button1 = document.createElement("p");
        button1.appendChild(select1);
        home2.appendChild(button1);
    }

    // Change instructtions * hide the two initial buttons of Play & High Score
    displayGuidance.textContent = "Selection options for quiz";
    playButton.style.display = "none";
    displayHighScore.style.display = "none";

    // Create a new button for Starting the quiz
    var startButton = document.createElement("button");
    startButton.id = "start"
    startButton.textContent = "Start the Quiz!";
    home3.appendChild(startButton);

    const selections = []

    // Creating an eventlistener function for the Start the Quiz button to store selected values
    startButton.addEventListener("click", function() {
        for (j=0; j < lists.length; j++) { 
            const selectedOption = document.querySelectorAll('select')[j].options[document.querySelectorAll('select')[j].selectedIndex];
            const selectedValue = selectedOption.text;
            const selectedRef = lists[j].indexOf(selectedValue);
            selections.push(listsRef[j][selectedRef])
        }
        console.log(selections);
        hideOptions();
        getQs(selections);
        createSubmit ();
    });

});

// --- SECTION 2 ---
// Get questions from API & create cards
// Hide previous dropdowns & text
function hideOptions() {
    const startButton = document.querySelector("#start");
    displayGuidance.textContent = "";
    home2.style.display = "none";
    startButton.style.display = "none";
}

// Generate URL from selections and pull data into pulledData
function getQs (selections) {
    const dynamicURL = "https://opentdb.com/api.php?amount=" + selections[3] 
    + "&category=" + selections[0] +
    "&difficulty=" + selections[1] + "&type=" + selections[2]

    console.log(dynamicURL);

    fetch(dynamicURL)
        .then(function (response) {
            return response.json()
        })
        .then(function(jsonData) {
            const pulledData = jsonData;
            console.log(pulledData)
            generateQs(pulledData)
        })

}

// Generate cards from the pulled Questions
function generateQs(pulledData) {
    var results = pulledData.results;
    for (var k = 0; k < results.length; k++) {
        ansCorrect[k] = results[k].correct_answer;
        console.log(results[k]);
        var questionBox = document.createElement("questionCard");
        var questionCat = document.createElement("Category");
        var questionQn = document.createElement("p");
        var answerOptions = document.createElement("ul");

        questionCat.textContent= results[k].category;        
        questionQn.textContent= results[k].question;
        document.getElementById("container").appendChild(questionBox);
        questionBox.appendChild(questionCat);
        questionBox.appendChild(questionQn);
        questionBox.appendChild(answerOptions);

        if (results[k].type === "boolean") {
            answersAvail = ["True","False"];
        } else {
            answersAvail = results[k].incorrect_answers;
            answersAvail.splice(Math.floor(Math.random()*answersAvail.length),0,results[k].correct_answer);
        }
        
        for (i = 0; i < answersAvail.length; i++) {
            const booleanButton = document.createElement("Button");
            const Qnref = k;
            const ansSelected = answersAvail[i];
            booleanButton.className = "ansOptions"
            booleanButton.textContent = ansSelected;
            booleanButton.addEventListener("click", function() {
                if (booleanButton.className === "ansOptions selected") {
                    booleanButton.className = "ansOptions"
                } else {
                    booleanButton.className = "ansOptions selected"
                    ansInput[Qnref] = ansSelected;
                }
            })
            answerOptions.appendChild(booleanButton);
        }
    }

}

// --- SECTION 3 ---
// Get results

// Create button 
function createSubmit () {
    var submitButton = document.createElement("button");
    submitButton.id = "submit"
    submitButton.textContent = "Submit your answers!";
    home3.appendChild(submitButton);
    submitButton.addEventListener("click", submit)
}
// Click event
function submit() {
    console.log(ansInput);
    console.log(ansCorrect);

}
// Check that each one is selected once each
// Compare to answers creating a score
// Display score
// Leave section for second API

// Create High-score count


// --- SECTION 4 ---
// Show main page



// List

// - Take user input to create quiz object
// create start function
    // create defined variables to push to the API


// - Create object with responses from FOAAS


// - Create score object = 0 [local storage]


// - Create Loop


// --- Display question from Quiz API


// --- Recieve answer


// --- Display Text from FOAAS object (random, although based on true/false)


// --- Add to score


// - End quiz (final score, high-scores, final response)

// NICE TO HAVES
// Add Timer

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
    });

});

// --- SECTION 2 ---
// Get questions from API & create cards
function hideOptions() {
    displayGuidance.textContent = "";
    home2.style.display = "none";
    home3.style.display = "none";
}

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

function generateQs(pulledData) {
    var results = pulledData.results;
    console.log(results)
    for (var k = 0; k < results.length; k++) {
        console.log(results[k]);
        var questionBox = document.createElement("questionCard");
        var questionCat = document.createElement("p");
        var questionQn = document.createElement("p");

        questionCat.textContent= results[k].category;        
        questionQn.textContent= results[k].question;
        // questionBox.appendChild(results[k]);
        document.getElementById("container").appendChild(questionBox);
        questionBox.appendChild(questionCat);
        questionBox.appendChild(questionQn);
    }
}


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

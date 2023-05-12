const category = ["General Knowledge", "Mythology", "Animals"]
const categoryRef = [1,20,20]
const difficulty = ["easy", "medium", "hard"]
const type = ["Multiple Choice", "T/F"]
const NoQ = ["5", "6", "7", "8", "9", "10"]


var playButton = document.querySelector("#Play");
var displayHighScore = document.querySelector("#HighScore");
var displayPlay = document.querySelector("#Play");

// Added arrays for further calling/ usage in functions

// - Render initial launch page & quiz options for user
// Create options for users to select from. Dropdown menus based on arrays. 

const lists = [category, difficulty, type, NoQ];

playButton.addEventListener("click", function() {
    
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
        document.getElementById("container").appendChild(button1);

    }

    displayPlay.style.display = "none";
    displayHighScore.style.display = "none";

    var startButton = document.createElement("button");
    startButton.textContent = "Start the Quiz!";
    document.getElementById("container").appendChild(startButton);

    const selections = []

    startButton.addEventListener("click", function() {
        for (j=0; j < lists.length; j++) { 
            var selectedOption = document.querySelectorAll('select')[j].options[document.querySelectorAll('select')[j].selectedIndex];
            var selectedValue = selectedOption.text;
            selections.push(selectedValue)
        }
        console.log(selections)
        generateQs(selections)
    });

});


function generateQs (selections) {
const apiURL = "https://opentdb.com/api.php?amount=25&category=9&difficulty=medium&type=boolean"

// const https:"//opentdb.com/api.php?amount=5&category=9&difficulty=Easy&type=boolean"

const dynamicURL = "https://opentdb.com/api.php?amount=" + selections[3] 
+ "&category=" + 20 +
"&difficulty=" + selections[1] + "&type=boolean"

console.log(dynamicURL);

fetch(dynamicURL)
    .then(function (response) {
        return response.json()
    })
    .then(function(jsonData) {
        console.log(jsonData)
    })

    
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

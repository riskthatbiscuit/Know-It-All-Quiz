const apiURL = "https://opentdb.com/api.php?amount=25&category=9&difficulty=medium&type=boolean"

// const dynamicURL = "https://opentdb.com/api.php?amount=" + WHATEVERNUMBERTHEUSERCHOSE 
// + "&category=" + WHATEVERCATEGORYCODETHEUSERCHOSE +
// "&difficulty=" + WHATEVERDIFFICULTYTHEUSERCHOSE 

fetch(apiURL)
    .then(function (response) {
        return response.json()
    })
    .then(function(jsonData) {
        console.log(jsonData)
    })

// const category = ["General Knowledge", "Mythology", "Animals"]
// const difficulty = ["Easy", "Medium", "Hard"]
// const type = ["Multiple Choice", "T/F"]
// const NoQ = ["5", "6", "7", "8", "9", "10"]

// var selection = {
// category: "General Knowledge",
// difficulty: "Easy",
// type: true,
// NoQ: "5"

// }

// Added arrays for further calling/ usage in functions

// Render initial launch page & quiz options for user

// - Take user input to create quiz object

// - Create object with responses from FOAAS

// - Create score object = 0 [local storage]

// - Create Loop

// --- Display question from Quiz API

// --- Recieve answer

// --- Display Text from FOAAS object (random, although based on true/false)

// --- Add to score

// - End quiz (final score, high-scores, final response)

// localStorage = score records/highscore display
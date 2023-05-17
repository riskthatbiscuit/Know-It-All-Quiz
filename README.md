# Know-It-All Quiz

Welcome to Know-It-All Quiz! 🎉🧠 This is a trivia game where you can test your knowledge in various categories and difficulties. The game provides multiple-choice and true/false questions for you to answer. Keep track of your high scores and challenge yourself to improve! 🏆

## Getting Started 🚀

To run the game, open the `index.html` file in your web browser. Make sure you have a stable internet connection for fetching trivia questions from the API.

## Gameplay Instructions 📚

1. On the main screen, you will find two buttons: "Play" ▶️ and "High Score" 🏆.
   - Clicking the "Play" button will take you to the selection options for the quiz.
   - The "High Score" button will display the top 5 high scores achieved by players.

2. Selection Options:
   - You will be presented with dropdown menus for selecting the category, difficulty, type, and the number of questions.
   - Choose your preferences for each category and click the "Start the Quiz!" button.

3. Answering Questions:
   - Once the quiz starts, you will see a series of questions related to your selected preferences.
   - For multiple-choice questions, select the correct answer from the provided options.
   - For true/false questions, click on either the "True" or "False" button.

4. Submitting Answers and Scoring:
   - After answering all the questions, click the "Submit your answers!" button.
   - The game will calculate your score based on the number of correct answers.
   - You will receive feedback on your performance and the percentage of questions answered correctly.

5. High Scores:
   - To view the top 5 high scores, click the "High Score" button on the main screen.
   - The high scores are displayed along with the players' initials and the percentage of correct answers.

## Code Structure

The code contains several sections that perform different functions:

- **Section 1**: Contains functions for screen changes during the game, such as hiding buttons, displaying instructions, and creating new buttons.
- **Section 2**: Handles the process of launching the trivia selections by creating dropdown menus based on predefined arrays.
- **Section 3**: Fetches trivia questions from an API based on the user's selections and generates question cards for display.
- **Section 4**: Handles the submission of answers, calculates the score, stores high scores, and resets the game.
- **Section 5**: Displays the top 5 high scores achieved by players.
- **Section 6**: Fetches comments from external APIs to provide positive and negative feedback based on the user's score.

## APIs Used
The code uses two APIs:

- ** https://opentdb.com/api_config.php - Open Trivia Database
- ** https://www.foaas.com/ - Fuck Off As A Service


## Technologies Used

The Know-It-All Quiz is built using HTML, CSS, and JavaScript. It utilizes the following technologies and concepts:

- **Fetch API**: Retrieves trivia questions from an external API.
- **DOM manipulation**: Dynamically creates and modifies HTML elements.
- **Local storage**: Stores and retrieves high scores using the browser's local storage.
- **Event listeners**: Listens for button clicks and triggers corresponding actions.
- **JSON parsing**: Extracts data from JSON responses received from APIs.

## Contributions

Contributions to the Know-It-All Quiz project are welcome! If you find any issues or have ideas for improvements, please feel free to open an issue or submit a pull request on the project's GitHub repository.

Enjoy the quiz and have fun testing your knowledge! 🌟🔥
var highScoresList = document.getElementById ("highScoresList");
var highScore = JSON.parse(localStorage.getItem("highScore")) || [];

function displayHighScores() {
    var highScoresList = document.getElementById("highScoresList");
    highScoresList.innerHTML = ""; // Clear the existing content

    highScore.forEach(quizScore => { // create list items
        var listItem = document.createElement("li");
        listItem.classList.add("highestScores");
        listItem.textContent = `${quizScore.name}-${quizScore.score}`;
        highScoresList.appendChild(listItem);
    });
}

displayHighScores();


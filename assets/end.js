var username = document.getElementById("username");
var saveScoreButton = document.getElementById("save");
var finalScore = document.getElementById("finalScore");
var recentScore = localStorage.getItem("recentScore");

var highScore = JSON.parse(localStorage.getItem("highScore")) || [];

const maxHighScores = 5;
finalScore.innerText = recentScore;

username.addEventListener("keydown", function (event) {
    saveScoreButton.disabled = !username.value.trim();
});

function saveScore(event) {
    event.preventDefault();

    var quizScore = {
        score: recentScore,
        name: username.value
    };

    highScore.push(quizScore);

    highScore.sort((a, b) => {
        return b.score - a.score;
    });

    highScore.splice(5); // only 5 persons on the list

    localStorage.setItem("highScore", JSON.stringify(highScore));

    console.log(highScore);
    window.location.href = "./index.html";
}

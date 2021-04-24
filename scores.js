function printHighscores() {
  // same code from logic.js, pulls scores from localstorage or sets to an empty array
  var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

  // sorts highscores from >
  highscores.sort(function(a, b) {
    return b.score - a.score;
  });

  highscores.forEach(function(score) {
    // list tag for high score
    var liTag = document.createElement("li");
    liTag.textContent = score.initials + " - " + score.score;

    // High scores display on the page
    var olEl = document.getElementById("highscores");
    olEl.appendChild(liTag);
  });
}

//removes high scores
function clearHighscores() {
  window.localStorage.removeItem("highscores");
  window.location.reload();
}

document.getElementById("clear").onclick = clearHighscores;

// runs high scores
printHighscores();

// ===============================
// RGB Snake - Game Manager
// Shared logic for Concept + Full
// ===============================

// -------------------------------
// Player System
// -------------------------------

function getPlayerName() {

    let name = sessionStorage.getItem("playerName");

    if (!name || name.trim() === "") {

        name = "Guest_" + Math.floor(Math.random() * 1000);

        sessionStorage.setItem("playerName", name);
    }

    return name;
}

function setPlayerName(name) {

    if (!name || name.trim() === "") {

        name = "Guest_" + Math.floor(Math.random() * 1000);
    }

    sessionStorage.setItem("playerName", name);

    return name;
}

// -------------------------------
// Leaderboard System
// -------------------------------

function saveScore(score) {

    let name = getPlayerName();

    let board = JSON.parse(localStorage.getItem("snakeLeaderboard")) || [];

    board.push({
        name: name,
        score: score,
        date: new Date().toLocaleString()
    });

    // Sort highest score first
    board.sort((a, b) => b.score - a.score);

    // Keep top 10 only
    board = board.slice(0, 10);

    localStorage.setItem("snakeLeaderboard", JSON.stringify(board));
}

function getLeaderboard() {

    return JSON.parse(localStorage.getItem("snakeLeaderboard")) || [];
}

function renderLeaderboard(elementId) {

    let board = getLeaderboard();

    let list = document.getElementById(elementId);

    if (!list) return;

    list.innerHTML = "";

    if (board.length === 0) {

        list.innerHTML = "<li>No scores yet</li>";
        return;
    }

    board.forEach(entry => {

        let li = document.createElement("li");

        li.textContent = `${entry.name} - ${entry.score}`;

        list.appendChild(li);
    });
}

// -------------------------------
// Utility Helpers
// -------------------------------

// optional cheat function (required by assignment vibe)
function cheatMode() {

    console.log("🔥 CHEAT MODE ACTIVATED");

    return {
        addScore: function (currentScore) {
            return currentScore + 50;
        }
    };
}

// -------------------------------
// Browser Info (MAC requirement filler)
// -------------------------------

function loadBrowserInfo() {

    let browser = navigator.userAgent;

    let browserEl = document.getElementById("browser");

    if (browserEl) {
        browserEl.textContent = browser;
    }
}

// -------------------------------
// Date/Time (MAC requirement filler)
// -------------------------------

function loadDateTime() {

    let now = new Date().toLocaleString();

    let dateEl = document.getElementById("dateTime");

    if (dateEl) {
        dateEl.textContent = now;
    }
}

// -------------------------------
// Initialize shared UI (FULL GAME ONLY)
// -------------------------------

window.addEventListener("load", function () {

    // Player name display (works on both pages if element exists)
    let playerEl = document.getElementById("playerName");

    if (playerEl) {
        playerEl.textContent = getPlayerName();
    }

    loadBrowserInfo();
    loadDateTime();

    // leaderboard only exists in full.html
    renderLeaderboard("leaderboard");
});

// -------------------------------
// Start button hook (index.html support)
// -------------------------------

let startBtn = document.getElementById("startBtn");

if (startBtn) {

    startBtn.addEventListener("click", function () {

        let input = document.getElementById("username");

        if (input && input.value) {

            setPlayerName(input.value);

        }

        let greeting = document.getElementById("greeting");

        if (greeting) {

            greeting.textContent = `Welcome, ${getPlayerName()}!`;
        }
    });
}
# bravo-webgame
webgam for my project
    https://github.com/silver-ruins/bravo-webgame/issues/1      

    # RGB Snake
> As the skittle commercials say, "taste the rainbow, be the rainbow!"

## authorship
- SilverRuins + [[silver-ruins]](https://github.com/silver-ruins), 6/29/2026, v1

## user story 
- As a lover of the classic game of snake and a lover of skittles, I felt that someone such as myself shall turn my blood into the liquide caffine to power my will through crafting a beautiful rainbow serphant- eating skittles.

## narrative
go around and feed your snake skittles! as it grows the terrarium gets smaller, make sure he doesn't bump into walls or bite himself.

> Love Snakes? Love skittles? Love Rainbows?
Feed your pet rainbow snake Reggie! You help him maintain his lovely erridecent scales by feeding him skittles, be careful though! He somtimes mistakes himself for one. 

## about the app

### - [game concept ideas](https://github.com/silver-ruins/bravo-webgame/issues/1) 
### - [game wiki](https://github.com/silver-ruins/bravo-webgame.wiki.git)
```
game/
│
├── index.html
├── README.md
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── game.js
│   │   ├── concept.js
│   │   └── full.js
│   └── img/
│
├── pages/
│   ├── concept.html
│   └── full.html
│
├── wiki/
│   └── wireframe.png
```
### Tech & Tools
##### Languages
- HTML5 – Page structure and content
- CSS3 – Styling, animations, and responsive layout
- JavaScript (ES6) – Game logic, event handling, and storage APIs
##### Frameworks & Libraries
- Bootstrap 5 – Responsive layout, cards, navbar, buttons, and modal components
- Bootstrap Icons – Game and interface icons
- jQuery – Included for DOM manipulation and future enhancements (used in the Full version if desired)
##### Web APIs
- Canvas API – Renders the Snake game board and graphics
- localStorage – Saves the leaderboard between browser sessions
- sessionStorage – Stores the current player's name during a session
- DOM API – Updates the score, game status, and user interface dynamically
Development Tools
- Visual Studio Code
    - Live Server
    - IntelliSense
    - Prettier (optional)
    - HTML/CSS/JavaScript language support
- Git
    - Version control
    - Commits and branching
    - GitHub
    - Repository hosting
    - GitHub Pages
    - README documentation
    - Issues
    - Wiki
    - Milestones (Sprint 99)
##### Design & Planning
- GitHub Issues (brainstorming game ideas)
- GitHub Wiki (wireframe)
- Wireframe sketch (hand-drawn or digital)
##### Browser Features
- Keyboard Event Listeners
- Timers (setInterval() / clearInterval())
- Browser detection (navigator.userAgent)
- Date and time (Date object)
##### Validation & Accessibility
- W3C HTML Validator (Nu Validator)
- Google Lighthouse
- Semantic HTML elements (nav, header, section, footer)
- Bootstrap accessibility features
##### AI
- Copilot
- Devin AI
### Code Snidbit: Pause Function
```
function togglePause() {

    if (!paused) {

        clearInterval(gameLoop);

        paused = true;

        document.getElementById("gameStatus").textContent =
            "Paused";

        document.getElementById("pauseBtn").innerHTML =
            '<i class="bi bi-play-fill"></i> Resume';

    } else {

        gameLoop = setInterval(updateGame, speed);

        paused = false;

        document.getElementById("gameStatus").textContent =
            "Game Running";

        document.getElementById("pauseBtn").innerHTML =
            '<i class="bi bi-pause-fill"></i> Pause';

    }

}
```

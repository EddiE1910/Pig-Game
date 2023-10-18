
// Game variables 
var startGame = document.getElementById('startgame');
var gameControl = document.getElementById('gamecontrol');
var gameControl2 = document.getElementById('gamecontrol2');
var game = document.getElementById('game');
var score = document.getElementById('score');
var actionArea = document.getElementById('actions');


// hide game control ingame
gameControl2.style.display = "none";

// GameData variable functions
var gameData = {
    dice: ['assets/images/dice1.jpg', 'assets/images/dice2.jpg', 'assets/images/dice3.jpg', 'assets/images/dice4.jpg', 'assets/images/dice5.jpg', 'assets/images/dice6.jpg'],
    players: ['player 1', 'player 2'],
    score: [0, 0],
    roll1: 0,
    roll2: 0,
    rollSum: 0,
    index: 0,
    gameEnd: 29
}


// Start the game
startGame.addEventListener("click", function () {

    gameData.index = Math.round(Math.random());
    gameControl.style.display = "none";
    gameControl2.style.display = "block";
    gameControl = gameControl2;

    gameControl2.innerHTML = '<h2><u>The Game Has Started!</u></h2>';
    gameControl2.innerHTML += '<button id="quit">Wanna Quit?</button>'

    document.getElementById('quit').addEventListener("click", function () {
        location.reload();
    });

    console.log(`player = ${gameData.index}`);
    setUpTurn();

});


// Game functions

function setUpTurn() {
    game.innerHTML = `<p><strong><u>Roll the dice for ${gameData.players[gameData.index]}</u></strong></p>`;
    actionArea.innerHTML = '<button id="roll">Roll the Dice</button>';
    document.getElementById('roll').addEventListener('click', function () {
        throwDice();
    });
}



function throwDice() {
    actionArea.innerHTML = '';
    gameData.roll1 = Math.floor(Math.random() * 6) + 1; // +1 or else result can be 0
    gameData.roll2 = Math.floor(Math.random() * 6) + 1; // +1 or else result can be 0

    game.innerHTML = `<p><strong><u>Roll the dice ${gameData.players[gameData.index]} </u></strong></p>`;
    game.innerHTML += `<img src="${gameData.dice[gameData.roll1 - 1]}" alt="die">
                        <img src="${gameData.dice[gameData.roll2 - 1]}" alt="die">`;

    gameData.rollSum = gameData.roll1 + gameData.roll2;
    console.log(`total= ${gameData.rollSum}`);


    // if 2x 1 is rolled (Snake eyes!)
    if (gameData.rollSum === 2) {
        actionArea.innerHTML += '<h3><strong>Oh snap! Snake eyes!</strong></h3>';
        gameData.score[gameData.index] = 0;

        // iternary operator for determine which player is next
        gameData.index ? (gameData.index = 0) : (gameData.index = 1);

        // show the current score
        currentScore();

        // timeout for turn switch
        setTimeout(setUpTurn, 2000);
    }

    // if either die is a 1..
    else if (gameData.roll1 === 1 || gameData.roll2 === 1) {
        gameData.index ? (gameData.index = 0) : (gameData.index = 1);
        actionArea.innerHTML += `<h3><strong>Sorry, one of your rolls was a one, switching to ${gameData.players[gameData.index]}</strong></h3>`;
        setTimeout(setUpTurn, 1500);
    }

    // if neither die is a 1...
    else {
        gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
        actionArea.innerHTML = '<button id="rollagain">Roll</button> <span>&nbsp or &nbsp</span> <button id="pass">Pass</button>';

        document.getElementById('rollagain').addEventListener('click', function () {
            throwDice();
        });

        document.getElementById('pass').addEventListener('click', function () {
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            setUpTurn();
        });

        checkWinningCondition();
    }


    // check if player wins!
    function checkWinningCondition() {
        if (gameData.score[gameData.index] > gameData.gameEnd) {
            actionArea.innerHTML = `<h2>*****!${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points!*****</h2>`;

            score.innerHTML = '';
            document.getElementById('quit').innerHTML = "Start a New Game?";
        }
        else {
            currentScore();
        }
    }

    // show current score both players
    function currentScore() {
        score.innerHTML = `<h2><strong>${gameData.players[0]} score: ${gameData.score[0]}</strong><br></h2>`;
        score.innerHTML += `<h2><strong>${gameData.players[1]} score: ${gameData.score[1]}</strong></h2>`;
    } 


    window.addEventListener('load', function () {
        const posts = document.querySelectorAll('section');
        let postTops = [];
        let pageTop;
        let counter = 1;
        let prevCounter = 1;
        let doneResizing;
        // console.log(posts[0].getBoundingClientRect().top + window.pageYOffset);
    
       
    
    
        // resize functions
        this.window.addEventListener('resize', function(){
            this.clearTimeout(doneResizing);
            doneResizing = this.setTimeout(function(){

                console.log('resize done!');
                // resetPagePosition();
            }, 500);
        });
    
    
        // function resetPagePosition() {
        //     postTops = [];
    
        //     posts.forEach(function(post){
        //         postTops.push( Math.floor( post.getBoundingClientRect().top + window.pageYoffset ) );
        //     });
    
        //     const pagePosition = window.pageYoffset + 250;
        //     counter = 0;
    
        //     postTops.forEach(function(post){
        //         if (pagePosition > post) {
        //             counter++;
        //         }
        //     });
    
        //     navLinks.forEach(function(eachLink){
        //         eachLink.removeAttribute('class');
        //     });
    
        });
}

var scores, roundScores, activePlayer, gamePlaying, diceSixRollCount;

init();


document.querySelector('.btn-new').addEventListener('click', init);

document.querySelector('.btn-hold').addEventListener('click', function () {

    if (gamePlaying) {
        //add the scores of this round
        scores[activePlayer] += roundScores;

        //update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //check if player has won the game
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = "Winner!";

            hideDice();

            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }

});

document.querySelector('.btn-roll').addEventListener('click', function () {

    if (gamePlaying) {
        //Random value for dice between 1-6
        var dice = Math.floor((Math.random() * 6) + 1);
    
        if (dice === 6) {
            console.log(dice);
            diceSixRollCount += 1;

            if (diceSixRollCount === 3) {
                resetScores();
                nextPlayer();
                return;
            }

        } else {
            diceSixRollCount = 0;
            //Display the result on dice
            var diceDOM = document.querySelector('.dice');

            diceDOM.src = '../assets/dice-' + dice + '.png';
            diceDOM.style.display = 'block';

            //Update the round score if the rolled number is not 1

            if (dice !== 1) {
                roundScores += dice;
                document.querySelector('#current-' + activePlayer).textContent = roundScores;
            } else {
                //next player
                nextPlayer();
            }
        }


    }
});


function resetScores() {
    scores[activePlayer] = 0;
    roundScores = 0;
}


function nextPlayer() {
    //Switch player

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScores = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    hideDice();

}

function init() {
    scores = [0, 0];
    roundScores = 0;
    activePlayer = 0;
    gamePlaying = true;
    diceSixRollCount = 0;

    hideDice();

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

function hideDice() {
    document.querySelector('.dice').style.display = 'none';
}
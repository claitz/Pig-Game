/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score, roundScore, activePlayer, gamePlaying;

init();

/*
// imposto il valore testuale di current per player attivo al valore del dice con query selector
// posso farlo con la variabile activePlayer per selezionare #current-0 o #current-1
document.querySelector('#current-' + activePlayer).textContent = dice;

// cambiando .textContent in .innerHTML posso pushare codice HTML (come stringa)
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// con querySelector posso anche solo leggere il contenuto testuale di un elemento
var x = document.querySelector('#score-1').innerHTML;
console.log(x);
*/


// ROLLO IL DADO
// aggiungo un eventListener per mouseclick sul pulsante per rollare
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {    
        // 1. Genero un numero random tra 1 e 6
        var dice = Math.floor(Math.random() * 6) + 1;

        // 2. Mostro il risultato
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        
        // 3. Aggiorno il round score se non ho rollato un 1
        if (dice !== 1) {
            // aggiorno il punteggio
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }
});

// TASTO HOLD
// aggiungo un eventListener per mouseclick sul pulsante per salvare punteggio e passare turno
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {  
        // aggiunto il roundScore allo score
        score[activePlayer] += roundScore;

        // aggiorno la UI
        document.getElementById('score-'+activePlayer).textContent = score[activePlayer];

        // controllo se per caso il player ha vinto la partita
        if (score[activePlayer] >= 100){
            document.querySelector('#name-' + activePlayer). textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            // cambio giocatore
            nextPlayer();
        }
    }    
});

function nextPlayer() {
        // prox giocatore con ternary operation
        // si legge 'se activePlayer = 0 allora activePlayer = 1 altrimenti activePlayer = 0'
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;

        // resetto i punteggi anche nell'interfaccia
        document.getElementById('current-0').textContent = 0;
        document.getElementById('current-1').textContent = 0;
        
        // cambio la classe per il giocatore attivo con toggle invece di add & remove per ovvi motivi
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        document.querySelector('.dice').style.display = 'none';
}

// NUOVO GIOCO
// eventListener su bottone per nuovo gioco
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    score = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    // nascondo il dado e resetto i punteggi
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = 0
    document.getElementById('score-1').textContent = 0
    document.getElementById('current-0').textContent = 0
    document.getElementById('current-1').textContent = 0

    // resetto i nomi dei giocatori
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';

    // tolgo classe winner
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    // resetto anche active
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}
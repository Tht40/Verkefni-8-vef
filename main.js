// TODO hér vantar að sækja viðeigandi föll úr öðrum modules
import { computerPlay } from './lib/rock-paper-scissors.js';
import { show } from './lib/ui.js';
import { updateResultScreen} from './lib/ui.js';
import { createButtons } from './lib/ui.js';

import { playAsText } from './lib/rock-paper-scissors.js';
import { checkGame } from './lib/rock-paper-scissors.js';



/** Hámarks fjöldi best-of leikja, ætti að vera jákvæð heiltala stærri en 0 */
const MAX_BEST_OF = 10;

/** Fjöldi leikja sem á að spila í núverandi umferð */

let totalRounds = 0;
/** Númer umferðar í núverandi umferð */
let currentRound = 0;

/** Sigrar spilara í núverandi umferð */
let playerWins = 0;

/** Töp spilara í núverandi umferð */
let computerWins = 0;

let cnter = 0;
/**
 * Fjöldi sigra spilara í öllum leikjum. Gætum reiknað útfrá `games` en til
 * einföldunar höldum við utan um sérstaklega.
 */
let totalWins = 0;

/**
 * Utanumhald um alla spilaða leiki, hver leikur er geymdur á forminu:
 *
 * ```
 * {
 *   player: 2,
 *   computer: 1,
 *   win: true,
 * }
 * ```
 */
const games = [];

/**
 * Uppfærir stöðu eftir að spilari hefur spilað.
 * Athugar hvort leik sé lokið, uppfærir stöðu skjá með `updateResultScreen`.
 * Birtir annað hvort `Næsti leikur` takka ef leik er lokið eða `Næsta umferð`
 * ef spila þarf fleiri leiki.
 *
 * @param {number} player Það sem spilari spilaði
 */
function playRound(player) {
  // Komumst að því hvað tölva spilaði og athugum stöðu leiks
  console.log(totalRounds);
  
  var computer = computerPlay();
  var result = checkGame(player, computer);
  
  
  if(result === 1){
    playerWins++;
    currentRound++;
  }
  else if(result === -1){
    computerWins++;
    currentRound++;
  }
  else if(result === 0){

  }

 
  // Uppfærum result glugga áður en við sýnum, hér þarf að importa falli
  updateResultScreen({
    player: player.toString(),
    computer : computer,
    result : result,
    currentRound : currentRound,
    totalRounds : totalRounds,
    playerWins: playerWins.toString(),
    computerWins: computerWins.toString(),
  });
  
  // Uppfærum teljara ef ekki jafntefli, verðum að gera eftir að við setjum titil

  // Ákveðum hvaða takka skuli sýna
  if(playerWins >= parseInt((totalRounds/2).toFixed()) || 
    computerWins >= parseInt((totalRounds/2).toFixed())){
    finishGame();
    show('result-finish');
  }
  else if(totalRounds > currentRound){
    show('result-nextRound');
  }
  
  // Sýnum niðurstöðuskjá
}

/**
 * Fall sem bregst við því þegar smellt er á takka fyrir fjölda umferða
 * @param {Event} e Upplýsingar um atburð
 */
function round(e) {
  const button1 = document.querySelector('button1');
  
  button1.addEventListener('click', function (){
   totalRounds = parseInt(button1.textContent);
  });
  const button3 = document.querySelector('button3');
  button3.addEventListener('click', function (){
   totalRounds = button3.textContent;
  });
  const button5 = document.querySelector('button5');
  button5.addEventListener('click', function (){
   totalRounds = button5.textContent;
  });
  const button7 = document.querySelector('button7');
  button7.addEventListener('click', function (){
   totalRounds = button7.textContent;
  });
  const button9 = document.querySelector('button9');
  button9.addEventListener('click', function (){
   totalRounds = button9.textContent;
  });
  console.log(totalRounds);
  show('play');
}


// Takki sem byrjar leik
document

  .querySelector('.start button')
  .addEventListener('click', () => show('rounds'));
  

// Búum til takka
createButtons(MAX_BEST_OF, round);
  
// Event listeners fyrir skæri, blað, steinn takka
// TODO
document
  .querySelector('button.scissor')
  .addEventListener('click', () => playRound("1"));

document
  .querySelector('button.rock')
  .addEventListener('click', () => playRound("3"));

document
  .querySelector('button.paper')
  .addEventListener('click', () => playRound("2"));

document
  .querySelector('button.finishGame')
  .addEventListener('click', () => show('rounds'));

document
  .querySelector('button.nextRound')  
  .addEventListener('click', () => show('play'));



/**
 * Uppfærir stöðu yfir alla spilaða leiki þegar leik lýkur.
 * Gerir tilbúið þannig að hægt sé að spila annan leik í framhaldinu.
 */
function finishGame() {
  // Bætum við nýjasta leik
  if(playerWins > computerWins){
    totalWins++;
  }
  games.push({  "player" : playerWins,
                "computer" :computerWins, 
                "win": Boolean (playerWins>computerWins)
              });

  // Uppfærum stöðu
 
  
  
  
  const gamesPlayed = document.querySelector('.games__played');
  gamesPlayed.textContent = games.length;
  const gamesWins = document.querySelector('.games__wins');
  gamesWins.textContent = totalWins;
  const gamesLosses = document.querySelector('.games__losses');
  gamesLosses.textContent = games.length - totalWins;
  const gamesWinratio = document.querySelector('.games__winratio');
  gamesWinratio.textContent = ((totalWins/ games.length) * 100).toFixed(2);
  const gamesLossratio = document.querySelector('.games__lossratio');
  gamesLossratio.textContent = (((games.length - totalWins)/ games.length)* 100).toFixed(2);
  // Bætum leik við lista af spiluðum leikjum

 
  const gamesList = document.querySelector('.games__list');
  var entry = document.createElement('li');
  
  entry.appendChild(document.createTextNode(games[cnter].innerHTML));
  gamesList.appendChild(entry);
  
  cnter +=1 ;
  // Núllstillum breytur
  computerWins = 0;
  playerWins = 0;
  currentRound = 0;
  totalRounds = 0;
  // Byrjum nýjan leik!
}







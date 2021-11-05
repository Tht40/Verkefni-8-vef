// TODO hér þarf að sækja viðeigandi föll sem nota þarf


import { el } from "./helpers.js";
import {isValidBestOf, playAsText } from "./rock-paper-scissors.js";


/**
 * Býr til takka fyrir umferðir, festir `onClick` við og bætir
 * við `.rounds__buttons`.
 *
 * @param {number} max Hámark umferða
 * @param {function} onClick Fall sem keyra skal þegar ýtt er á takka
 */
 export function createButtons(max, onClick) {
  const buttonDiv = document.querySelector(`.rounds__buttons`);
  const buttonchild = buttonDiv.querySelector('.button');
  
  for(let i=0; i <= max; i += 1) {
    if(isValidBestOf(i)){
    const button = el(`button${i}`, `${i}`);
    button.addEventListener('click', () => onClick(onClick));
    /*button.addEventListener('click', function x(){
      var b = button.textContent;
    })*/
    buttonDiv.appendChild(button);
    
    }
    
  }
  }
  
  export function show(part) {
    // TODO klára að útfæra fyrir allar stöður
  
    // Element fyrir „parta“ leiks sem við viljum fela og sýna
    const start = document.querySelector('.start');
    const rounds = document.querySelector('.rounds');
    const play = document.querySelector('.play');
    const result = document.querySelector('.result');
    const finishGame = document.querySelector('.finishGame');
    const nextRound = document.querySelector('.nextRound');
  
    // Felum allt
    start.classList.add('hidden');
    rounds.classList.add('hidden');
    play.classList.add('hidden');
    result.classList.add('hidden');
    finishGame.classList.add('hidden');
    nextRound.classList.add('hidden');
  
    // og sýnum það sem beðið er um
    switch (part) {
      case 'start':
        start.classList.remove('hidden');
        break;
      case 'rounds':
        rounds.classList.remove('hidden');
        break;
      case 'play':
        play.classList.remove('hidden');
        break;
      case 'result-finish':
        result.classList.remove('hidden');
        finishGame.classList.remove('hidden');
        break;
      case 'result-nextRound':
        result.classList.remove('hidden');
        nextRound.classList.remove('hidden');
        break;
      
      default:
        console.warn(`${part} óþekkt`);
    }
  
    // Halló debugger! Við getum sett þetta lykilorð til að láta debugger stoppa
    // þar sem við viljum í flæði forritanna okkar
    //debugger;
  }
  
  /**
   * @typedef {Object} Results
   * @property {string} player Það sem spilari spilaði
   * @property {string} computer Það sem tölva spilaði
   * @property {number} result Útkoma úr leik, `-1`, `0`, eða `1`
   * @property {number} currentRound Núverandi umferð
   * @property {number} totalRounds Heildarfjöldi umferð
   * @property {number} playerWins Sigrar spilara í umferð
   * @property {number} computerWins Sigrar tölvu í umferð
   */
  
  /**
   * Uppfærir öll gildi stöðu skjás innan `.result` áður en sýndur.
   * @param {Results} r Gildi fyrir skjá
   */
  export function updateResultScreen({ player, computer, result, currentRound, totalRounds, playerWins, computerWins }) {
    // TODO útfæra

    const resultPlayer = document.querySelector('.result__player');
    const resultComputer = document.querySelector('.result__computer');
    const resultResult = document.querySelector('.result__result');
    const resultCurrentRound = document.querySelector('.result__currentRound');
    const resultStatus = document.querySelector('.result__status');
    const resultTotalRounds = document.querySelector('.result__totalRounds');
    

    resultPlayer.textContent = playAsText(player);
    resultComputer.textContent = playAsText(computer);
    if(result === 1){
      resultResult.textContent = "Þú sigrar";
    }
    else if(result === 0){
      resultResult.textContent = "Jafntefli";
    }
    else if(result === -1){
      resultResult.textContent = "Tölva sigrar";
      
    }
    resultCurrentRound.textContent = currentRound;
    resultStatus.textContent = "Staðan er " + playerWins + " - " +computerWins;
    resultTotalRounds.textContent = totalRounds;

  
    
  
    
  }
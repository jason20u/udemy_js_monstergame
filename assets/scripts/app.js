const ATTACK_VALUE = 10;
const STRONG_VALUE = 20;
const MONSTER_ATTACK = 14;
const HEAL_VALUE = 20;


const MODE_ATTACK = 'ATTACK'; // MODE_ATTACK = 0
const MODE_STRONG_ATTACK = 'STRONG_ATTACK'; //MODE_STRONG_ATTACK = 1
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_STRONG_ATTACK = 'STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_HEAL = 'HEAL';
const LOG_EVENT_GAME_OUTCOME = 'GAME_OUTCOME';
const userInputLife = prompt('enter max life for battle.', '100');

let chosenMaxLife = parseInt(userInputLife);
let extra_life = true;

let battleLog = [];    //variable created to hold the log; think array
let storedEvent = event;


//User input prompt determine max life



if (isNaN(userInputLife) || chosenMaxLife <= 0) {
    chosenMaxLife = 100;
}




let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);


// write all activities events in vieable log
function writeToLog(eventt, valuee) {
    let logEntry;

    if (eventt === LOG_EVENT_PLAYER_ATTACK) {
        logEntry = {
            event: eventt,  //notation for storing EVENT within a variable
            value: valuee
        };
        battleLog.push(logEntry);
    }
    // } else if (event === LOG_EVENT_MONSTER_ATTACK) {
    //     battleLog += event;
    // } else if (event === LOG_EVENT_HEAL) {
    //     battleLog += event;
    // } else if (event === LOG_EVENT_GAME_OUTCOME) {
    //     battleLog += event;
    // }

}



//reset game function
function reset() {
    alert(`game is resetting`);
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;

    resetGame(chosenMaxLife);
    battleLog = [];
}

function printLog() {
 
    console.log(battleLog);

}





// //bonus life function//
function endRound() {
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK);
    currentPlayerHealth -= playerDamage;
    writeToLog(LOG_EVENT_MONSTER_ATTACK);
    //const initialPlayerHealth = currentPlayerHealth
    // const playerDamage = dealPlayerDamage(MONSTER_ATTACK);
    // currentPlayerHealth -= playerDamage;
  
    

    if (currentPlayerHealth <= 0 && extra_life === true) {
        extra_life = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        playerHealthBar.value = initialPlayerHealth;
        
        
        alert(`You would've been dead but bonus life saved you, health froze @ ${initialPlayerHealth}`);

    }  

        if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
            alert(`you won, here is your log: ${battleLog}`);
            reset();
        } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {

            alert("you lost");
            reset();
        } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
        
            alert('draw');
            reset();
        }
    
}


function playerAttack(mode) {
   
    let maxDamage;
    if (mode === MODE_ATTACK) {
        maxDamage = ATTACK_VALUE;
        
    } else if (mode === MODE_STRONG_ATTACK) {
        maxDamage = STRONG_VALUE;
    }
   
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    writeToLog(LOG_EVENT_PLAYER_ATTACK)
    endRound();
 
}

function attack() {
    playerAttack(MODE_ATTACK);
}

    // const damage = dealMonsterDamage(ATTACK_VALUE);
    // currentMonsterHealth -= damage;
    
    // const playerDamage = dealPlayerDamage(MONSTER_ATTACK);
    // currentPlayerHealth -= playerDamage;
    
    // if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    //     alert("you won");
    // } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    //     alert("you lost");
    // } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    //     alert('draw');
    // }



function strongAttack() {
    playerAttack(MODE_STRONG_ATTACK);
}
    //  damage = dealMonsterDamage(STRONG_VALUE)
    //  currentMonsterHealth -= damage;
    
    //  const playerDamage = dealPlayerDamage(MONSTER_ATTACK);
    //  currentPlayerHealth -= playerDamage;
    //  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    //     alert("you won");
    // } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    //     alert("you lost");
    // } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    //     alert('draw');
    // }


function heal() {
    let healthValue;
    if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
        
        healthValue = chosenMaxLife-currentPlayerHealth;
        
        currentPlayerHealth += healthValue;
        increasePlayerHealth(healthValue);
        alert(`you can only heal ${healthValue}`);
    
    } else {

       increasePlayerHealth(HEAL_VALUE);
    
        currentPlayerHealth += HEAL_VALUE;
        alert(`you were healed ${HEAL_VALUE}`)
    }
    playerDamage = dealPlayerDamage(MONSTER_ATTACK);
    currentPlayerHealth -=playerDamage;

    endRound();

}

// function log() {

// }




attackBtn.addEventListener('click', attack);
strongAttackBtn.addEventListener('click', strongAttack);
healBtn.addEventListener('click', heal);
logBtn.addEventListener('click', printLog);
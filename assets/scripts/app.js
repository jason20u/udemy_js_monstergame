const ATTACK_VALUE = 10;
const STRONG_VALUE = 20;
const MONSTER_VALUE = 14;
const HEAL_VALUE = 20;


const MODE_ATTACK = 'ATTACK'; // MODE_ATTACK = 0
const MODE_STRONG_ATTACK = 'STRONG_ATTACK'; //MODE_STRONG_ATTACK = 1
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';  // gave these strings because in array, it would've outputted numbers.  now it will display these strings to associate the output.
const LOG_EVENT_STRONG_ATTACK = 'STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_HEAL = 'HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OUTCOME';
const userInputLife = prompt('enter max life for battle.', '100');

let chosenMaxLife = parseInt(userInputLife);
let extra_life = true;

let battleLog = [];    //variable created to hold the log; think array
//let storedEvent = event;


//User input prompt determine max life



if (isNaN(userInputLife) || chosenMaxLife <= 0) {
    
    chosenMaxLife = 100;
}




let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);


// write all activities events in vieable log
function writeToLog(eventt, valuee, monsterHealth, playerHealth) {
    //function writeToLog(eventt, valuee, target, playerLogHealth, monsterLogHealth) {
    let logEntry;


    //if you want to simplify an if statement block with a lot of else if; can use SWITCH-CASE statement. THIS IS AN ALTERNATIVE TO IF ELSE can stick with ifelse

    switch (eventt) {
        case LOG_EVENT_PLAYER_ATTACK:
            logEntry = {
                event: eventt,  //notation for storing EVENT within a variable - objects
                value: valuee,
                target: 'MONSTER',
                playerLogHealth: playerHealth,
                monsterLogHealth: monsterHealth
            };
            break; //make sure to do this in switch-case statements; switch case statements fall through to each case to see if true
        case LOG_EVENT_STRONG_ATTACK:
            logEntry = {
                event: eventt,  //notation for storing EVENT within a variable - objects
                value: valuee,
                target: 'MONSTER',
                playerLogHealth: playerHealth,
                monsterLogHealth: monsterHealth
            };
            break;
        case LOG_EVENT_MONSTER_ATTACK:
            logEntry = {
                event: eventt,  //notation for storing EVENT within a variable - objects
                value: valuee,
                target: 'PLAYER',
                playerLogHealth: playerHealth,
                monsterLogHealth: monsterHealth
            };
            break;
        case LOG_EVENT_HEAL:
            logEntry = {
                event: eventt,
                value: valuee,
                target: 'PLAYER',
                playerLogHealth: playerHealth,
                monsterLogHealth: monsterHealth
            };
            break;
        case LOG_EVENT_GAME_OVER:
            logEntry = {
                event: eventt,
                value: valuee,
                playerLogHealth: playerHealth,
                monsterLogHealth: monsterHealth
            };
            break;
        default:                //special command in switch-case statements, fall back code in case none of these cases are met
            logEntry = {};
            break;
        
    }
    battleLog.push(logEntry)


    // if (eventt === LOG_EVENT_PLAYER_ATTACK) {
    //     logEntry = {
    //         event: eventt,  //notation for storing EVENT within a variable - objects
    //         value: valuee,
    //         target: 'MONSTER',
    //         playerLogHealth: playerHealth,
    //         monsterLogHealth: monsterHealth
    //     };
    //     // battleLog.push(logEntry); -- Moved to bottom outside if statements but inside function.  thank way y ou don't have to repeat
    // } else if (eventt === LOG_EVENT_STRONG_ATTACK) {
    //     logEntry = {
    //         event: eventt,  //notation for storing EVENT within a variable - objects
    //         value: valuee,
    //         target: 'MONSTER',
    //         playerLogHealth: playerHealth,
    //         monsterLogHealth: monsterHealth
    //     };
    //     // battleLog.push(logEntry);
    // } else if (eventt === LOG_EVENT_MONSTER_ATTACK) {
    //     logEntry = {
    //         event: eventt,  //notation for storing EVENT within a variable - objects
    //         value: valuee,
    //         target: 'PLAYER',
    //         playerLogHealth: playerHealth,
    //         monsterLogHealth: monsterHealth
    //     };
    //     // battleLog.push(logEntry);
    // } else if (eventt === LOG_EVENT_HEAL) {
    //     logEntry = {
    //         event: eventt,  //notation for storing EVENT within a variable - objects
    //         value: valuee,
    //         target: 'HealPlayer',
    //         playerLogHealth: playerHealth,
    //         monsterLogHealth: monsterHealth
    //     };
    //     // battleLog.push(logEntry);
    // } else if (eventt === LOG_EVENT_GAME_OVER) {
    //     logEntry = {
    //         event: eventt,  //notation for storing EVENT within a variable - objects
    //         value: valuee, //for this event, might be changing valuee to represent the output from endRound()
  
    //         playerLogHealth: playerHealth,
    //         monsterLogHealth: monsterHealth
    //     };
        //battleLog.push(logEntry);
    // }
    // battleLog.push(logEntry);

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
    //battleLog = [];
}


// log button function - using built-in console.log() function to print out in console the array.
function printLog() {
    console.clear();
    
    for (let i = 0; i<3; i+=1) {
        console.log('------');
    }

    // for (i=0; i < battleLog.length; i += 1) { //this for loop is same output style of for-of loop below
    //     console.log(battleLog[i]);

    // }


    let indexCount = 0; // see 2 lines below
    for (const logEntry of battleLog) {
        console.log(logEntry); /// for-of loops, to keep track of the index #, added this part of the code because there is no way to know the index otherwise. log/output it manually by added this to keep track on entry in array.
        console.log(indexCount);         //  
        indexCount += 1;                 //
    }
    console.log(battleLog);

}




// //bonus life function//
function endRound() {
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_VALUE);
    currentPlayerHealth -= playerDamage;
    writeToLog(LOG_EVENT_MONSTER_ATTACK, playerDamage, currentMonsterHealth,currentPlayerHealth); 

    //const initialPlayerHealth = currentPlayerHealth
    // const playerDamage = dealPlayerDamage(MONSTER_VALUE);
    // currentPlayerHealth -= playerDamage;
  
    

    if (currentPlayerHealth <= 0 && extra_life === true) {
        extra_life = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        playerHealthBar.value = initialPlayerHealth;
        
        
        alert(`You would've been dead but bonus life saved you, health froze @ ${initialPlayerHealth}`);

    }  

        if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
            alert(`YOU WON!`);
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
   
    let maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_VALUE;
    // if (mode === MODE_ATTACK) {
    //     maxDamage = ATTACK_VALUE;
        
    // } else if (mode === MODE_STRONG_ATTACK) {
    //     maxDamage = STRONG_VALUE;
    // }
   
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    writeToLog(LOG_EVENT_PLAYER_ATTACK, damage, currentMonsterHealth, currentPlayerHealth);
    endRound();
 
}


function attack() {
    playerAttack(MODE_ATTACK);
}

    // const damage = dealMonsterDamage(ATTACK_VALUE);
    // currentMonsterHealth -= damage;
    
    // const playerDamage = dealPlayerDamage(MONSTER_VALUE);
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
    
    //  const playerDamage = dealPlayerDamage(MONSTER_VALUE);
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
    // playerDamage = dealPlayerDamage(MONSTER_VALUE);
    // currentPlayerHealth -=playerDamage;

    endRound();

}

// function log() {

// }



attackBtn.addEventListener('click', attack);
strongAttackBtn.addEventListener('click', strongAttack);
healBtn.addEventListener('click', heal);
logBtn.addEventListener('click', printLog);
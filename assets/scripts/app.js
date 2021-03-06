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
// const userInputLife = prompt('enter max life for battle.', '100');  //commented out because moved for Throwing Custom Errors section4

// let chosenMaxLife = parseInt(userInputLife);
let extra_life = true;
//let logEntry;
let lastLoggedEntry; 

let battleLog = [];    //variable created to hold the log; think array
//let storedEvent = event;

let chosenMaxLife;



//User input prompt determine max life

function getMaxLifeValues () {
    const userInputLife = prompt('enter max life for battle.', '100');  //commented out because moved for Throwing Custom Errors section4
    
    const parsedValueLife = parseInt(userInputLife);

        if (isNaN(parsedValueLife) || parsedValueLife <= 0) {
            throw { message: 'Invalid user input, not a number!' };
            chosenMaxLife = 100;
        }
        return parsedValueLife;
    }
       
    
//error handling logic
//above if function does do the job but just to show the try-catch block, you will need it later for sure.
try {
    chosenMaxLife = getMaxLifeValues();
} catch (error) {                               //if 'try' block fails, it will perfrom 'catch'
    console.log(error);     //putting the parameter in console.log(asdf) allows it to come back as a regular output in console as opposed to a coding error. 
    chosenMaxLife = 100;
    alert('input error, default of 100 max life was used.');
}

            /* other ways for try-catch-finally error handling logic 
                
                // //error handling logic    
                //         //above if function does do the job but just to show the try-catch block, you will need it later for sure.
                //         try {
                //             chosenMaxLife = getMaxLifeValues();
                //         } catch (error) {                               //if 'try' block fails, it will perfrom 'catch'
                //             console.log(error);     //putting the parameter in console.log(asdf) allows it to come back as a regular output in console as opposed to a coding error. 
                //             chosenMaxLife = 100;
                //             alert('input error, default of 100 max life was used.');
                //             throw error;
                //         } finally {
                            
                //             //code inside 'finally' will ALWAYS execute no matter what - good for cleanup - Re-Throwing an error -> i.e. rethrowing an error to send to our own analytical server for example.
                //             throw error; //send thrown error to server for example.
                //             //working with network requests
                //         }

                // //error handling logic - can just have try - finally
                //         //above if function does do the job but just to show the try-catch block, you will need it later for sure.
                //         try {
                //             chosenMaxLife = getMaxLifeValues();
                //         } finally {
                //             //code inside 'finally' will ALWAYS execute no matter what - good for cleanup - Re-Throwing an error -> i.e. rethrowing an error to send to our own analytical server for example.
                            
                //         }
            */


            
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
    battleLog.push(logEntry);


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
    //console.clear(); // took this out because we now want to output 1 logEntry at a time and keep it there as it builds up

    
    for (let i = 0; i<3; i+=1) {
        console.log('------');
    }

// do while loop. if you want to execute code of posting to log and +1 increment up, then checking condition if j < 3. if so, then execute code again.
    let j = 3;
    do {
        console.log(j);
        j++;

    } while (j<3) {
        console.log('----------');
        j+= 1;
    }

    
    // for (i=0; i < battleLog.length; i += 1) { //this for loop is same output style of for-of loop below
    //     console.log(battleLog[i]);

    // }


    //for-of loop:.....

    // let indexCount = 0; // see 2 lines below
    // for (const logEntry of battleLog) {
    //     console.log(logEntry); /// for-of loops, to keep track of the index #, added this part of the code because there is no way to know the index otherwise. log/output it manually by added this to keep track on entry in array.
    //     console.log(indexCount);         //  
    //     indexCount += 1;                 //
    // }
    

    //for-in loop practice:....
     
    let indexCount = 0; 
    for (const logEntry of battleLog){ // for-of loop
        if (!lastLoggedEntry && lastLoggedEntry !== 0 || lastLoggedEntry < indexCount) {    //we put lastLoggedEntry !== 0 because remember conditions. if condition = 0, it's falsy
            console.log(`#${indexCount}`);

            for (const keyProperty in logEntry) {   //for-in loop within for-of loop.
                // console.log(${keyProperty}); //this will log name of the property
                // console.log(logEntry[keyProperty]);  // this will list the value within that key property//if you were to put logEntry.key like you normally would, it does not work in for-in loops.  you need to logEntry['some property']
                console.log(`${keyProperty} => ${logEntry[keyProperty]}`); // easier to read formatting.
            }
            lastLoggedEntry = indexCount;
            break;
        }
        
        indexCount += 1;
        
    }
    //console.log(battleLog); //outputs in array format

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
   //ternary operator example - putting if elseif statements on one line

    let maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_VALUE;
    let logEvent = mode === MODE_ATTACK ? LOG_EVENT_PLAYER_ATTACK : LOG_EVENT_STRONG_ATTACK;
    // if (mode === MODE_ATTACK) {
    //     maxDamage = ATTACK_VALUE;
        
    // } else if (mode === MODE_STRONG_ATTACK) {
    //     maxDamage = STRONG_VALUE;
    // }
   
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    writeToLog(logEvent, damage, currentMonsterHealth, currentPlayerHealth);
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
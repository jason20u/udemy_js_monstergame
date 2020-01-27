const ATTACK_VALUE = 10;
const STRONG_VALUE = 20;
const HEAL_VALUE = 15;

let chosenMaxLife = 100;

let currentMonsterHealth;
let currentPlayerHealth;


adjustHealthBars(chosenMaxLife);



function attack() {
    damage = dealMonsterDamage(ATTACK_VALUE)
    currentMonsterHealth -= damage
 
}

function strongAttack() {
    damage = dealMonsterDamage(STRONG_VALUE)
    currentMonsterHealth -= damage
}
// function strongAttack() {

// }
// function heal() {

// }

// function log() {

// }




attackBtn.addEventListener('click', attack);
strongAttackBtn.addEventListener('click', strongAttack);
healBtn.addEventListener('click', heal);
logBtn.addEventListener('click',log);
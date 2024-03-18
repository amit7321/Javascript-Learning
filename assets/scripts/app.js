const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 15;
const STRONG_ATTACK_VALUE = 20;
const HEAL_VALUE = 20;

let choseMaxLife = 100;
let currentMonsterHealth = choseMaxLife;
let currentPlayerHealth = choseMaxLife;

adjustHealthBars(choseMaxLife);

function endround() {
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    if (currentMonsterHealth <= 0) {
        alert("tui jitsos mamu !!!!!!")
    } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
        alert("you draw!!");
    } else if (currentMonsterHealth > 0 && currentPlayerHealth <= 0) {
        alert("you lost");
    }
}

function attackMonster(mode) {
    let maxDamage;
    if (mode === 'ATTACK') {
        maxDamage = ATTACK_VALUE;
    } else if (mode === 'STRONG_ATTACK') {
        maxDamage = STRONG_ATTACK_VALUE;
    }

    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    endround();
}

function attackHandler() {
    attackMonster('ATTACK');
}

function strongAttackHandler() {
    attackMonster('STRONG_ATTACK');
}

function healPlayerHandler() {
    increasePlayerHealth(HEAL_VALUE);
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
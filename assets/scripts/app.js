const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 15;
const STRONG_ATTACK_VALUE = 20;
const HEAL_VALUE = 20;

const LOG_EVENT_PLAYER_ATTACK = "player_attack";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "player_strong_attack";
const LOG_EVENT_MONSTER_ATTACK = "monster_attack";
const LOG_EVENT_PLAYER_HEAL = 'player_heal';
const LOG_EVENT_GAME_OVER = 'game_over';

const enteredVelue = prompt("maximum life for you", '100');

let choseMaxLife = parseInt(enteredVelue);

if (isNaN(choseMaxLife) || choseMaxLife <= 0) {
    choseMaxLife = 100;
}

let currentMonsterHealth = choseMaxLife;
let currentPlayerHealth = choseMaxLife;
let hasBonusLife = true;

adjustHealthBars(choseMaxLife);

function endround() {
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;

    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert("You would be dead but the bonus life saved you")
    }

    if (currentMonsterHealth <= 0) {
        alert("tui jitsos mamu !!!!!!");
        reset();
    } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
        alert("you draw!!");
        reset();
    } else if (currentMonsterHealth > 0 && currentPlayerHealth <= 0) {
        alert("you lost");
        reset();
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
    let healValue;
    if (currentPlayerHealth >= choseMaxLife - HEAL_VALUE) {
        alert("You can not heal more than initial health");
        healValue = choseMaxLife - currentPlayerHealth;
    } else {
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(HEAL_VALUE);
    currentPlayerHealth += HEAL_VALUE;
    endround();
}

function reset() {
    currentMonsterHealth = choseMaxLife;
    currentPlayerHealth = choseMaxLife;
    resetGame();
}

function writeLog(ev, val, monsterHealth, playerHealth) {
    let logEntry;
    if (ev === LOG_EVENT_PLAYER_ATTACK) {
        logEntry = {
            event: ev,
            value: val,
            target: 'MONSTER',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
        };
        battleLog.push(logEntry);
    } else if (ev === LOG_EVENT_PLAYER_ATTACK) {
        logEntry = {
            event: ev,
            value: val,
            target: 'MONSTER',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
        };
        battleLog.push(logEntry);
    }
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
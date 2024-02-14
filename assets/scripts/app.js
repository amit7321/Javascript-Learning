const ATTACK_VALUE = 10;

let choseMaxLife = 100;
let currentMonsterHealth = choseMaxLife;
let currentPlayerHealth = choseMaxLife;

adjustHealthBars(choseMaxLife);

function attackHandler() {
    const damage = dealMonsterDamage(ATTACK_VALUE);
    currentMonsterHealth -= damage;
    if (currentMonsterHealth <= 0) {
        alert("tui jitsos mamu !!!!!!")
    }
}

attackBtn.addEventListener('click', attackHandler);
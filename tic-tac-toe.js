const winnerMsg = document.querySelector('.winner');
const restartBtn = document.querySelector('.js-button');
const content = document.querySelector('.js-content');
const valueX = document.querySelector('.x-wins-value')
const valueO = document.querySelector('.o-wins-value')
let valueXTextContent = 0;
let valueOTextContent = 0;
let player = "X";
let result = false;
let playerXCombo = [];
let playerOCombo = [];
const endGame = playerXCombo.length + playerOCombo.length === 9;
const winnerCombo = [
    [1 ,2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4 ,7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5 ,9],
    [3, 5, 7],
];

content.addEventListener("click", onClick);

function onClick (evt) {
    const {target} = evt;
     if(!target.classList.contains("js-item") || target.textContent) {
        return;
    }; 
    
    const id = Number(target.dataset.id)
    if (player === "X") {
        playerXCombo.push(id);
        result = isWinner(playerXCombo);
    } else {
        playerOCombo.push(id)
        result = isWinner(playerOCombo);
    }

    target.textContent = player;

    if (result) {
        winnerMsg.textContent = `THE WINNER IS   > ${player} <`;
        if (player === "X") {
            valueX.textContent = valueXTextContent += 1;
        } else if (player === "O") {
            valueO.textContent = valueOTextContent += 1;
        }
        winnerMsg.classList.add("finded");
        content.removeEventListener("click", onClick);
        return;
    } else if (endGame) {
        winnerMsg.textContent = `HERE IS DEAD HEAT TRY AGAIN`;
        winnerMsg.classList.add("finded");
        content.removeEventListener("click", onClick);
        return;
    }

    player = player === "X" ? "O" : "X";
};

function isWinner (arr) {
    return winnerCombo.some((item) => item.every(id => arr.includes(id)));
};

function newGame() {
    let markup = '';
    for (let i = 1; i < 10; i+=1) {
        markup += `<div class="item js-item" data-id ="${i}"></div>`;
    }
    content.innerHTML = markup;
};
newGame();

function restartGame(evt){
    content.addEventListener("click", onClick);
    newGame();
    playerXCombo = [];
    playerOCombo = [];
    player = "X"
    winnerMsg.textContent = `THE WINNER IS   `;
    winnerMsg.classList.remove("finded")
};

restartBtn.addEventListener( "click", restartGame);

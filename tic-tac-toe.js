refs = {
winnerMsg: document.querySelector('.winner'),
navigation: document.querySelector('.navigation-btns'),
content: document.querySelector('.js-content'),
valueX: document.querySelector('.x-wins-value'),
valueO: document.querySelector('.o-wins-value'),
priviouseWinner: document.querySelector('.priviouse-winner'),
yourTurn: document.querySelector('.turn'),
}

let valueXTextContent = 0;
let valueOTextContent = 0;
let player = "X";
let playerXCombo = [];
let playerOCombo = [];
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

function newGame() {
    let markup = '';
    for (let i = 1; i < 10; i+=1) {
        markup += `<div class="item js-item" data-id ="${i}"></div>`;
    }
    refs.content.innerHTML = markup;
};
newGame();

refs.content.addEventListener("click", onClick);

function onClick (evt) {
    const {target} = evt;
     if(!target.classList.contains("js-item") || target.textContent) {
        return;
    }
    const id = Number(target.dataset.id)
    let result = false;

    if (player === "X") {
        playerXCombo.push(id);
        result = isWinner(playerXCombo);
        refs.yourTurn.textContent = `Player ${player} Made a Move`
    } else {
        playerOCombo.push(id)
        result = isWinner(playerOCombo);
        refs.yourTurn.textContent = `Player ${player} Made a Move`
    }
    
    target.textContent = player;
    const endGame = playerXCombo.length + playerOCombo.length === 9;
    if (result) {
        refs.winnerMsg.textContent = `THE WINNER IS   > ${player} <`;
        refs.yourTurn.textContent = `${player} WINNER ${player} WINNER ${player}`
        if (player === "X") {
            refs.valueX.textContent = valueXTextContent += 1;
            refs.priviouseWinner.textContent = `Winner Was: ${player}`;
            
        } else if (player === "O") {
            refs.valueO.textContent = valueOTextContent += 1;
            refs.priviouseWinner.textContent = `Winner Was: ${player}`;
        }
        refs.winnerMsg.classList.add("finded");
        refs.winnerMsg.classList.add("finded");
        refs.content.removeEventListener("click", onClick);
        return;
    } else if(endGame) {
        refs.winnerMsg.textContent = `HERE IS DEAD HEAT TRY AGAIN`;
        refs.yourTurn.textContent = `Here Is Dead heat try Again`;
        refs.winnerMsg.classList.add("finded");
        refs.content.removeEventListener("click", onClick);
        return;
    }
    player = player === "X" ? "O" : "X";
};

function isWinner (arr) {
    return winnerCombo.some((item) => item.every(id => arr.includes(id)));
};

function restartGame(evt){
    if(evt.target.classList.contains("js-button-score")) {
        refs.valueX.textContent = 0;
        refs.valueO.textContent = 0;
        valueXTextContent = 0;
        valueOTextContent = 0;
    } else if (evt.target.classList.contains("js-button")) {    
    refs.content.addEventListener("click", onClick);
    newGame();
    playerXCombo = [];
    playerOCombo = [];
    refs.winnerMsg.textContent = `THE WINNER IS   `;
    refs.winnerMsg.classList.remove("finded");
    refs.yourTurn.textContent = `Make Your Choise Player ${player}`
}
};


refs.navigation.addEventListener("click", restartGame );

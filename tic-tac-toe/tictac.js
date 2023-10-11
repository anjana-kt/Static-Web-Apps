let cells;
let statusText;
let restartBtn;
const winState = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let options;
let currentPlayer="X";
let running = false;


function initializeGame(){

    cells = document.querySelectorAll(".cell");
    statusText = document.querySelector("#statusText");
    restartBtn = document.querySelector("#restart-btn");

    console.log(statusText,document.querySelector("#statusText"));

    options = ["","","","","","","","",""];
    currentPlayer="X";

    running = true;
    cells.forEach(cell => cell.addEventListener('click', ()=>{

            let index = cell.getAttribute("cellindex");
            console.log(cell, "clicked",currentPlayer)
            if(options[index]!="" || !running){
                return;
            }
            updateCell(cell,index);
            checkWinner();

    } ));

    statusText.textContent = `${currentPlayer}'s turn`;
}

function updateCell(cell,index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner(){
    let roundWon = false;

    for(let i =0;i<winState.length;i++){
        let condition = winState[i];

        let cellA = options[condition[0]];
        let cellB = options[condition[1]];
        let cellC = options[condition[2]];

        if (cellA == "" || cellB == "" || cellC == "")
            continue;

        if (cellA==cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }
    if (roundWon){
        statusText.textContent = `🎉 ${currentPlayer} wins!`;
        running = false;
    }
    else if (!options.includes("")){
        statusText.textContent = `💣 tight match!`;
    }
    else{
        changePlayer();
    }

}

function changePlayer()
{
    currentPlayer = currentPlayer == "X"? "O" : "X";
}

function restart(){
    initializeGame();
    cells.forEach(cell => cell.textContent="");
}
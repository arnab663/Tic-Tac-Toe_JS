let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; 
let cnt = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    cnt = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        box.setAttribute("style","background-color : #88ed9a")
        cnt++;

        let isWinner = checkWinner();
        if (cnt === 9 && !isWinner) {
            gameDraw();
        } 
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};
  
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.removeAttribute("style","background-color : #88ed9a")
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner} !`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let [a,b,c] = pattern;
        let pos1 = boxes[a].innerText;
        let pos2 = boxes[b].innerText;
        let pos3 = boxes[c].innerText;
        if (pos1) {
            if (pos1 === pos2 && pos2 === pos3) {
                boxes[a].setAttribute('style','color : green; background-color : #88ed9a')
                boxes[b].setAttribute('style','color : green; background-color : #88ed9a')
                boxes[c].setAttribute('style','color : green; background-color : #88ed9a')
                showWinner(pos1);
                return true;
            }
        }
    }
};

const gameDraw = () => {
    msg.innerText = `Game was a Draw !!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

document.getElementById("new-btn").addEventListener("click",resetGame);
document.getElementById("reset-btn").addEventListener("click",resetGame);
  

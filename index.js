function createGrid() {
    const mainContainer = document.createElement('div');
    mainContainer.className = 'container';
    document.querySelector('body').appendChild(mainContainer);
    const gridContainer = document.createElement('div');
    gridContainer.className = 'grid-container';
    mainContainer.appendChild(gridContainer);
    for (let i = 0; i < 81; i++) {
        const div = document.createElement('div');
        div.className = 'box';
        if ((i + 1) % 3 === 0 && (i + 1) % 9 !== 0) {
            div.style.borderRight = '4px solid black';
        }
        if (i >= 18 && i <= 26) {
            div.style.borderBottom = '4px solid black';
        }
        if (i >= 45 && i <= 53) {
            div.style.borderBottom = '4px solid black';
        }
        gridContainer.appendChild(div);
    }  
}

function generateFirstRowNumbers() {
    const array = [];
    for (let i = 0; i < 9; i++) {
        while (true) {
            const number = Math.floor(Math.random() * 9 + 1);
            if (!array.includes(number)) {
                array.push(number);
                break;
            }
        }
    }

    return array;
}

function threeIndexesToTheRight(array) {
    const newArray = [...array];
    for (let i = 0; i < 3; i++) {
        const firstElement = newArray.shift();
        newArray.push(firstElement);
    }
    return newArray;
}

function twoIndexesToTheRight(array) {
    const newArray = [...array];
    for (let i = 0; i < 2; i++) {
        const firstElement = newArray.shift();
        newArray.push(firstElement);
    }
    return newArray;
}

function oneIndexToTheRight(array) {
    const newArray = [...array];
    const firstElement = newArray.shift();
    newArray.push(firstElement);
    return newArray;
}

function fillGridWithNumbers() {
    //Wzór zapewniający brak powtórzeń liczb w każdym rzędzie, kolumnie i bloku 3x3
    // Wiersz 1: 1 2 3 4 5 6 7 8 9 (bez przesunięcia)
    // Wiersz 2: Przesuń liczby z wiersza 1 o 3 miejsca w prawo
    // Wiersz 3: Przesuń liczby z wiersza 1 o 6 miejsc w prawo
    // Wiersz 4: Przesuń liczby z wiersza 1 o 1 miejsce w prawo
    // Wiersz 5: Przesuń liczby z wiersza 1 o 4 miejsca w prawo
    // Wiersz 6: Przesuń liczby z wiersza 1 o 7 miejsc w prawo
    // Wiersz 7: Przesuń liczby z wiersza 1 o 2 miejsca w prawo
    // Wiersz 8: Przesuń liczby z wiersza 1 o 5 miejsc w prawo
    // Wiersz 9: Przesuń liczby z wiersza 1 o 8 miejsc w prawo
    const firstRowRandomNumbers = generateFirstRowNumbers();
    const secondRow = threeIndexesToTheRight(firstRowRandomNumbers);
    const thirdRow = threeIndexesToTheRight(secondRow);
    const fourthRow = oneIndexToTheRight(firstRowRandomNumbers);
    const fifthRow = threeIndexesToTheRight(fourthRow);
    const sixthRow = threeIndexesToTheRight(fifthRow);
    const seventhRow = twoIndexesToTheRight(firstRowRandomNumbers);
    const eighthRow = threeIndexesToTheRight(seventhRow);
    const ninethRow = threeIndexesToTheRight(eighthRow);

    const combinedArrayOfNumbers = [
        ...firstRowRandomNumbers,
        ...secondRow,
        ...thirdRow,
        ...fourthRow,
        ...fifthRow,
        ...sixthRow,
        ...seventhRow,
        ...eighthRow,
        ...ninethRow,
    ];

    boxList.forEach((box, index) => {
        box.textContent = combinedArrayOfNumbers[index];
        box.classList.add(`${combinedArrayOfNumbers[index]}`);
    });
}

function hideBoxes(amountOfBoxesToHide) {
    const boxesToHide= [];

    for (let i = 0; i < amountOfBoxesToHide; i++) {
        while (true) {
            const number = Math.floor(Math.random() * 81);
            if (!boxesToHide.includes(number)) {
                boxesToHide.push(number);
                break;
            }
        }
    }

    // console.log(boxesToHide.length)

    boxesToHide.forEach((boxIndex) => {
        if (boxList[boxIndex]) {
            boxList[boxIndex].textContent = '';
            boxList[boxIndex].classList.add('hidden');
        }
    });
}

function addBoxSelectionAndValidation() {

    let mistakesCounter = 0;

    boxList.forEach(box => {
        box.addEventListener('click', () => {
            boxList.forEach(box => {
                box.classList.remove('selected');
            });

            box.classList.add('selected');
            box.focus();

            highlightSelectedNumbers(box);
        });

        box.addEventListener('keydown', event => {
            if (box.classList.contains('hidden')) {
                if (event.key >= '1' && event.key <= '9') {
                    box.textContent = event.key;
                    if (!box.classList.contains(event.key)) {
                        box.style.color = 'red';
                        mistakesCounter++;
                        loseCondition(mistakesCounter);
                    } else {
                        box.style.color = 'black';
                        box.classList.remove('hidden');
                        highlightSelectedNumbers(box);
                        winCondition();
                    }
                }
    
                if (event.key === 'Backspace' || event.key === 'Delete') {
                    box.textContent = '';
                    box.style.color = 'black';
                }
            }
        });

        box.setAttribute('tabindex', '0');
    });
}

function highlightSelectedNumbers(selectedNumber) {
    const visibleBoxes = document.querySelectorAll('.box:not(.hidden)');

    visibleBoxes.forEach((b) => {
        if(selectedNumber.textContent == b.textContent) {
            b.classList.add('selected');
        }
    })
}

function winCondition() {
    const hiddenBoxes = document.querySelectorAll('.hidden');

    if (hiddenBoxes.length === 0) {
        createPopUpWindow(true);
    }
}

function loseCondition(mistakesCounter) {
    const hiddenBoxes = document.querySelectorAll('.hidden');
    if (mistakesCounter === 3) {
        hiddenBoxes.forEach(box => {
            box.classList.remove('hidden');
        })
        createPopUpWindow(false);
    }
}

function createPopUpWindow(winOrLose) {
    const gridContainer = document.querySelector('.grid-container');
    setTimeout(() => {
        const popUpWindow = document.createElement('div');
        popUpWindow.className = 'win-pop-up';
        gridContainer.appendChild(popUpWindow);
        if (winOrLose) {
            const congratzText = document.createElement('h1');
            congratzText.textContent = 'Wygrana! Gratulacje.'
            popUpWindow.appendChild(congratzText);
        } else {
            const congratzText = document.createElement('h1');
            congratzText.textContent = 'Przegrana, spróbuj ponownie.'
            popUpWindow.appendChild(congratzText);
        }
        const playAgain = document.createElement('button');
        playAgain.textContent = 'Zagraj Ponownie';
        playAgain.setAttribute('id', 'play-again-button');
        playAgain.setAttribute('type', 'button');
        popUpWindow.appendChild(playAgain);
        document.querySelector('#play-again-button').addEventListener('click', () => {
            setTimeout(() => {
                const body = document.querySelector('body');
                body.innerHTML = '';
                playTheGame();
            }, 500);
        })
    }, 500);
    
}

function playTheGame() {
    createGrid();
    boxList = document.querySelectorAll('.box');
    fillGridWithNumbers();
    hideBoxes(40);
    addBoxSelectionAndValidation();
}

// createGrid();
// const boxList = document.querySelectorAll('.box');
// fillGridWithNumbers();
// hideBoxes(10);
// addBoxSelectionAndValidation();

let boxList;

playTheGame();
function createGrid() {
    const body = document.querySelector('body');
    const mainContainer = document.createElement('div');
    mainContainer.className = 'container';
    body.appendChild(mainContainer);
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

    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'buttons-container';
    body.appendChild(buttonsContainer);

    generateRulesWindow(document.querySelector('.grid-container'));
    createRulesButton(buttonsContainer);
    createNewGameButton(buttonsContainer);
    createHintButton(buttonsContainer);
    createNumbersVisualizationContainer(body);
    createMistakesCounter(buttonsContainer);
}

function createMistakesCounter(parent) {
    const mistakesCounter = document.createElement('div');
    mistakesCounter.className = 'mistakes-counter';
    mistakesCounter.classList.add('options');
    mistakesCounter.textContent = 'Błędy: 0/3';
    parent.appendChild(mistakesCounter);
}

function countDigitRepetitions() {
    const visibleBoxes = document.querySelectorAll('.box:not(.hidden)');
    // console.log(visibleBoxes);
    visibleBoxes.forEach(box => {
        const boxClassList = box.classList;
        let numericValue;
        for (let i = 0; i < boxClassList.length; i++) {
            if (isNumericClass(boxClassList[i])) {
                numericValue = boxClassList[i];
                break;
            }
        }
        counter[numericValue]++;
        if (counter[numericValue] >= 9) {
            document.querySelector(`#id-${numericValue}`).style.visibility = 'hidden';
        }
    })
    resetCounter();
}

function resetCounter() {
    for (let number in counter) {
        counter[number] = 0;
    }
}

function createNumbersVisualizationContainer(parent) {
    const digitsContainer = document.createElement('div');
    digitsContainer.className = 'digits-container';
    parent.appendChild(digitsContainer);
    // const notes = document.createElement('div');
    // notes.className = 'notes';
    // notes.textContent = 'Notatki';
    // digitsContainer.appendChild(notes);

    const notesButton = document.createElement('button');
    notesButton.textContent = 'Notatki';
    notesButton.setAttribute('id', 'notes-button');
    notesButton.className = 'notes';
    notesButton.setAttribute('type', 'button');
    digitsContainer.appendChild(notesButton);

    notesButton.addEventListener('click', () => {
        if (notesButton.classList.contains('highlight-notes-button')) {
            notesButton.classList.remove('highlight-notes-button');
        } else {
            notesButton.classList.add('highlight-notes-button');
        }
    })

    for (let i = 1; i <= 9; i++) {
        const digitBox = document.createElement('div');
        digitBox.id = `id-${i}`;
        digitBox.className = 'digit-checker';
        digitBox.textContent = `${i}`;
        digitsContainer.appendChild(digitBox);
    }
}

function useHint() {
    const boxesToReveal = document.querySelectorAll('.hidden');
    let boxIndex = Math.floor(Math.random() * boxesToReveal.length);
    const chosenBox = boxesToReveal[boxIndex];
    const chosenBoxClassList = chosenBox.classList;
    let digit;
    for (let i = 0; i < chosenBoxClassList.length; i++) {
        if (isNumericClass(chosenBoxClassList[i])) {
            digit = chosenBoxClassList[i];
            break;
        }
    }
    chosenBox.classList.remove('smaller-font');
    chosenBox.textContent = digit;
    chosenBox.classList.remove('hidden');
}

function isNumericClass(className) {
    return !isNaN(className) && !isNaN(parseFloat(className));
}

function createHintButton(parent) {
    const hintButton = document.createElement('button');
    hintButton.textContent = `Podpowiedź (${hintsAmount})`;
    hintButton.setAttribute('id', 'hint-button');
    hintButton.className = 'options';
    hintButton.setAttribute('type', 'button');
    parent.appendChild(hintButton);

    hintButton.addEventListener('click', () => {
        useHint();
        hintsAmount--;
        if (hintsAmount === 0) {
            hintButton.disabled = true;
        }
        document.querySelector('#hint-button').textContent = `Podpowiedź (${hintsAmount})`;
    })
}

function generateRulesWindow(parent) {
    const rules = document.createElement('div');
    rules.className = 'rules-container';
    parent.appendChild(rules);
    rules.style.visibility = 'hidden';
    const rulesParagraph = document.createElement('p');
    rules.appendChild(rulesParagraph);
    rulesParagraph.textContent = `Diagram Sudoku składa się z 9x9 pól.
    Możesz użyć tylko liczb od 1 do 9.
    Każdy blok 3x3 może zawierać tylko liczby od 1 do 9.
    Każda pionowa kolumna może zawierać tylko liczby od 1 do 9.
    Każdy poziomy wiersz może zawierać tylko liczby od 1 do 9.
    Każda liczba w bloku 3x3, pionowej kolumnie lub poziomym wierszu może być użyta tylko raz.
    Gra kończy się, gdy cały diagram Sudoku jest poprawnie wypełniony liczbami.`;
}

function createRulesButton(parent) {
    const rulesButton = document.createElement('button');
    rulesButton.textContent = 'Zasady';
    rulesButton.setAttribute('id', 'rules-button');
    rulesButton.className = 'options';
    rulesButton.setAttribute('type', 'button');
    parent.appendChild(rulesButton);

    rulesButton.addEventListener('click', () => {
        const elementToToggle = document.querySelector('.rules-container');
        if (elementToToggle.style.visibility === "hidden") {
            elementToToggle.style.visibility = "visible";
            rulesButton.classList.add('highlight-button');
        } else {
            elementToToggle.style.visibility = "hidden";
            rulesButton.classList.remove('highlight-button');
        }
    })
} 

function createNewGameButton(parent) {
    const newGameButton = document.createElement('button');
    newGameButton.textContent = 'Nowa Gra';
    newGameButton.className = 'options';
    newGameButton.setAttribute('id', 'new-game-button');
    newGameButton.setAttribute('type', 'button');
    parent.appendChild(newGameButton);

    newGameButton.addEventListener('click', () => {
        newGameButton.disabled = true;
        document.querySelector('#hint-button').disabled = true;
        createDifficultyContainerAndButtons();
    })
}

function createDifficultyContainerAndButtons() {
    const difficultyContainer = document.createElement('div');
    difficultyContainer.className = 'difficulty-container';
    document.querySelector('.grid-container').appendChild(difficultyContainer);

    const easyButton = document.createElement('button');
    easyButton.textContent = 'Łatwy';
    easyButton.setAttribute('id', 'easy-button');
    easyButton.className = 'difficulty';
    easyButton.setAttribute('type', 'button');
    difficultyContainer.appendChild(easyButton);

    easyButton.addEventListener('click', () => {
        playTheGame(easyDifficulty);
        hintsAmount = 1;
        document.querySelector('#hint-button').textContent = `Podpowiedź (${hintsAmount})`;
    })

    const mediumButton = document.createElement('button');
    mediumButton.textContent = 'Średni';
    mediumButton.setAttribute('id', 'medium-button');
    mediumButton.className = 'difficulty';
    mediumButton.setAttribute('type', 'button');
    difficultyContainer.appendChild(mediumButton);

    mediumButton.addEventListener('click', () => {
        playTheGame(mediumDifficulty);
        hintsAmount = 2;
        document.querySelector('#hint-button').textContent = `Podpowiedź (${hintsAmount})`;
    })

    const hardButton = document.createElement('button');
    hardButton.textContent = 'Trudny';
    hardButton.setAttribute('id', 'hard-button');
    hardButton.className = 'difficulty';
    hardButton.setAttribute('type', 'button');
    difficultyContainer.appendChild(hardButton);

    hardButton.addEventListener('click', () => {
        playTheGame(hardDifficulty);
        hintsAmount = 3;
        document.querySelector('#hint-button').textContent = `Podpowiedź (${hintsAmount})`;
    })
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
            const notesButton = document.querySelector('#notes-button');
            if (!notesButton.classList.contains('highlight-notes-button')) {
                box.classList.remove('smaller-font');
                if (box.classList.contains('hidden')) {
                    if (event.key >= '1' && event.key <= '9') {
                        box.textContent = event.key;
                        if (!box.classList.contains(event.key)) {
                            box.style.color = 'red';
                            mistakesCounter++;
                            document.querySelector('.mistakes-counter').textContent = `Błędy: ${mistakesCounter}/3`;
                            loseCondition(mistakesCounter);
                        } else {
                            box.style.color = 'blue';
                            box.classList.remove('hidden');
                            highlightSelectedNumbers(box);
                            winCondition();
                        }
                        countDigitRepetitions();
                    }
        
                    if (event.key === 'Backspace' || event.key === 'Delete') {
                        box.textContent = '';
                        box.style.color = 'black';
                        countDigitRepetitions();
                    }
                }
            } else {
                if (box.classList.contains('hidden')) {
                    box.classList.add('smaller-font');
                    box.style.color = 'black';
                    if (event.key >= '1' && event.key <= '9') {
                        if (box.textContent.includes(event.key)) {
                            let original = box.textContent;
                            let toRemove = ` ${event.key}`;
                            if (!box.textContent.includes(toRemove)) {
                                toRemove = event.key;
                            }
                            box.textContent = original.replace(toRemove, "");
                        } else {
                            box.textContent += ` ${event.key}`;
                        }
                    }
                    if (event.key === 'Backspace' || event.key === 'Delete') {
                        box.textContent = '';
                    }
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
        document.querySelector('#hint-button').disabled = true;
    }
}

function loseCondition(mistakesCounter) {
    const hiddenBoxes = document.querySelectorAll('.hidden');
    if (mistakesCounter === 3) {
        hiddenBoxes.forEach(box => {
            box.classList.remove('hidden');
        })
        createPopUpWindow(false);
        document.querySelector('#hint-button').disabled = true;
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
        document.querySelector('#new-game-button').disabled = true;
        const playAgain = document.createElement('button');
        playAgain.textContent = 'Zagraj Ponownie';
        playAgain.setAttribute('id', 'play-again-button');
        playAgain.setAttribute('type', 'button');
        popUpWindow.appendChild(playAgain);
        document.querySelector('#play-again-button').addEventListener('click', () => {
            createDifficultyContainerAndButtons();
        })
    }, 200);
    
}

function playTheGame(difficulty) {
    resetCounter();
    const body = document.querySelector('body');
    body.innerHTML = '';
    createGrid();
    boxList = document.querySelectorAll('.box');
    fillGridWithNumbers();
    hideBoxes(difficulty);
    addBoxSelectionAndValidation();
}

let boxList;
const easyDifficulty = 35; //boxes to hide
const mediumDifficulty = 40; //boxes to hide
const hardDifficulty = 45; //boxes to hide
let hintsAmount = 1;

const counter = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0
};

playTheGame(easyDifficulty);
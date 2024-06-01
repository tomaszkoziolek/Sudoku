function createGrid(difficulty) {
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
        const row = Math.floor(i / 9) + 1;
        const column = (i % 9) + 1;
        div.classList.add(`row-${row}`);
        div.classList.add(`column-${column}`);

        if (row <= 3 && column <= 3) {
            div.classList.add('box-1')
        } else if (row <= 3 && column <= 6) {
            div.classList.add('box-2')
        } else if (row <= 3 && column <= 9) {
            div.classList.add('box-3')
        } else if (row <= 6 && column <= 3) {
            div.classList.add('box-4')
        } else if (row <= 6 && column <= 6) {
            div.classList.add('box-5')
        } else if (row <= 6 && column <= 9) {
            div.classList.add('box-6')
        } else if (row <= 9 && column <= 3) {
            div.classList.add('box-7')
        } else if (row <= 9 && column <= 6) {
            div.classList.add('box-8')
        } else if (row <= 9 && column <= 9) {
            div.classList.add('box-9')
        }

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
    createNumbersVisualizationContainer(body);
    createSolveButton(buttonsContainer);
    createTimer(buttonsContainer);
    createMistakesCounter(buttonsContainer, difficulty);
    createQuestionsButton();
}

function createTimer(parent) {
    const timerBox = document.createElement('div');
    timerBox.className = 'timer-box';
    timerBox.classList.add('options');
    parent.appendChild(timerBox);
}

function updateTimer() {
    totalSeconds++;

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    document.querySelector('.timer-box').textContent = `${formattedMinutes}:${formattedSeconds}`;
}

function createSolveButton(parent) {
    const solveButton = document.createElement('button');
    solveButton.textContent = 'Rozwiąż istniejące';
    solveButton.setAttribute('id', 'solve-button');
    solveButton.className = 'options';
    solveButton.setAttribute('type', 'button');
    parent.appendChild(solveButton);
}

function createQuestionsButton() {
    const question = document.createElement('div');
    question.className = 'question-box';
    document.body.appendChild(question);
    question.textContent = '?';
    const quest = document.createElement('div');
    quest.className = 'question-popup';
    document.querySelector('.grid-container').appendChild(quest);
    quest.style.visibility = 'hidden';
    const questParagraph = document.createElement('p');
    quest.appendChild(questParagraph);
    questParagraph.textContent = `Prawy przycisk myszy włącza/wyłącza tryb wstawiania notatek - 
    można też po prostu klikać przycisk 'Notatki'.`;

     question.addEventListener('click', () => {
        const isHidden = quest.style.visibility === 'hidden';

        if (isHidden) {
            quest.style.visibility = 'visible';
        } else {
            quest.style.visibility = 'hidden';
        }
     })
}

function createMistakesCounter(parent, difficulty) {
    const mistakesCounter = document.createElement('div');
    mistakesCounter.className = 'mistakes-counter';
    mistakesCounter.classList.add('options');

    const level = document.createElement('div');
    level.className = 'level';
    mistakesCounter.appendChild(level);
    level.textContent = `Poziom ${difficulty}`;

    const mistake = document.createElement('div');
    mistake.className = 'mistake';
    mistakesCounter.appendChild(mistake);

    mistake.textContent = 'Błędy: 0/3';
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
        // console.log(numericValue);
        // console.log(counter[numericValue]);
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

    const notesAndEreaseContainer = document.createElement('div');
    notesAndEreaseContainer.className = 'notesAndErease-container';
    document.body.appendChild(notesAndEreaseContainer);

    const ereaseButton = document.createElement('button');
    ereaseButton.textContent = 'Wymaż';
    ereaseButton.setAttribute('id', 'erease-button');
    ereaseButton.className = 'erease-button';
    ereaseButton.setAttribute('type', 'button');
    notesAndEreaseContainer.appendChild(ereaseButton);

    ereaseButton.addEventListener('click', () => {
        if (previouslyFocusedBox !== null) {
            if (previouslyFocusedBox.classList.contains('hidden')) {
                previouslyFocusedBox.textContent = '';
                previouslyFocusedBox.focus();
            }
        }
    })

    const notesButton = document.createElement('button');
    notesButton.textContent = 'Notatki';
    notesButton.setAttribute('id', 'notes-button');
    notesButton.className = 'notes';
    notesButton.setAttribute('type', 'button');
    notesAndEreaseContainer.appendChild(notesButton);

    notesButton.addEventListener('click', () => {
        if (notesButton.classList.contains('highlight-notes-button')) {
            notesButton.classList.remove('highlight-notes-button');
            if (previouslyFocusedBox !== null) {
                previouslyFocusedBox.focus();
            }
        } else {
            notesButton.classList.add('highlight-notes-button');
            if (previouslyFocusedBox !== null) {
                previouslyFocusedBox.focus();
            }
        }
    })

    for (let i = 1; i <= 9; i++) {
        const digitBox = document.createElement('div');
        digitBox.id = `id-${i}`;
        digitBox.className = 'digit-checker';
        digitBox.textContent = `${i}`;
        digitsContainer.appendChild(digitBox);

        digitBox.addEventListener('click', () => {
            const notesButton = document.querySelector('#notes-button');
            if (!previouslyFocusedBox.classList.contains('solve-mode')) {
                if (!notesButton.classList.contains('highlight-notes-button')) {
                    previouslyFocusedBox.classList.remove('smaller-font');
                    if (previouslyFocusedBox.classList.contains('hidden')) {
                        previouslyFocusedBox.textContent = digitBox.textContent;
                            if (!previouslyFocusedBox.classList.contains(digitBox.textContent)) {
                                previouslyFocusedBox.style.color = 'red';
                                mistakesCounter++;
                                document.querySelector('.mistake').textContent = `Błędy: ${mistakesCounter}/3`;
                                loseCondition(mistakesCounter);
                            } else {
                                previouslyFocusedBox.style.color = 'blue';
                                previouslyFocusedBox.classList.remove('hidden');
                                highlightSelectedNumbers(previouslyFocusedBox);
                                removeNotes(previouslyFocusedBox, digitBox.textContent);
                                winCondition();
                            }
                            countDigitRepetitions();
                        }
                    } else {
                    if (previouslyFocusedBox.classList.contains('hidden')) {
                        previouslyFocusedBox.classList.add('smaller-font');
                        previouslyFocusedBox.style.color = 'black';
                            if (previouslyFocusedBox.textContent.includes(digitBox.textContent)) {
                                let original = previouslyFocusedBox.textContent;
                                let toRemove = ` ${digitBox.textContent}`;
                                if (!previouslyFocusedBox.textContent.includes(toRemove)) {
                                    toRemove = digitBox.textContent;
                                }
                                previouslyFocusedBox.textContent = original.replace(toRemove, "");
                            } else {
                                previouslyFocusedBox.textContent += ` ${digitBox.textContent}`;
                            }
                    }
                }
            } else {
                previouslyFocusedBox.textContent = digitBox.textContent;
            }
        })
    }

    createHintButton(notesAndEreaseContainer);
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
    countDigitRepetitions();
    removeNotes(chosenBox, digit);
}

function isNumericClass(className) {
    return !isNaN(className) && !isNaN(parseFloat(className));
}

function createHintButton(parent) {
    const hintButton = document.createElement('button');
    hintButton.textContent = `Podpowiedź (${hintsAmount})`;
    hintButton.setAttribute('id', 'hint-button');
    hintButton.className = 'hint-button';
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
        playTheGame(easyDifficulty, 'Łatwy');
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
        playTheGame(mediumDifficulty, 'Średni');
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
        playTheGame(hardDifficulty, 'Trudny');
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

function generateMatrix() {
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

    const sudokuMatrix = [
        firstRowRandomNumbers,
        secondRow,
        thirdRow,
        fourthRow,
        fifthRow,
        sixthRow,
        seventhRow,
        eighthRow,
        ninethRow
    ];

    //dodatkowe przetasowanie aby uniknac powtarzalnych schematow
    shuffleRows(sudokuMatrix);
    shuffleColumns(sudokuMatrix);

    return sudokuMatrix;

    // boxList.forEach((box, index) => {
    //     box.textContent = combinedArrayOfNumbers[index];
    //     box.classList.add(`${combinedArrayOfNumbers[index]}`);
    // });

    // hideBoxes(easyDifficulty);
}

function fillGrid(difficulty) {
    let grid = generateMatrix(); // Generowanie pełnej tablicy
    let copiedGrid = deepCopyMatrix(grid);
    let gridWithHiddenBoxes = hideRandomFieldsWithUniqueSolution(copiedGrid, difficulty);
    const gridToArray = matrixToArray(grid);
    const gridWithHiddenBoxesToArray = matrixToArray(gridWithHiddenBoxes);

    const boxList = document.querySelectorAll('.box');
    gridWithHiddenBoxesToArray.forEach((number, index) => {
        if (number !== 0) {
            boxList[index].textContent = number;
            boxList[index].classList.add(`${number}`);
        } else {
            boxList[index].classList.add(`${gridToArray[index]}`);
            boxList[index].classList.add('hidden');
        }
    })
}

function hideRandomFieldsWithUniqueSolution(grid, numToHide) {
    let hiddenCount = 0;

    while (hiddenCount < numToHide) {
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);
        if (grid[row][col] !== 0) {
            let temp = grid[row][col];
            grid[row][col] = 0; // Ukrywanie pola

            if (isUniqueSolution(grid)) {
                hiddenCount++;
            } else {
                grid[row][col] = temp; // Cofanie ukrywania, jeśli rozwiązanie nie jest unikalne
            }
        }
    }

    return grid;
}

function isUniqueSolution(grid) {
    let solutionCount = 0;

    function solve(board) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (isValidMove(board, row, col, num)) {
                            board[row][col] = num;
                            solve(board);
                            board[row][col] = 0;
                        }
                    }
                    return;
                }
            }
        }
        solutionCount++;
    }

    const boardCopy = deepCopyMatrix(grid); // Skopiowanie macierzy przed rozpoczęciem rozwiązania
    solve(boardCopy);

    return solutionCount === 1;
}

function deepCopyMatrix(matrix) {
    return matrix.map(row => [...row]);
}

function isValidMove(board, row, col, num) {
    for (let x = 0; x < 9; x++) {
        if (board[row][x] === num || board[x][col] === num) {
            return false;
        }
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[startRow + i][startCol + j] === num) {
                return false;
            }
        }
    }

    return true;
}

function matrixToArray(matrix) {
    let array = [];
    for (let i = 0; i < 9; i++) {
        array = array.concat(matrix[i]);
    }
    return array;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function shuffleRows(matrix) {
    const blocks = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
    blocks.forEach(block => {
        const shuffledBlock = shuffle([...block]);
        shuffledBlock.forEach((rowIndex, i) => {
            const temp = matrix[block[i]];
            matrix[block[i]] = matrix[rowIndex];
            matrix[rowIndex] = temp;
        });
    });
}

function shuffleColumns(matrix) {
    const blocks = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
    blocks.forEach(block => {
        const shuffledBlock = shuffle([...block]);
        matrix.forEach(row => {
            const temp = row[block[0]];
            row[block[0]] = row[shuffledBlock[0]];
            row[shuffledBlock[0]] = temp;

            const temp2 = row[block[1]];
            row[block[1]] = row[shuffledBlock[1]];
            row[shuffledBlock[1]] = temp2;

            const temp3 = row[block[2]];
            row[block[2]] = row[shuffledBlock[2]];
            row[shuffledBlock[2]] = temp3;
        });
    });
}

// function hideBoxes(amountOfBoxesToHide) {
//     const boxesToHide= [];

//     for (let i = 0; i < amountOfBoxesToHide; i++) {
//         while (true) {
//             const number = Math.floor(Math.random() * 81);
//             if (!boxesToHide.includes(number)) {
//                 boxesToHide.push(number);
//                 break;
//             }
//         }
//     }

//     // console.log(boxesToHide.length)

//     boxesToHide.forEach((boxIndex) => {
//         if (boxList[boxIndex]) {
//             boxList[boxIndex].textContent = '';
//             boxList[boxIndex].classList.add('hidden');
//         }
//     });
// }

function addBoxSelectionAndValidation() {

    boxList.forEach(box => {
        box.addEventListener('click', () => {
            boxList.forEach(box => {
                box.classList.remove('selected');
            });

            box.classList.add('selected');
            box.focus();

            previouslyFocusedBox = box;
            highlightSelectedNumbers(box);
        });

        box.addEventListener('keydown', event => {
            const notesButton = document.querySelector('#notes-button');
            if (!box.classList.contains('solve-mode')) {
                if (!notesButton.classList.contains('highlight-notes-button')) {
                    box.classList.remove('smaller-font');
                    if (box.classList.contains('hidden')) {
                        if (event.key >= '1' && event.key <= '9') {
                            box.textContent = event.key;
                            if (!box.classList.contains(event.key)) {
                                box.style.color = 'red';
                                mistakesCounter++;
                                document.querySelector('.mistake').textContent = `Błędy: ${mistakesCounter}/3`;
                                loseCondition(mistakesCounter);
                            } else {
                                box.style.color = 'blue';
                                box.classList.remove('hidden');
                                highlightSelectedNumbers(box);
                                removeNotes(box, event.key);
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
            } else {
                if (event.key >= '1' && event.key <= '9') {
                    box.textContent = event.key;
                }

                if (event.key === 'Backspace' || event.key === 'Delete') {
                    box.textContent = '';
                }
            }
        });

        box.setAttribute('tabindex', '0');
    });
}

function removeNotes(box, eventKey) {
    const row = [...box.classList].find(cls => cls.startsWith('row-'));
    const column = [...box.classList].find(cls => cls.startsWith('column-'));
    const boxNumber = [...box.classList].find(cls => cls.startsWith('box-'));
    const boxNumberListHidden = document.querySelectorAll(`.${boxNumber}.hidden`);
    const hiddenRowBoxes = document.querySelectorAll(`.${row}.hidden`);
    const hiddenColumnBoxes = document.querySelectorAll(`.${column}.hidden`);
    const combinedList = [
        ...hiddenRowBoxes,
        ...hiddenColumnBoxes,
        ...boxNumberListHidden
    ];
    combinedList.forEach(box => {
        if (box.textContent.includes(eventKey)) {
            let original = box.textContent;
            let toRemove = ` ${eventKey}`;
            if (!box.textContent.includes(toRemove)) {
                toRemove = eventKey;
            }
            box.textContent = original.replace(toRemove, "");
        }
    })
    // console.log(row)
    // console.log(column)
    // console.log(hiddenRowBoxes)
    // console.log(hiddenColumnBoxes)
    // console.log(combinedList)
}

function highlightSelectedNumbers(selectedNumber) {
    const visibleBoxes = document.querySelectorAll('.box:not(.hidden)');

    visibleBoxes.forEach((b) => {
        if(selectedNumber.textContent == b.textContent && !b.classList.contains('solve-mode')) {
            b.classList.add('selected');
        }
    })
}

function winCondition() {
    const hiddenBoxes = document.querySelectorAll('.hidden');

    if (hiddenBoxes.length === 0) {
        createPopUpWindow(true);
        clearInterval(intervalId);
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
        clearInterval(intervalId);
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

function addNotesToggleOnPpm() {
    document.querySelector('.grid-container').addEventListener('contextmenu', event => {
        const box = event.target;
        event.preventDefault();
        const notesButton = document.querySelector('#notes-button');
        if (notesButton.classList.contains('highlight-notes-button')) {
            notesButton.classList.remove('highlight-notes-button');
        } else {
            notesButton.classList.add('highlight-notes-button');
        }
    
        boxList.forEach(box => {
            box.classList.remove('selected');
        });
    
        box.classList.add('selected');
        box.focus();
    
        previouslyFocusedBox = box;
        highlightSelectedNumbers(box);
    })
}

function playTheGame(difficulty, level) {
    resetCounter();
    const body = document.querySelector('body');
    body.innerHTML = '';
    createGrid(level);
    boxList = document.querySelectorAll('.box');
    fillGrid(difficulty);
    countDigitRepetitions();
    addBoxSelectionAndValidation();
    addNotesToggleOnPpm();
    mistakesCounter = 0;
    totalSeconds = 0;
    clearInterval(intervalId);
    updateTimer();
    intervalId = setInterval(updateTimer, 1000);
    addSolveFunctionality();
}

let boxList;
const easyDifficulty = 35; //boxes to hide
const mediumDifficulty = 45; //boxes to hide
const hardDifficulty = 55; //boxes to hide
let hintsAmount = 1;
let previouslyFocusedBox = null;
let mistakesCounter = 0;
let totalSeconds = 0;
let intervalId;

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

playTheGame(easyDifficulty, 'Łatwy');

function addSolveFunctionality() {

    document.querySelector('#solve-button').addEventListener('click', () => {
        clearInterval(intervalId);
        document.querySelector('.timer-box').style.display = 'none';
        document.querySelector('.mistakes-counter').style.display = 'none';

        if (document.querySelector('.no-solution-popup')) {
            document.querySelector('.no-solution-popup').remove();
        }

        if (document.querySelector('.wrong-data-popup')) {
            document.querySelector('.wrong-data-popup').remove();
        }

        if (document.querySelector('#solve-existing-button')) {
            document.querySelector('#solve-existing-button').disabled = false;
        }

        const boxList = document.querySelectorAll('.box');
        // console.log(boxList);

        boxList.forEach(box => {
            box.textContent = '';
            box.className = 'box solve-mode';
            box.style.color = 'black';
        })

        document.querySelector('#solve-button').disabled = true;

        if (!document.querySelector('#solve-existing-button')) {
            const solveExistingButton = document.createElement('button');
            solveExistingButton.textContent = 'Rozwiąż';
            solveExistingButton.setAttribute('id', 'solve-existing-button');
            solveExistingButton.className = 'options';
            solveExistingButton.setAttribute('type', 'button');
            document.querySelector('.buttons-container').appendChild(solveExistingButton);

            solveExistingButton.addEventListener('click', () => {
                const solveMatrix = [];
                // console.log(solveMatrix)
                boxList.forEach(box => {
                    if (box.textContent === '') {
                        solveMatrix.push(0);
                    } else {
                        solveMatrix.push(parseBoxContent(box));
                    }
                })

                const convertedMatrix = arrayToMatrix(solveMatrix);
                // console.log(convertedMatrix);
                if (isUniqueRowsColsBlocks(convertedMatrix)) {
                    if (solveSudoku(convertedMatrix)) {
                        const convertedSolvedMatrix = matrixToArray(convertedMatrix);
                        // console.log(convertedSolvedMatrix);
                        boxList.forEach((box, index) => {
                            if (box.textContent === '') {
                                box.textContent = convertedSolvedMatrix[index];
                                box.style.color = 'blue';
                            }
                        })
    
                        document.querySelector('#solve-button').disabled = false;
                        document.querySelector('#solve-existing-button').disabled = true;
    
                    } else {
                        console.log('brak rozwiazania');
                        const gridContainer = document.querySelector('.grid-container');
                        const popUpWindow = document.createElement('div');
                        popUpWindow.className = 'no-solution-popup';
                        gridContainer.appendChild(popUpWindow);
                        const paragraph = document.createElement('p');
                        paragraph.textContent = `Brak rozwiązania. Powodem może być błąd przy wpisywaniu cyfr, lub 
                        sudoku, które probujesz rozwiązać nie jest poprawnie skonstruowane 
                        (każde Sudoku posiada dokładnie jedno unikalne rozwiązanie). Upewnij się, że dane, które 
                        wprowadzasz są poprawne.`;
                        popUpWindow.appendChild(paragraph);
                        document.querySelector('#solve-button').disabled = false;
                        document.querySelector('#solve-existing-button').disabled = true;
                    }
                } else {
                    console.log('zle dane');
                    const gridContainer = document.querySelector('.grid-container');
                    const popUpWindow = document.createElement('div');
                    popUpWindow.className = 'wrong-data-popup';
                    gridContainer.appendChild(popUpWindow);
                    const paragraph = document.createElement('p');
                    paragraph.textContent = `Niepoprawne dane. Upewnij się, że cyfry które wprowadzasz 
                    spełniają zasady sudoku: Każda cyfra może zostać użyta tylko raz w rzędzie, kolumnie i 
                    bloku 3x3.`;
                    popUpWindow.appendChild(paragraph);
                    document.querySelector('#solve-button').disabled = false;
                    document.querySelector('#solve-existing-button').disabled = true;
                }
            })
        }
    })
}

function isUniqueRow(row) {
    let seen = new Set();
    for (let cell of row) {
        if (cell !== 0 && seen.has(cell)) {
            return false;
        }
        seen.add(cell);
    }
    return true;
}

function isUniqueRowsColsBlocks(grid) {
    // Sprawdzenie unikalności wierszy
    for (let row of grid) {
        if (!isUniqueRow(row)) {
            return false;
        }
    }

    // Sprawdzenie unikalności kolumn
    for (let col = 0; col < 9; col++) {
        let column = [];
        for (let row = 0; row < 9; row++) {
            column.push(grid[row][col]);
        }
        if (!isUniqueRow(column)) {
            return false;
        }
    }

    // Sprawdzenie unikalności bloków 3x3
    for (let i = 0; i < 9; i += 3) {
        for (let j = 0; j < 9; j += 3) {
            let block = [];
            for (let row = i; row < i + 3; row++) {
                for (let col = j; col < j + 3; col++) {
                    block.push(grid[row][col]);
                }
            }
            if (!isUniqueRow(block)) {
                return false;
            }
        }
    }

    return true;
}

function isValid(grid, row, col, num) {
    for (let x = 0; x < 9; x++) {
        if (grid[row][x] === num || grid[x][col] === num) {
            return false;
        }

        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (grid[startRow + i][startCol + j] === num) {
                    return false;
                }
            }
        }
    }
    return true;
}

function solveSudoku(grid) {
    const emptyLocation = findEmptyLocation(grid);
    if (!emptyLocation) {
        return true; // Sudoku rozwiązane
    }

    const [row, col] = emptyLocation;

    for (let num = 1; num <= 9; num++) {
        if (isValid(grid, row, col, num)) {
            grid[row][col] = num; // Tymczasowo przypisz num

            if (solveSudoku(grid)) {
                return true;
            }

            grid[row][col] = 0; // Cofnij przypisanie num
        }
    }

    return false; // Trigger backtracking
}

function findEmptyLocation(grid) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (grid[row][col] === 0) {
                return [row, col];
            }
        }
    }
    return null;
}

function arrayToMatrix(array) {
    const matrix = [];
    for (let i = 0; i < 9; i++) {
        const row = array.slice(i * 9, i * 9 + 9);
        matrix.push(row);
    }
    return matrix;
}

function parseBoxContent(box) {
    const textContent = box.textContent.trim(); // Usunięcie białych znaków
    const numericValue = Number(textContent); // Konwersja stringu na liczbę
    return numericValue;
}
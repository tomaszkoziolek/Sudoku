function createGrid() {
    const mainContainer = document.createElement('div');
    mainContainer.className = 'container';
    //test
    const decorativeContainer = document.createElement('div');
    decorativeContainer.className = 'decorative-container';
    mainContainer.appendChild(decorativeContainer);
    for (let i = 0; i < 9; i++) {
        const decorativeLesser = document.createElement('div');
        decorativeLesser.className = 'decorative-container-lesser';
        decorativeContainer.appendChild(decorativeLesser);
    } 
    //test
    document.querySelector('body').appendChild(mainContainer);
    const gridContainer = document.createElement('div');
    gridContainer.className = 'grid-container';
    mainContainer.appendChild(gridContainer);
    for (let i = 0; i < 81; i++) {
        const div = document.createElement('div');
        div.className = 'box';
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

createGrid();
const boxList = document.querySelectorAll('.box');
fillGridWithNumbers();
hideBoxes(40);

const hiddenBoxesList = document.querySelectorAll('.hidden');

hiddenBoxesList.forEach(box => {
    box.addEventListener('click', () => {
        hiddenBoxesList.forEach(box => {
            box.classList.remove('selected');
        });

        box.classList.add('selected');
    });
});
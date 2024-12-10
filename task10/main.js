const fs = require('fs');

// Data reading
const file = fs.readFileSync('input.txt').toString();
const data = file.split('\n').map(row => {
    return [...row].map(x => x === '.' ? -1 : +x);
});


// PART ONE & PART TWO (need two lines to be commented)
// Find all zeroes
const zeroes = [];
for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
        if (data[i][j] === 0) {
            zeroes.push([i, j]);
        }
    }
}

// General recursive start
const calcResult = (zeroRow, zeroCol) => {
    // Recursive search
    const searchForNine = (cordRow, cordCol) => {
        const currentNumber = data[cordRow][cordCol];
        // IF YOU WANT THE ANSWER FOR PART TWO THEN COMMENT EXACTLY TWO LINES BELOW
        if (posForZero.has(`|${cordRow}|${cordCol}|`)) return 0;
        posForZero.add(`|${cordRow}|${cordCol}|`);
        
        if (currentNumber === 9) return 1;


        let sum = 0;
        // up
        if (
            cordRow - 1 >= 0 &&
            currentNumber + 1 === data[cordRow - 1][cordCol]
        )
            sum += searchForNine(cordRow-1, cordCol);
        // right
        if (
            cordCol + 1 < borderCol &&
            currentNumber + 1 === data[cordRow][cordCol + 1]
        )
            sum += searchForNine(cordRow, cordCol + 1);
        // down
        if (
            cordRow + 1 < borderRow &&
            currentNumber + 1 === data[cordRow + 1][cordCol]
        )
            sum += searchForNine(cordRow + 1, cordCol);
        // left
        if (
            cordCol - 1 >= 0 &&
            currentNumber + 1 === data[cordRow][cordCol - 1]
        )
            sum += searchForNine(cordRow, cordCol - 1);

        return sum;
    }

    const borderRow = data.length;
    const borderCol = data[0].length;

    // 0 with coords i,j visited set([x1,y1], [x2, y2]) etc. (set of it)
    const posForZero = new Set();
    const sum = searchForNine(zeroRow, zeroCol);
    return sum;
}

// For all zeroes
const result = zeroes.reduce((acc, [x, y]) => acc+calcResult(x, y), 0);
console.log(result);
const fs = require('fs');

const data = fs.readFileSync('input.txt').toString().split('\n');

const KEYWORD1 = 'XMAS';
const KEYWORD2 = 'SAMX';

// PART ONE

let count = 0;
// horizontally
// rows
for (d of data) {
    const window = [];
    for (let i = 3; i < d.length; i++) {
        window[0] = d[i-3];
        window[1] = d[i-2];
        window[2] = d[i-1];
        window[3] = d[i];

        if (
            window.join('') === KEYWORD1 ||
            window.join('') === KEYWORD2
        ) count++;
    }
}

// vertically
for (let i = 0; i < data[0].length; i++) {
    const window = [];
    for (let j = 3; j < data.length; j++) {
        window[0] = data[j-3][i];
        window[1] = data[j-2][i];
        window[2] = data[j-1][i];
        window[3] = data[j][i];

        if (
            window.join('') === KEYWORD1 ||
            window.join('') === KEYWORD2
        ) count++;
    }
}

// console.log('after vert & horiz: ', count);

const calcDiag = (i, data) => {
    let count = 0;
    let rowAdder = 0;
    const rowLimiter = data.length == data[0].length
        ? data.length - 3
        : data[0].length - data.length;

    while (rowAdder < rowLimiter) {
        const window = [];
        let r = 0+3+rowAdder; // ++
        let c = i-3; // --
        while (r < data.length && c >= 0) {
            window[3] = data[r][c];
            window[2] = data[r-1][c+1];
            window[1] = data[r-2][c+2];
            window[0] = data[r-3][c+3];
            r++;
            c--;
    
            if (
                window.join('') === KEYWORD1 ||
                window.join('') === KEYWORD2
            ) count++;
        }
    
        if (i == data.length) {
            rowAdder++;
        } else {
            i++;
        }
    }
    return count;
}
// diagonal to right
// console.log(calcDiag(3, data));
const revData = [];
for (let i = data.length - 1; i >= 0; i--) {
    revData.push(data[i]);
}
// console.log(calcDiag(3, revData));

const all = count + calcDiag(3, data) + calcDiag(3, revData);
console.log(all);

// PART TWO
let countMAS = 0;
const XMAS_REGEX = /^(MAS)|(SAM)$/;

for (let i = 1; i < data.length-1; i++) {
    for (let j = 1; j < data[0].length-1; j++) {
        if (data[i][j] == 'A') {
            const word1 = data[i-1][j-1] + data[i][j] + data[i+1][j+1];
            const word2 = data[i-1][j+1] + data[i][j] + data[i+1][j-1];

            if (XMAS_REGEX.test(word1) && XMAS_REGEX.test(word2))
                countMAS++;
        }
    }
}

console.log(countMAS);
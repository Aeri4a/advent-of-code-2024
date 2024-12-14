const fs = require('fs');

// Data reading
const file = fs.readFileSync('input.txt').toString().split('\n');

// PART ONE
const increaseArea = (obj, key) => {
    if (obj[key] === undefined) {
        obj[key] = [1, 0];
    } else {
        obj[key][0] += 1;
    }
}

const increaseFence = (obj, key) => {
    if (obj[key] === undefined) {
        obj[key] = [0, 1];
    } else {
        obj[key][1] += 1;
    }
}

// ADDITIONAL FOR PART TWO
const saveFencePosition = (obj, key, row, col, direction) => {
    if (obj[key] === undefined) {
        // [MIN_ROW, MAX_ROW, MIN_COL, MAX_COL, SET_OF_FENCES_POS]
        obj[key] = [row, row, col, col, new Set([`${row},${col},${direction}`])];
    } else {
        if (row > obj[key][1]) obj[key][1] = row;
        if (row < obj[key][0]) obj[key][0] = row;
        if (col > obj[key][3]) obj[key][3] = col;
        if (col < obj[key][2]) obj[key][2] = col;
        obj[key][4].add(`${row},${col},${direction}`);
    }
}


const results = {};
const visited = new Set();
const toVisit = new Set();
const fences = {};

const borderRow = file.length;
const borderColumn = file[0].length;

const traversePlants = (row, col, id) => {
    const currentPlant = file[row][col];

    // Add current coords
    visited.add(`${row},${col}`);
    toVisit.delete(`${row},${col}`);
    increaseArea(results, id);

    // Traverse
    // up
    if (row - 1 < 0) {
        increaseFence(results, id);
        saveFencePosition(fences, id, row, col, 'U');
    } else if (file[row-1][col] !== currentPlant) {
        increaseFence(results, id);
        saveFencePosition(fences, id, row, col, 'U');
        if (!visited.has(`${row-1},${col}`))
            toVisit.add(`${row-1},${col}`);
    } else if (!visited.has(`${row-1},${col}`)) {
        traversePlants(row-1, col, id);
    }
    // left
    if (col - 1 < 0) {
        increaseFence(results, id);
        saveFencePosition(fences, id, row, col, 'L');
    } else if (file[row][col-1] !== currentPlant) {
        increaseFence(results, id);
        saveFencePosition(fences, id, row, col, 'L');
        if (!visited.has(`${row},${col-1}`))
            toVisit.add(`${row},${col-1}`);
    } else if (!visited.has(`${row},${col-1}`)) {
        traversePlants(row, col-1, id);
    }
    // down
    if (row + 1 >= borderRow) {
        increaseFence(results, id);
        saveFencePosition(fences, id, row, col, 'D');
    } else if (file[row+1][col] !== currentPlant) {
        increaseFence(results, id);
        saveFencePosition(fences, id, row, col, 'D');
        if (!visited.has(`${row+1},${col}`))
            toVisit.add(`${row+1},${col}`);
    } else if (!visited.has(`${row+1},${col}`)) {
        traversePlants(row+1, col, id);
    }
    // right
    if (col + 1 >= borderColumn) {
        increaseFence(results, id);
        saveFencePosition(fences, id, row, col, 'R');
    } else if (file[row][col+1] !== currentPlant) {
        increaseFence(results, id);
        saveFencePosition(fences, id, row, col, 'R');
        if (!visited.has(`${row},${col+1}`))
            toVisit.add(`${row},${col+1}`);
    } else if (!visited.has(`${row},${col+1}`)) {
        traversePlants(row, col+1, id);
    }

    return id;
};

toVisit.add('0,0');
let id = -1;
do {
    id++;
    const item = [...toVisit][0];
    toVisit.delete(item);
    const [row, col] = item.split(',').map(el => +el);
    traversePlants(row, col, id);
} while (toVisit.size !== 0);

// console.log(results);
// const res = Object.values(results).reduce((acc, [a, f]) => acc+(a*f),0);
// console.log(res);

// PART TWO -> comment to get only PART ONE
// Calc fences
for (const [key, value] of Object.entries(fences)) {
    let fenceSumByKey = 0;

    // Calc by rows
    for (let i = value[0]; i <= value[1]; i++) {
        let wasFenceBeforeUp = false;
        let wasFenceBeforeDown = false;
        for (let j = value[2]; j <= value[3]; j++) {
            if (value[4].has(`${i},${j},U`)) {
                if (!wasFenceBeforeUp) {
                    fenceSumByKey++;
                    wasFenceBeforeUp = true;
                }
            } else {
                wasFenceBeforeUp = false;
            }

            if (value[4].has(`${i},${j},D`)) {
                if (!wasFenceBeforeDown) {
                    fenceSumByKey++;
                    wasFenceBeforeDown = true;
                }
            } else {
                wasFenceBeforeDown = false;
            }
        }
    }

    // Calc by cols
    for (let i = value[2]; i <= value[3]; i++) {
        let wasFenceBeforeLeft = false;
        let wasFenceBeforeRight = false;
        for (let j = value[0]; j <= value[1]; j++) {
            if (value[4].has(`${j},${i},L`)) {
                if (!wasFenceBeforeLeft) {
                    fenceSumByKey++;
                    wasFenceBeforeLeft = true;
                }
            } else {
                wasFenceBeforeLeft = false;
            }

            if (value[4].has(`${j},${i},R`)) {
                if (!wasFenceBeforeRight) {
                    fenceSumByKey++;
                    wasFenceBeforeRight = true;
                }
            } else {
                wasFenceBeforeRight = false;
            }
        }
    }

    // change number of fences in result by key
    results[key][1] = fenceSumByKey;
}

// console.log(results);
const res = Object.values(results).reduce((acc, [a, f]) => acc+(a*f),0);
console.log(res);
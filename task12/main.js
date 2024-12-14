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


const results = {};
const visited = new Set();
const toVisit = new Set();

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
    } else if (file[row-1][col] !== currentPlant) {
        increaseFence(results, id);
        if (!visited.has(`${row-1},${col}`))
            toVisit.add(`${row-1},${col}`);
    } else if (!visited.has(`${row-1},${col}`)) {
        traversePlants(row-1, col, id);
    }
    // left
    if (col - 1 < 0) {
        increaseFence(results, id);
    } else if (file[row][col-1] !== currentPlant) {
        increaseFence(results, id);
        if (!visited.has(`${row},${col-1}`))
            toVisit.add(`${row},${col-1}`);
    } else if (!visited.has(`${row},${col-1}`)) {
        traversePlants(row, col-1, id);
    }
    // down
    if (row + 1 >= borderRow) {
        increaseFence(results, id);
    } else if (file[row+1][col] !== currentPlant) {
        increaseFence(results, id);
        if (!visited.has(`${row+1},${col}`))
            toVisit.add(`${row+1},${col}`);
    } else if (!visited.has(`${row+1},${col}`)) {
        traversePlants(row+1, col, id);
    }
    // right
    if (col + 1 >= borderColumn) {
        increaseFence(results, id);
    } else if (file[row][col+1] !== currentPlant) {
        increaseFence(results, id);
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
const res = Object.values(results).reduce((acc, [a, f]) => acc+(a*f),0);
console.log(res);
const fs = require('fs');

const fileData = fs.readFileSync('input.txt').toString();

const ordering = {};
const updates = [];
let updateNext = false;
for (line of fileData.split('\n')) {
    if (line === '') {
        updateNext = true;
        continue;
    } else if (updateNext) {
        updates.push(line.split(','));

    } else {
        const [key, value] = line.split('|');
        if (ordering[key]) {
            ordering[key].push(value);
        } else {
            ordering[key] = [value];
        }
    }
}

// PART ONE
const goodUpdates = [];
const badUpdates = [];
for (update of updates) {
    let correct = true;
    const updateIndexes = update.reduce((acc, curr, idx) => (acc[curr] = idx, acc), {});

    for (page of update) {
        if (!correct) break;
        if (ordering[page] !== undefined) {
            const pageIndex = updateIndexes[page];
            for (item of ordering[page]) {
                if (updateIndexes[item] !== undefined && (
                    pageIndex > updateIndexes[item]
                )) {
                    correct = false;
                    break;
                }
            }
        } else {
            continue;
        }
    }
    if (correct)
        goodUpdates.push(update);
    else
        badUpdates.push(update);
}

const result = goodUpdates.reduce((acc, curr) => (acc += +curr[Math.floor(curr.length/2)]), 0);
console.log(result);

// PART TWO
// give points
let middleSum = 0;
for (update of badUpdates) {
    const points = update.reduce((acc, curr) => (acc[curr] = 0, acc), {});

    for (page of update) {
        if (ordering[page] !== undefined) {
            for (item of ordering[page]) {
                if (update.includes(item))
                    points[page] += 1;
            }
        }
    }
    update.sort((a, b) => points[b] - points[a]);
    middleSum += +update[Math.floor(update.length/2)]
}

console.log(middleSum);

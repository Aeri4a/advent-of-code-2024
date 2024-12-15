const fs = require('fs');

// Data reading
const file = fs.readFileSync('input.txt').toString();


// PART ONE - a good one with a good idea
const { queue } = [...file].reduce((acc, curr, idx) => {
    if (idx % 2 === 0) {
        acc.queue.push(...new Array(+curr).fill(acc.iter));
        acc.iter++;
    }
    return acc;
}, { iter: 0, queue: [] });

const result = [];
let i = 0;
while (queue.length) {
    const current = +file[i];
    
    const mini = Math.min(current, queue.length);
    for (let j = 0; j < mini; j++) {
        result.push(
            i % 2 === 0 ? queue.shift() : queue.pop()
        );
    }
    i++;
}
const checkSum = result.reduce((acc, curr, idx) => acc+(+curr*idx), 0);
console.log('PART ONE:', checkSum);

// PART TWO - a worse one with a lazy idea
const data = file.split('').map(el => +el);

const { result: partition } = data.reduce((acc, curr) => {
    if (acc.iter % 2 === 0) {
        acc.result.push(...new Array(curr).fill(Math.floor(acc.iter/2)));
    } else {
        acc.result.push(...new Array(curr).fill(-1));
    }
    acc.iter++;
    return acc;
}, { iter: 0, result: [] });

const blockIndexes = [0];
for (let i = 1; i < data.length; i++) {
    blockIndexes.push(blockIndexes[i-1]+data[i-1]);
}

for (let i = data.length - 1; i >= 0; i -= 2) {
    for (let j = 1; j < i; j += 2) {
        if (data[j] >= data[i]) {
            const start1 = blockIndexes[j];
            const end1 = start1+data[i];

            for (let k = start1; k < end1; k++) {
                partition[k] = Math.floor(i/2);
            }

            data[j] -= data[i];
            blockIndexes[j] = end1;
            
            const start2 = blockIndexes[i];
            const end2 = start2+data[i];

            for (let k = start2; k < end2; k++) {
                partition[k] = -1;
            }
            break;
        }
    }
}
// console.log(...partition);

const checkSum2 = partition.reduce((acc, curr, idx) => {
    if (curr !== -1) {
        return acc+(curr*idx);
    }
    return acc;
}, 0);
console.log('PART TWO:', checkSum2);
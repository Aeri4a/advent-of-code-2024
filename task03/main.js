const fs = require('fs');

const MUL_REGEX = /mul\(([0-9]+,[0-9]+)\)/g;
const RULE_REGEX = /mul\(([0-9]+,[0-9]+)\)|(do(n't)?\(\))/g;

const data = fs.readFileSync('input.txt').toString();

const task1 = [...data.matchAll(MUL_REGEX)].reduce(
  (acc, curr) =>
    (acc += curr[1].split(",").reduce((acc1, curr1) => (acc1 *= curr1), 1)),
  0
);

console.log(task1);

const task2 = [...data.matchAll(RULE_REGEX)].reduce((acc, curr) => {
    const option = curr[0];
    if (option === 'don\'t()') acc.isAllow = false;
    if (option === 'do()') {
        acc.isAllow = true;
        return acc;
    }
    if (acc.isAllow) {
        if (option.startsWith('mul')) {
            acc.sum += curr[1].split(',').reduce((acc1, curr1) => (acc1 *= curr1), 1)
        }
    }

    return acc;
}, { sum: 0, isAllow: true });

console.log(task2);

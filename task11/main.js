const fs = require('fs');

// Data reading
const file = fs.readFileSync('input.txt').toString().split(' ');

const increaseObjectValue = (obj, key, value) => (obj[key] = (obj[key] || 0) + value, obj);

const makeOperation = (obj) => {
    const newObj = {};

    for (const [key, value] of Object.entries(obj)) {
        if (key === '0') {
            increaseObjectValue(newObj, '1', value);
            continue;
        }

        if (key.length % 2 === 1) {
            increaseObjectValue(newObj, `${+key*2024}`, value);
            continue;
        }

        const numberHalf = Math.floor(key.length/2);
        const digitsArray = key.split('');
        increaseObjectValue(newObj, digitsArray.slice(0, numberHalf).join(''), value)
        increaseObjectValue(newObj, `${parseInt(digitsArray.slice(numberHalf, key.length).join(''))}`, value);
    }

    return newObj;
};

let elements = file.reduce((acc, curr) => (acc[curr] = 1, acc), {});
for (let i = 0; i < 75; i++) {
    elements = makeOperation(elements);
}

const result = Object.values(elements).reduce((acc, value) => acc+value, 0);
console.log(result);
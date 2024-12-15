const fs = require('fs');

// Data reading
const file = fs.readFileSync('input.txt').toString().split('\n');

const COST_A = 3;
const COST_B = 1;

const PART_TWO_ADDITION = 10000000000000;

const solveEquation = ([x1, x2], [y1, y2], [a, b]) => {
    const W = x1*y2 - x2*y1;
    const Wx = a*y2 - b*y1;
    const Wy = x1*b - x2*a;

    if (W === 0) return -1;
    if (W === 0 && Wx === 0) return -1;
    if (W === 0 && Wx === 0 && Wy === 0) return -1;
    if (Wx/W % 1 !== 0 || Wy/W % 1 !== 0) return -1;

    return [Wx/W, Wy/W];
};

const getButtonValues = (str) => {
    const match = str.match(/X\+([0-9]+), Y\+([0-9]+)/);
    return [+match[1], +match[2]];
}

const getPrizeValues = (str) => {
    const match = str.match(/X=([0-9]+), Y=([0-9]+)/);
    return [+match[1]+PART_TWO_ADDITION, +match[2]+PART_TWO_ADDITION];
}

let result = 0;
for (let i = 2; i < file.length; i += 4) {
    const AxAy = getButtonValues(file[i-2]);
    const BxBy = getButtonValues(file[i-1]);
    const PxPy = getPrizeValues(file[i]);

    const AB = solveEquation(AxAy, BxBy, PxPy);
    if (AB === -1) continue;
    const [A, B] = AB;
    if (A < 0 || B < 0) continue;
    // if (A > 100 || B > 100) continue; ONLY FOR PART ONE

    result += A*COST_A + B*COST_B;
}

console.log(result);
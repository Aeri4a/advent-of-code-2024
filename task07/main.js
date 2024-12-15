const fs = require('fs');

// Data reading
const file = fs.readFileSync('input.txt').toString().split('\n');
const data = file.reduce(
  (acc, curr) => (
    acc.push({
      value: +curr.split(':')[0],
      elements: curr
        .split(' ')
        .slice(1)
        .map((val) => +val),
    }),
    acc
  ),
  []
);

const dataCopy = data.map((obj) => ({
  value: obj.value,
  elements: [...obj.elements],
}));

// ---= PART ONE =---

// Tree node
class Node {
  constructor(value, left = null, right = null) {
    this.left = left;
    this.right = right;
    this.value = value;
  }
}

// Build tree
const buildOperationTree = (node, list) => {
  if (!list.length) return node;

  node.left = buildOperationTree(
    new Node(node.value + list[0]),
    list.slice(1)
  );
  node.right = buildOperationTree(
    new Node(node.value * list[0]),
    list.slice(1)
  );

  return node;
};


const getEveryResultFromTree = (tree, list) => {
    if (tree.left !== null)
      getEveryResultFromTree(tree.left, list);
    if (tree.right !== null)
      getEveryResultFromTree(tree.right, list);

    list.push(tree.value);
    return list;
};

// Main loop
let calibrationResult1 = 0;
for ({ value, elements } of data) {
  const rootElement = elements.shift();
  const tree = buildOperationTree(new Node(rootElement), elements);
  const list = [];
  getEveryResultFromTree(tree, list);
  if (list.find(el => el === value)) calibrationResult1 += value;
}

console.log(calibrationResult1);




// ---= PART TWO =---

// Tree node
class NodeTernary {
  constructor(value, left = null, middle = null, right = null) {
    this.left = left;
    this.middle = middle;
    this.right = right;
    this.value = value;
  }
}

// Build tree
const buildOperationTernaryTree = (node, list) => {
  if (!list.length) return node;

  node.left = buildOperationTernaryTree(
    new NodeTernary(node.value + list[0]),
    list.slice(1)
  );
  node.middle = buildOperationTernaryTree(
    new NodeTernary(+`${node.value}${list[0]}`),
    list.slice(1)
  )
  node.right = buildOperationTernaryTree(
    new NodeTernary(node.value * list[0]),
    list.slice(1)
  );

  return node;
};


const getEveryResultFromTernaryTree = (tree, list) => {
    if (tree.left !== null)
      getEveryResultFromTernaryTree(tree.left, list);
    if (tree.middle !== null)
      getEveryResultFromTernaryTree(tree.middle, list);
    if (tree.right !== null)
      getEveryResultFromTernaryTree(tree.right, list);

    list.push(tree.value);
    return list;
};

// Main loop
let calibrationResult2 = 0;
for ({ value, elements } of dataCopy) {
  const rootElement = elements.shift();
  const tree = buildOperationTernaryTree(new NodeTernary(rootElement), elements);
  const list = [];
  getEveryResultFromTernaryTree(tree, list);
  if (list.find(el => el === value)) calibrationResult2 += value;
}

console.log(calibrationResult2);
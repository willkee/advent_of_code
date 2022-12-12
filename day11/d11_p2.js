const {
	monkey0,
	monkey1,
	monkey2,
	monkey3,
	monkey4,
	monkey5,
	monkey6,
	monkey7,
} = require("./d11_input");

const operations = [
	monkey0,
	monkey1,
	monkey2,
	monkey3,
	monkey4,
	monkey5,
	monkey6,
	monkey7,
];
// const { monkey0, monkey1, monkey2, monkey3 } = require("./d11_example");

// const operations = [monkey0, monkey1, monkey2, monkey3];

// let numMonkeys = 4;
let numMonkeys = 8;

// const inspectionCount = [0, 0, 0, 0];
const inspectionCount = [0, 0, 0, 0, 0, 0, 0, 0];

let superModulo = 19 * 3 * 11 * 17 * 5 * 2 * 13 * 7;

let currentRound = 0;
while (currentRound < 10000) {
	let currMonkey = 0;
	while (currMonkey < numMonkeys) {
		let current = operations[currMonkey];
		const [operator, num] = current.operation;

		while (current.items.length) {
			let item = current.items.shift();

			inspectionCount[current.id]++;
			// console.log(currentRound, "currBefore", item);

			if (operator === "*") {
				item *= num;
			} else if (operator === "/") {
				item /= num;
			} else if (operator === "+") {
				item += num;
			} else if (operator === "-") {
				item -= num;
			} else if (operator === "^") {
				item = item * item;
			}

			// console.log(currentRound, "currAfter", item);

			item = item % superModulo;

			const [_modulo, modNum] = current.test;

			let destination;
			if (item % modNum === 0) destination = current.testTrue;
			else destination = current.testFalse;

			operations[destination].items.push(item);
		}

		currMonkey++;
	}

	currentRound++;
}

console.log(inspectionCount);
const sortedCount = inspectionCount.sort((a, b) => b - a);

const answer = sortedCount[0] * sortedCount[1];
console.log(answer);

// console.log(superModulo);

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
let numMonkeys = 8;
let currentRound = 0;

const inspectionCount = [0, 0, 0, 0, 0, 0, 0, 0];

while (currentRound < 20) {
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

			item = Math.floor(item / 3);

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

const sortedCount = inspectionCount.sort((a, b) => b - a);

const answer = sortedCount[0] * sortedCount[1];
console.log(answer);

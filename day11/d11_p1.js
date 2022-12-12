const { monkey0, monkey1, monkey2, monkey3 } = require("./d11_example");

const operations = [monkey0, monkey1, monkey2, monkey3];
let numMonkeys = operations.length;

let roundIterator = 0;
let roundLimit = 20;

let monkeyIterator = roundIterator % numMonkeys;
let currentMonkey = operations[monkeyIterator];

while (roundIterator < roundLimit) {
	let value = currentMonkey.items.shift();
	const [operator, num] = currentMonkey.operation;
	console.log(operator, num);

	if (operator === "*") {
		value *= num;
	} else if (operator === "/") {
		value /= num;
	} else if (operator === "+") {
		value += num;
	} else if (operator === "-") {
		value -= num;
	} else if (operator === "^") {
		value **= num;
	}

	console.log("new value", value);

	roundIterator++;
	monkeyIterator = roundIterator % numMonkeys;
	currentMonkey = operations[monkeyIterator];
}

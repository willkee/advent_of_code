const parseTextFileIntoArray = require("../utils/parseText");

// input stacks

let s1 = ["Z", "N"];
let s2 = ["M", "C", "D"];
let s3 = ["P"];

const keyToStack = {
	1: s1,
	2: s2,
	3: s3,
};

const directions = parseTextFileIntoArray("./d5_example_input.txt");

for (const direction of directions) {
	if (direction) {
		let [_move, quantity, _from, origin, _to, dest] = direction.split(" ");

		let counter = 0;
		const tempArray = [];

		while (counter < quantity) {
			const el = keyToStack[origin].pop();
			tempArray.unshift(el);
			counter++;
		}

		while (tempArray.length) {
			let tempElement = tempArray.shift();
			keyToStack[dest].push(tempElement);
		}
	}
}

console.log(s1, s2, s3);

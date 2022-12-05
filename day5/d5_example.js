const parseTextFileIntoArray = require("../utils/parseText");

// input stacks

const s1 = ["Z", "N"];
const s2 = ["M", "C", "D"];
const s3 = ["P"];

const keyToStack = {
	1: s1,
	2: s2,
	3: s3,
};

const directions = parseTextFileIntoArray("./d5_example_input.txt");

for (const direction of directions) {
	if (direction) {
		const [_move, quantity, _from, origin, _to, dest] =
			direction.split(" ");

		let counter = 0;

		console.log(quantity, origin, dest);

		while (counter < quantity) {
			const el = keyToStack[origin].pop();
			console.log(counter, el);
			keyToStack[dest].push(el);

			counter++;
		}
	}
}

console.log(s1, s2, s3);

const parseTextFileIntoArray = require("../utils/parseText");

// input stacks
const s1 = ["D", "T", "R", "B", "J", "L", "W", "G"];
const s2 = ["S", "W", "C"];
const s3 = ["R", "Z", "T", "M"];
const s4 = ["D", "T", "C", "H", "S", "P", "V"];
const s5 = ["G", "P", "T", "L", "D", "Z"];
const s6 = ["F", "B", "R", "Z", "J", "Q", "C", "D"];
const s7 = ["S", "B", "D", "J", "M", "F", "T", "R"];
const s8 = ["L", "H", "R", "B", "T", "V", "M"];
const s9 = ["Q", "P", "D", "S", "V"];

const keyToStack = {
	1: s1,
	2: s2,
	3: s3,
	4: s4,
	5: s5,
	6: s6,
	7: s7,
	8: s8,
	9: s9,
};

const directions = parseTextFileIntoArray("./day5_input.txt");

for (const direction of directions) {
	if (direction) {
		const [_move, quantity, _from, origin, _to, dest] =
			direction.split(" ");

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

let answer = "";
for (const array of [s1, s2, s3, s4, s5, s6, s7, s8, s9]) {
	answer += array[array.length - 1];
}

console.log(answer);

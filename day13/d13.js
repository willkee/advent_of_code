const parseTextFileIntoArray = require("../utils/parseText");
// const file = parseTextFileIntoArray("./d13_ex.txt");
const file = parseTextFileIntoArray("./d13_input.txt");

const groups = file.join(" ").split("  ");

function checkPair(leftPair, rightPair) {
	if (typeof leftPair === "number" && typeof rightPair === "number") {
		if (leftPair < rightPair) return 1;
		if (leftPair > rightPair) return -1;
		return 0;
	}

	if (Array.isArray(leftPair) && Array.isArray(rightPair)) {
		for (let i = 0; i < leftPair.length; i++) {
			const L = leftPair[i];
			const R = rightPair[i];

			if (!R) return -1;

			const res = checkPair(L, R);
			if (res) return res;
		}
		if (leftPair.length < rightPair.length) return 1;
	}

	if (typeof leftPair === "number") return checkPair([leftPair], rightPair);
	if (typeof rightPair === "number") return checkPair(leftPair, [rightPair]);
}

function part1() {
	const correctIndices = [];

	for (let i = 0; i < groups.length; i++) {
		const group = groups[i];
		const [leftPair, rightPair] = group.split(" ");

		if (checkPair(JSON.parse(leftPair), JSON.parse(rightPair)) === 1)
			correctIndices.push(i + 1);
	}

	console.log(correctIndices);

	const sumIndices = correctIndices.reduce((sum, num) => sum + num, 0);
	return sumIndices;
}

console.log(part1());

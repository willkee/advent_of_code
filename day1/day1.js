const parseTextFileIntoArray = require("../utils/parseText");

function findSumsOfGroup(arr) {
	const sums = [];

	let i = 0;
	let runningSum = 0;

	while (i < arr.length) {
		if (arr[i] === "") {
			sums.push(Number(runningSum));
			runningSum = 0;
		} else {
			runningSum += Number(arr[i]);
		}
		i++;
	}

	return sums;
}

// Find top 3:
function findTopThree(arr) {
	let res = 0;

	for (let i = 0; i < 3; i++) {
		res += arr[i];
	}

	return res;
}

const sortArrayDesc = (arr) => arr.sort((a, b) => b - a);

const parsedArray = parseTextFileIntoArray("./input.txt");
const sums = findSumsOfGroup(parsedArray);
const sortedSums = sortArrayDesc(sums);

console.log(findTopThree(sortedSums));

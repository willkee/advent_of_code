const parseTextFileIntoArray = require("../utils/parseText");

const rucksArray = parseTextFileIntoArray("./day3_input.txt");

const priority = "_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const duplicates = [];

let ruckCount = 1;

// for (const ruck of rucksArray) {
// 	const left = ruck.slice(0, ruck.length / 2);
// 	const right = ruck.slice(ruck.length / 2);

// 	// for (const item of left) {
// 	// 	if (right.includes(item)) {
// 	// 		duplicates.push(item);
// 	// 		break;
// 	// 	}
// 	// }
// 	ruckCount++;
// }

const badges = [];

let str1 = "";
let str2 = "";
let str3 = "";
let counter = 1;

for (let i = 0; i < rucksArray.length; i += 3) {
	const ruck = rucksArray[i];
	const ruck2 = rucksArray[i + 1];
	const ruck3 = rucksArray[i + 2];

	for (let j = 0; j < ruck.length; j++) {
		const letter = ruck[j];

		if (ruck2.includes(letter) && ruck3.includes(letter)) {
			badges.push(letter);
			break;
		}
	}
}

let sum = 0;

for (const badge of Array.from(badges)) {
	sum += priority.indexOf(badge);
}
// for (const duplicate of Array.from(duplicates)) {
// 	sum += priority.indexOf(duplicate);
// }

console.log(sum);

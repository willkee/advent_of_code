const parseTextFileIntoArray = require("../utils/parseText");

// const day4_file = parseTextFileIntoArray("./d4_example.txt");
const day4_file = parseTextFileIntoArray("./day4_input.txt");

let counter = 0;
let total = 0;

for (const pairs of day4_file) {
	if (pairs) {
		total++;

		const [pair1, pair2] = pairs.split(",");

		const [p1_start_str, p1_end_str] = pair1.split("-");
		const [p2_start_str, p2_end_str] = pair2.split("-");

		const p1_start = Number(p1_start_str);
		const p2_start = Number(p2_start_str);
		const p1_end = Number(p1_end_str);
		const p2_end = Number(p2_end_str);

		if (
			(p2_start >= p1_start && p2_end <= p1_end) ||
			(p1_start >= p2_start && p1_end <= p2_end)
		) {
			// fully contained
			counter++;
		} else if (
			(p2_start >= p1_start && p2_start <= p1_end) ||
			(p2_end >= p1_start && p2_end <= p1_end)
		) {
			// PART 2:
			// Pair 2 partially in Pair 1
			counter++;
		} else if (
			(p1_start >= p2_start && p1_start <= p2_end) ||
			(p1_end >= p2_start && p1_end <= p2_end)
		) {
			// PART 2:
			// Pair 1 partially in Pair 2
			counter++;
		}
	}
}

console.log(counter);

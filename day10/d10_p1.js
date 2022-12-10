const parseTextFileIntoArray = require("../utils/parseText");
// const file = parseTextFileIntoArray("./d10_input.txt");
const file = parseTextFileIntoArray("./d10_example.txt");

function part1() {
	let cycleCount = 0;
	let idx = 0;
	let xValue = 1;

	const store = {
		20: 0,
		60: 0,
		100: 0,
		140: 0,
		180: 0,
		220: 0,
	};

	function cycler(idx, cycleCount, xValue) {
		const command = file[idx];
		if (!command) return;

		if (store[cycleCount] === 0) store[cycleCount] = xValue;
		if (cycleCount === 220) {
			console.log(
				"cycle:",
				cycleCount,
				"index:",
				idx,
				command,
				xValue,
				"TOP"
			);
		}

		if (command === "noop") {
			cycleCount++;
		} else {
			const [_addX, value] = command.split(" ");

			let increment = 0;
			while (increment < 2) {
				cycleCount++;
				increment++;

				if (cycleCount === 220) {
					console.log(
						"cycle:",
						cycleCount,
						"index:",
						idx,
						command,
						xValue,
						"WHILE LOOP"
					);
				}

				if (store[cycleCount] === 0) store[cycleCount] = xValue;
			}

			xValue += +value;
			if (cycleCount === 220) console.log(xValue, "xvalue-220");
		}

		return cycler(idx + 1, cycleCount, xValue);
	}

	cycler(idx, cycleCount, xValue);

	let sum = 0;
	for (const key in store) {
		sum += key * store[key];
	}

	return sum;
}

console.log(part1());

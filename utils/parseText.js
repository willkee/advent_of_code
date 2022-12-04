const fs = require("fs");

function parseTextFileIntoArray(inputPath) {
	let test;
	try {
		test = fs.readFileSync(inputPath);
	} catch (err) {
		console.error("Error has occurred.");
	}

	return test.toString().split("\n");
}

module.exports = parseTextFileIntoArray;

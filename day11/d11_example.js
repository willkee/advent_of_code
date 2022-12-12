const monkey0 = {
	items: [79, 98],
	operation: ["*", 19],
	test: ["%", 23],
	testTrue: 2,
	testFalse: 3,
};
const monkey1 = {
	items: [54, 65, 75, 74],
	operation: ["+", 6],
	test: ["%", 19],
	testTrue: 2,
	testFalse: 0,
};
const monkey2 = {
	items: [79, 60, 97],
	operation: ["^", 2],
	test: ["%", 13],
	testTrue: 1,
	testFalse: 3,
};
const monkey3 = {
	items: [74],
	operation: ["+", 3],
	test: ["%", 17],
	testTrue: 0,
	testFalse: 1,
};

module.exports = { monkey0, monkey1, monkey2, monkey3 };

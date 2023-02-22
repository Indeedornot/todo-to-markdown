import {
	countLeadingWhitespaces,
	getNonEmptyLines,
	isStringEmpty,
	trimTrailingEmptyLines,
	trimLeadingEmptyLines,
	addLeadingWhitespace,
} from '../src/jsUtils';

describe('jsUtils', () => {
	test('isStringEmpty', () => {
		const empty = isStringEmpty('');
		expect(empty).toBe(true);

		const notEmpty = isStringEmpty('not empty');
		expect(notEmpty).toBe(false);

		const notEmptyWithWhitespace = isStringEmpty(' ');
		expect(notEmptyWithWhitespace).toBe(true);

		const whiteSpace = isStringEmpty('  ');
		expect(whiteSpace).toBe(true);
	});

	test('countLeadingWhitespaces', () => {
		const empty = countLeadingWhitespaces('');
		expect(empty).toBe(0);

		const notEmpty = countLeadingWhitespaces('not empty');
		expect(notEmpty).toBe(0);

		const notEmptyWithWhitespace = countLeadingWhitespaces(' not empty ');
		expect(notEmptyWithWhitespace).toBe(1);

		const whitespaceOnly = countLeadingWhitespaces(' ');
		expect(whitespaceOnly).toBe(1);
	});

	test('getNonEmptyLines', () => {
		const empty = getNonEmptyLines('');
		expect(empty).toEqual([]);

		const notEmpty = getNonEmptyLines('not empty');
		expect(notEmpty).toEqual(['not empty']);
	});

	test('trimTrailingEmptyLines', () => {
		const empty = trimTrailingEmptyLines('');
		expect(empty).toEqual('');

		const notEmpty = trimTrailingEmptyLines('not empty\n\n');
		expect(notEmpty).toEqual('not empty');

		const emptyLines = trimTrailingEmptyLines(`\nnot empty\n\n`);
		expect(emptyLines).toEqual(`\nnot empty`);
	});

	test('trimLeadingEmptyLines', () => {
		const empty = trimLeadingEmptyLines('');
		expect(empty).toEqual('');

		const notEmpty = trimLeadingEmptyLines('not empty');
		expect(notEmpty).toEqual('not empty');

		const emptyLines = trimLeadingEmptyLines(`\nnot empty\n\n`);
		expect(emptyLines).toEqual(`not empty\n\n`);
	});

	test('addLeadingWhitespace', () => {
		const empty = addLeadingWhitespace('', 0);
		expect(empty).toEqual('');

		const empty2 = addLeadingWhitespace('', 2);
		expect(empty2).toEqual('  ');

		const notEmpty0 = addLeadingWhitespace('not empty', 0);
		expect(notEmpty0).toEqual('not empty');

		const notEmpty2 = addLeadingWhitespace(`not empty`, 2);
		expect(notEmpty2).toEqual(`  not empty`);
	});
});

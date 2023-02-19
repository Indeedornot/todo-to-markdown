import * as fs from 'fs/promises';
import {createSegment, getSegment, updateSegment} from '../src/segments';
import * as github from '@actions/github';

const updateFileContents = async (path: string, newContent: string) => {
	//write content to ./testData
	await fs.writeFile(path, newContent);
};

describe('Tests with mock functions', () => {
	test('Readme', () => {
		const todo = `
Some Todo header:
    ☐ Some todo item
    ☐ Some other todo item
    
Some Done header:
    ✔ Some done item @done(23-02-19 09:56)
    ✔ Some other done item @done(23-02-19 09:56)
`;

		const readme = `
This is some sample readme file for testing purposes.

Hi, I am a sample readme file. I am used for testing purposes.

<!-- start: readme-segment -->

<!-- end: readme-segment -->

Hi!
`;

		const expected = `
This is some sample readme file for testing purposes.

Hi, I am a sample readme file. I am used for testing purposes.

<!-- start: readme-segment -->

### Some Todo header:

- [ ] Some todo item
- [ ] Some other todo item

### Some Done header:

- [x] Some done item @done(23-02-19 09:56)
- [x] Some other done item @done(23-02-19 09:56)

<!-- end: readme-segment -->

Hi!	
`;

		const segment = getSegment(readme);
		if (segment === null) throw new Error('No segment found');

		const newSegment = createSegment(todo);
		if (newSegment === segment) return; //no changes

		//if not in CI, write new readme to file for manual inspection
		if (github.context.job === undefined) {
			const newReadme = updateSegment(readme, newSegment);
			updateFileContents('./__tests__/readme-test/README_NEW.md', newReadme).catch((err) => {});
		}

		const expectedSegment = getSegment(expected);
		if (expectedSegment === null) throw new Error('No segment found in expected readme');

		const areEqual = expectedSegment === newSegment;
		console.log(areEqual);

		expect(areEqual).toBe(true);
	});

	test('Segment', () => {
		const todo = `
☐ Some beginning item

Some Todo header:
    ☐ Some todo item
    ☐ Some other todo item
    
Some Done header:
    ✔ Some done item @done(23-02-19 09:56)
    ✔ Some other done item @done(23-02-19 09:56)
`;

		const expected = `- [ ] Some beginning item

### Some Todo header:

- [ ] Some todo item
- [ ] Some other todo item

### Some Done header:

- [x] Some done item @done(23-02-19 09:56)
- [x] Some other done item @done(23-02-19 09:56)`;

		const newSegment = createSegment(todo);

		if (github.context.job === undefined) {
			updateFileContents('./__tests__/segment-test/SEGMENT-NEW.md', newSegment).catch((err) => {});
		}

		const areEqual = expected === newSegment;
		console.log(areEqual);
		expect(areEqual).toBe(true);
	});
});

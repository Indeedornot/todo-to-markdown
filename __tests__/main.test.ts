import * as fs from 'fs/promises';
import {createSegment, getSegment, updateSegment} from '../src/segments';

const getFileContents = async (path: string) => {
	//read content from ./testData
	const readme = await fs.readFile(path, 'utf8');
	return {
		content: readme,
	};
};

const updateFileContents = async (path: string, newContent: string) => {
	//write content to ./testData
	await fs.writeFile(path, newContent);
};

describe('Tests with mock functions', () => {
	test('Readme', async () => {
		const paths = {
			readme: './__tests__/readme-test/README.md',
			expected: './__tests__/readme-test/README_EXPECTED.md',
			new: './__tests__/readme-test/README_NEW.md',
			todo: './__tests__/readme-test/TODO',
		};

		const readme = await getFileContents(paths.readme);
		if (!readme) throw new Error('No readme found');

		const segment = getSegment(readme.content);
		if (segment === null) throw new Error('No segment found');

		const todo = await getFileContents(paths.todo);
		if (!todo) throw new Error('No todo found');

		const newSegment = createSegment(todo.content);
		if (newSegment === segment) return; //no changes

		const newReadme = updateSegment(readme.content, newSegment);
		await updateFileContents(paths.new, newReadme);

		const expectedReadme = getFileContents(paths.expected);
		const expectedSegment = getSegment((await expectedReadme).content);

		const areEqual = expectedSegment === newSegment;
		expect(areEqual).toBe(true);
	});
});

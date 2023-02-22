import {countLeadingWhitespaces, addLeadingWhitespace} from './jsUtils';
const makeTaskRegex = (symbols: string[]) => {
	const characterSymbols = symbols.filter((symbol) => symbol.length === 1);
	const wordSymbols = symbols.filter((symbol) => symbol.length > 1);
	const characterSymbolsRegex = characterSymbols.map((symbol) => `\\${symbol}`).join('');
	//[-❍❑■⬜□☐▪▫–—≡→›]

	const wordSymbolsRegex = wordSymbols
		.map((word) =>
			word
				.split('')
				.map((symbol) => `\\${symbol}`)
				.join('')
		)
		.join('|');
	//\[ \]|\[\]

	return new RegExp(`^\\s*([${characterSymbolsRegex}]|(${wordSymbolsRegex}))\\s?(.*)`);
};

export const taskSymbols = {
	box: ['-', '❍', '❑', '■', '⬜', '□', '☐', '▪', '▫', '–', '—', '≡', '→', '›', '[]', '[ ]'],
	done: ['✔', '✓', '☑', '+', '[x]', '[X]', '[+]'],
};

export const taskRegex = {
	box: makeTaskRegex(taskSymbols.box),
	done: makeTaskRegex(taskSymbols.done),
};

export const isTask = (line: string) => {
	const boxTask = getBoxTask(line);
	const indent = countLeadingWhitespaces(line);
	if (boxTask !== null) return {done: false, text: boxTask, indent: indent};

	const doneTask = getDoneTask(line);
	if (doneTask !== null) return {done: true, text: doneTask, indent: indent};

	return null;
};

const getDoneTask = (text: string) => {
	const doneMatch = text.match(taskRegex.done);
	if (!doneMatch) return null;

	return doneMatch[3];
};

const getBoxTask = (text: string) => {
	const boxMatch = text.match(taskRegex.box);
	if (!boxMatch) return null;

	return boxMatch[3];
};

export const taskToMarkdown = ({done, text, indent}: {done: boolean; text: string; indent: number}) => {
	const md = `- [${done ? 'x' : ' '}] ${text}`;
	return addLeadingWhitespace(md, indent);
};

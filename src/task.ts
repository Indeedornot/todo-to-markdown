import {isStringEmpty} from './jsUtils';

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
	if (boxTask !== null) return {done: false, text: boxTask};

	const doneTask = getDoneTask(line);
	if (doneTask !== null) return {done: true, text: doneTask};

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

export const taskToMarkdown = ({done, text}: {done: boolean; text: string}) => {
	return `- [${done ? 'x' : ' '}] ${text}`;
};

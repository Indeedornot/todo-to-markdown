const segment = {
	start: '<!-- start: readme-segment -->',
	end: '<!-- end: readme-segment -->',
};
const segmentRegex = new RegExp(`${segment.start}(.*)${segment.end}`, 's');

export const getSegment = (readme: string): string | null => {
	const matches = readme.match(segmentRegex);
	if (!matches || matches.length < 2) return null;
	return matches[1].trim();
};

const taskStatus = {
	notDone: '☐',
	done: '✔',
};

const isTask = (line: string) => {
	return line[0] === taskStatus.notDone || line[0] === taskStatus.done;
};

const taskToMarkdown = (line: string) => {
	const status = line[0];
	const done = status === taskStatus.done;
	const task = line.slice(2).trim();
	return `- [${done ? 'x' : ' '}] ${task}`;
};

const formatHeader = (header: string) => {
	return `\r\n### ${header}\r\n`;
};

export const createSegment = (todo: string) => {
	//split on new lines and remove empty lines
	const lines = todo.trim().split(/\s*[\r?\n]+\s*/g);
	const formattedLines = lines.map((line) => {
		if (!isTask(line)) {
			return formatHeader(line);
		}

		return taskToMarkdown(line);
	});

	return formattedLines.join('\r\n').trim();
};

const wrapSegment = (content: string) => {
	return `${segment.start}\r\n\r\n${content}\r\n\r\n${segment.end}`;
};

export const updateSegment = (readme: string, segment: string) => {
	return readme.replace(segmentRegex, wrapSegment(segment));
};

import {isTask, taskToMarkdown} from './task';
import {isStringEmpty} from './jsUtils';

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

const formatHeader = (header: string) => {
	return `\n### ${header}\n`;
};

export const createSegment = (todo: string) => {
	//split on new lines and remove empty lines
	const lines = todo.trim().split(/\s*[\r?\n]+\s*/g);
	const formattedLines = lines.map((line) => {
		const task = isTask(line);

		// '- [ ]  ' is invalid checkbox syntax
		if (task == null || isStringEmpty(task.text)) {
			return formatHeader(line);
		}

		return taskToMarkdown(task);
	});

	return formattedLines.join('\n').trim();
};

const wrapSegment = (content: string) => {
	return `${segment.start}\n\n${content}\n\n${segment.end}`;
};

export const updateSegment = (readme: string, segment: string) => {
	return readme.replace(segmentRegex, wrapSegment(segment));
};

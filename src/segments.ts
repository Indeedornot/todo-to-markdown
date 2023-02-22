import {isTask, taskToMarkdown} from './task';
import { isStringEmpty, getNonEmptyLines, trimEmptyLines } from './jsUtils';

const segment = {
	start: '<!-- start: readme-segment -->',
	end: '<!-- end: readme-segment -->',
};
const segmentRegex = new RegExp(`${segment.start}(.*)${segment.end}`, 's');

export const getSegment = (readme: string): string | null => {
	const matches = readme.match(segmentRegex);
	if (!matches || matches.length < 2) return null;
	return trimEmptyLines(matches[1]);
};

const formatHeader = (header: string) => {
	return `\n### ${header}\n`;
};

/**
 * Creates a segment from todo
 * Removes empty lines - including start and end
 */
export const createSegment = (todo: string) => {
	const lines = getNonEmptyLines(todo);
	const formattedLines = formatLines(lines);

	return formattedLines.join('\n').trim();
};

const formatLines = (lines: string[]) => {
	const formattedLines: string[] = [];
	lines.forEach((line) => {
		const task = isTask(line);
		// '- [ ]  ' is invalid checkbox syntax
		if (!task) {
			formattedLines.push(formatHeader(line));
			return;
		}

		if (isStringEmpty(task.text)) return;
		formattedLines.push(taskToMarkdown(task));
	});

	return formattedLines;
};

const wrapSegment = (content: string) => {
	return `${segment.start}\n\n${content}\n\n${segment.end}`;
};

export const updateSegment = (readme: string, segment: string) => {
	return readme.replace(segmentRegex, wrapSegment(segment));
};

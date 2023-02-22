export const isStringEmpty = (str: string): boolean => {
	if (str.trim().length === 0) return true;
	return false;
};

export const countLeadingWhitespaces = (str: string): number => {
	return str.match(/^\s*/)?.[0].length ?? 0;
};

//split on new lines and remove empty lines
export const getNonEmptyLines = (str: string): string[] => {
	return str.match(/.*\S+?(.*)$/gm) ?? [];
};

export const trimEmptyLines = (text: string): string => {
	const noLeading = trimLeadingEmptyLines(text);
	return trimTrailingEmptyLines(noLeading);
};

export const trimLeadingEmptyLines = (text: string): string => {
	return text.replace(/^\s*(\r?\n)/, '');
};

export const trimTrailingEmptyLines = (text: string): string => {
	return text.replace(/(\r?\n)\s*$(?!(\r?\n))/, '');
};

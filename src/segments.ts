const segment = {
  start: '<!-- start: readme-segment -->',
  end: '<!-- end: readme-segment -->'
};
const segmentRegex = new RegExp(`${segment.start}(.*)${segment.end}`, 's');

export const getSegment = (readme: string): string | null => {
  const matches = readme.match(segmentRegex);
  if (!matches || matches.length < 2) return null;
  return matches[1].trim();
};

export const createSegment = (todo: string) => {
  //will perform additional formatting here
  return `${todo}`;
};

const wrapSegment = (content: string) => {
  return `${segment.start}\r\n${content}\r\n${segment.end}`;
};

export const updateSegment = (readme: string, segment: string) => {
  return readme.replace(segmentRegex, wrapSegment(segment));
};

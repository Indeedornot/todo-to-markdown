import {OctoClient, RepoContext} from '.';

export const getTodo = async (octoKit: OctoClient, repoContext: RepoContext) => {
	const {owner, repo, branch} = repoContext;
	const todo = await octoKit.rest.repos.getContent({
		owner,
		repo,
		path: 'TODO',
		ref: branch,
	});

	// If content is not a file, return null
	if (todo.status !== 200) return null; //failed to get file
	if (Array.isArray(todo.data)) return null; //is directory
	if (todo.data.type !== 'file') return null; //is not a file
	if (!('content' in todo.data) || typeof todo.data.content !== 'string') return null; //no content
	return {
		...todo.data,
		content: Buffer.from(todo.data.content, 'base64').toString(),
	};
};

export const getReadme = async (octoKit: OctoClient, repoContext: RepoContext) => {
	const {owner, repo, branch} = repoContext;

	const readme = await octoKit.rest.repos.getReadme({
		owner,
		repo,
		ref: branch,
	});

	if (readme.status !== 200 || typeof readme.data.content !== 'string') return null; //failed to get file

	return {
		...readme.data,
		content: Buffer.from(readme.data.content, 'base64').toString(),
	};
};

export const updateReadme = async (
	octoKit: OctoClient,
	repoContext: RepoContext,
	path: string,
	newContent: string,
	sha: string
): Promise<void> => {
	const {owner, repo, branch} = repoContext;

	await octoKit.rest.repos.createOrUpdateFileContents({
		owner,
		repo,
		branch: branch,
		path: path,
		message: 'Update README.md',
		content: Buffer.from(newContent).toString('base64'),
		sha: sha,
	});
};

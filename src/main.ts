import * as core from '@actions/core';
import * as github from '@actions/github';
import {getReadme, getTodo, updateReadme} from './io';
import {createSegment, getSegment, updateSegment} from './segments';

const run = async (): Promise<void> => {
	try {
		const githubToken = core.getInput('GH_TOKEN', {required: true});
		if (!githubToken) throw new Error('No github token found');
		core.debug('Github token found');

		const octoKit = github.getOctokit(githubToken);
		const repoContext = github.context.repo;
		core.debug('Github context found');

		const readme = await getReadme(octoKit, repoContext);
		if (readme == null) throw new Error('No readme found');
		core.debug('Readme found');

		const segment = getSegment(readme.content);
		if (segment == null) throw new Error('No segment found');
		core.debug('Segment found in readme');

		const todo = await getTodo(octoKit, repoContext);
		if (todo == null) throw new Error('No todo found');
		core.debug('Todo found');

		const newSegment = createSegment(todo.content);
		if (newSegment === segment) {
			core.debug('No changes to readme');
			return;
		}

		const newReadme = updateSegment(readme.content, newSegment);
		await updateReadme(octoKit, repoContext, readme.path, newReadme, readme.sha);
		core.debug('Readme updated');
	} catch (error) {
		if (error instanceof Error) core.setFailed(error.message);
	}
};

run();

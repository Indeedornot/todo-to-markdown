import * as core from '@actions/core';
import * as github from '@actions/github';
import {getReadme, getTodo, updateReadme} from './io';
import {createSegment, getSegment, updateSegment} from './segments';

const run = async (): Promise<void> => {
	try {
		const githubToken = core.getInput('GH_TOKEN', {required: true});
		const octoKit = github.getOctokit(githubToken);
		const repoContext = github.context.repo;

		const readme = await getReadme(octoKit, repoContext);
		if (readme == null) throw new Error('No readme found');

		const segment = getSegment(readme.content);
		if (segment == null) throw new Error('No segment found');

		const todo = await getTodo(octoKit, repoContext);
		if (todo == null) throw new Error('No todo found');

		const newSegment = createSegment(todo.content);
		if (newSegment === segment) return; //no changes

		const newReadme = updateSegment(readme.content, newSegment);
		await updateReadme(octoKit, repoContext, readme.path, newReadme, readme.sha);
	} catch (error) {
		if (error instanceof Error) core.setFailed(error.message);
	}
};

run();

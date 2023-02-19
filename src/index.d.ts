import * as github from '@actions/github';
export type OctoClient = ReturnType<typeof github.getOctokit>;
export type RepoContext = typeof github.context.repo & {branch: string};

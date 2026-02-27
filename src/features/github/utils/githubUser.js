export const getGithubUser = (userName) => {
  const trimmed = (userName || '').trim();
  return trimmed.length > 0 ? trimmed : 'octocat';
};

export const getGithubRepo = (userName, repoName) => {
  const owner = getGithubUser(userName);
  return `${owner}/${repoName}`;
};

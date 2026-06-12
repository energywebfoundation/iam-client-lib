module.exports = {
  branches: [
    {
      name: 'master',
      channel: 'latest',
    },
    {
      name: 'intelligent-dev',
      prerelease: 'alpha',
      channel: 'canary',
    },
  ],
  repositoryUrl: 'https://github.com/energywebfoundation/iam-client-lib.git',
  extends: '@energyweb/semantic-release-config',
};

module.exports = {
  branches: [
    {
      name: 'master',
      channel: 'latest',
    },
    {
      name: 'develop',
      prerelease: 'alpha',
      channel: 'canary',
    },
  ],
  repositoryUrl: 'git@github.com:energywebfoundation/iam-client-lib.git',
  extends: '@energyweb/semantic-release-config',
};

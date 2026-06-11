module.exports = {
  branches: [
    {
      name: 'master',
      channel: 'latest',
    },
    {
      name: 'feat/claim-pagination',
      prerelease: 'alpha',
      channel: 'canary',
    },
  ],
  repositoryUrl: 'git@github.com:energywebfoundation/iam-client-lib.git',
  extends: '@energyweb/semantic-release-config',
};

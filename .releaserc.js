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
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
        releaseRules: [
          { type: 'docs', release: 'patch' },
          { type: 'style', release: 'patch' },
          { type: 'refactor', release: 'patch' },
          { type: 'perf', release: 'patch' },
        ],
        parserOpts: {
          noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES', 'BREAKING'],
        },
      },
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
        parserOpts: {
          noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES', 'BREAKING'],
        },
        presetConfig: {
          types: [
            { type: 'feat', section: 'Features' },
            { type: 'fix', section: 'Bug Fixes' },
            { type: 'docs', section: 'Documentation' },
            { type: 'style', section: 'Style changes' },
            { type: 'refactor', section: 'Refactoring' },
            { type: 'perf', section: 'Performance improvements' },
            { type: 'test', hidden: true },
            { type: 'chore', hidden: true },
            { type: 'ci', hidden: true },
          ],
        },
      },
    ],
    '@semantic-release/npm',
    '@semantic-release/github',
  ],
};

const commitAnalyzer = ["@semantic-release/commit-analyzer", {
  "preset": "angular",
  "releaseRules": [
    {"type": "docs", "scope":"readme", "release": "patch"},
    {"type": "refactor", "release": "patch"},
    {"type": "style", "release": "patch"},
    {"type": "build", "release": "patch"}
  ],
  "parserOpts": {
    "noteKeywords": ["BREAKING CHANGE", "BREAKING CHANGES"]
  }
}];

module.exports = {
  preset: 'angular',
  branches: ['main'],
  plugins: [
    commitAnalyzer,
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    '@semantic-release/github',
    '@semantic-release/git',
    '@semantic-release/npm'
  ],
};

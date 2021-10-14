const presets = {
  targets: { node: 'current' },
  useBuiltIns: "entry",
  corejs: "3.18"
};

module.exports = {
  presets: [
    ['@babel/preset-env', presets],
    '@babel/preset-typescript',
  ],
};

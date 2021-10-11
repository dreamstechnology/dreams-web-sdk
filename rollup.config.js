import resolve from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';
import typescript from '@rollup/plugin-typescript';

const name = 'DreamsWebSDK';
const mainFields = ['main', 'module', 'browser']
const extensions = ['.js', '.ts'];
const babelConfig = {
  babelHelpers: 'bundled',
  include: ['src/**/*'],
  extensions,
  targets: "defaults",
  sourceMaps: true,
  presets: [
    ["@babel/preset-env", { useBuiltIns: "entry" }]
  ]
}

export default {
  input: './src/main.ts',
  external: [],
  plugins: [
    resolve({ extensions, mainFields }),
    commonjs(),
    babel(babelConfig),
    typescript()
  ],

  output: [
    { file: pkg.main, format: 'cjs', name },
    { file: pkg.module, format: 'es' },
  ],
};

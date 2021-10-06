import resolve from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';

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

  // Specify here external modules which you don't want to include in your bundle (for instance: 'lodash', 'moment' etc.)
  // https://rollupjs.org/guide/en/#external
  external: [],

  plugins: [
    // Allows node_modules resolution
    resolve({ extensions, mainFields }),

    // Allow bundling cjs modules. Rollup doesn't understand cjs
    commonjs(),

    // Compile TypeScript/JavaScript files
    babel(babelConfig),
  ],

  output: [
    { file: pkg.main, format: 'cjs', name },
    { file: pkg.module, format: 'es' },
  ],
};

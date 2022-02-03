import resolve from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';
import typescript from '@rollup/plugin-typescript';

const name = 'DreamsWebSDK';
const extensions = ['.ts'];
const babelConfig = {
  include: ['src/**/*'],
  extensions,
}

export default {
  input: './src/main.ts',
  external: [],
  plugins: [
    resolve({ extensions }),
    commonjs(),
    babel(babelConfig),
    typescript()
  ],
  output: [
    { file: pkg.main, format: 'cjs', name, sourcemap: true },
    { file: pkg.module, format: 'es', sourcemap: true },
  ],
};

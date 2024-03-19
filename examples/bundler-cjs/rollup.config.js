import commonjs from '@rollup/plugin-commonjs';

export default [
  {
    input: 'index.js',
    plugins: [],
    output: {
      dir: 'dist',
      format: 'es',
      exports: 'named',
      sourcemap: true,
    },
  },
];

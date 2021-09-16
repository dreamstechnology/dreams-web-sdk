import resolve from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';

const name = 'DreamsWebSDK';

const extensions = [
  '.js', '.ts',
];

const babelConfig = {
  babelHelpers: 'bundled',
  include: ['src/**/*'],
  extensions
}

export default {
  input: './src/main.ts',

  // Specify here external modules which you don't want to include in your bundle (for instance: 'lodash', 'moment' etc.)
  // https://rollupjs.org/guide/en/#external
  external: [],

  plugins: [
    // Allows node_modules resolution
    resolve({ extensions }),

    // Allow bundling cjs modules. Rollup doesn't understand cjs
    commonjs(),

    // Compile TypeScript/JavaScript files
    babel(babelConfig),
  ],

  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' },
    // https://rollupjs.org/guide/en/#outputglobals
    { file: pkg.browser, format: 'umd', name }
  ],
};

// export default [
//   {
//     input: 'src/main.ts',
//     output: [
//       { name: 'DreamsWebSDK', file: pkg.browser, format: 'umd' },
//       { file: pkg.main, format: 'cjs' },
//       { file: pkg.module, format: 'es' }
//     ],
//     plugins: [
//       resolve(),
//       commonjs(),
//       babel(babelConfig)
//     ]
//   },

//   // CommonJS (for Node) and ES module (for bundlers) build.
//   // (We could have three entries in the configuration array
//   // instead of two, but it's quicker to generate multiple
//   // builds from a single configuration where possible, using
//   // an array for the `output` option, where we can specify
//   // `file` and `format` for each target)
//   // {
//   //   input: 'src/main.js',
//   //   external: [],
//   //   output: [
//   //     { file: pkg.main, format: 'cjs' },
//   //     { file: pkg.module, format: 'es' }
//   //   ]
//   // }
// ];

import nodeResolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import ts from "rollup-plugin-ts";
import del from 'rollup-plugin-delete'
import pkg from "./package.json" assert { type: 'json' };

const extensions = [".ts", ".js"]
const input = ["src/index.ts"];

export default [
  // Minified UMD
  {
    input,
    plugins: [
      nodeResolve({extensions}),
      commonjs(),
      babel({
        babelHelpers: "bundled",
        presets: [
          ['@babel/preset-typescript', {}],
          [
            "@babel/preset-env",
            {
              "modules": false,
              "useBuiltIns": "usage",
              "corejs": "3.22",
              "targets": "> 0.25%, last 2 versions, Firefox ESR, not dead"
            }
          ]
        ],
        extensions,
        include: ['src/**/*'],
      }),
      terser(),
    ],
    output: {
      file: `dist/umd/${pkg.name}.min.js`,
      format: "umd",
      name: "dreamsWebSdk",
      esModule: false,
      exports: "named",
      sourcemap: true,
    },
  },
  // ESM and CJS
  {
    input,
    plugins: [
      nodeResolve({
        extensions,
      }),
      babel({
        babelHelpers: "bundled",
        presets: ['@babel/preset-typescript'],
        extensions,
        include: ['src/**/*'],
      }),
    ],
    output: [
      {
        dir: "dist/esm",
        format: "esm",
        exports: "named",
        sourcemap: true,
      },
      {
        dir: "dist/cjs",
        format: "cjs",
        exports: "named",
        sourcemap: true,
      },
    ],
  },
  // TS Type Declarations
  {
    input,
    plugins: [
      // this generates compiled .js too (not only declarations)...
      ts(),
      // so we clean that up at the very end
      del({
        targets: 'dist/types/*.js',
        hook: 'closeBundle',
        verbose: true,
      })
    ],
    output: {
      dir: "dist/types",
    }
  }
];

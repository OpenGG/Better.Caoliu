const {
  resolve,
} = require('path');

const fs = require('fs-extra');

const babel = require('rollup-plugin-babel');

const banner = fs.readFile(
  resolve(__dirname, 'src/banner.js')
);

export default {
  input: 'src/index.js',
  output: {
    banner,
    file: 'dist/index.js',
    format: 'iife',
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};

import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import babel from 'rollup-plugin-babel';
import copy from 'rollup-plugin-copy';

export default {
  input: 'src/main.js',
  output: {
    file: 'public/rollup.js',
    format: 'iife',
    name: 'index',
    sourcemap: true,
  },
  plugins: [
    nodeResolve({ browser: true, preferBuiltins: false }),
    commonjs({
      transformMixedEsModules: true
    }),
    json(),
    nodePolyfills(),
    babel(),
    copy({
      targets: [
        { src: 'node_modules/itk/WebWorkers', dest: 'public/itk' },
        { src: 'node_modules/itk/ImageIOs', dest: 'public/itk' },
        { src: 'node_modules/itk/MeshIOs', dest: 'public/itk' },
      ]
    })
  ]
}
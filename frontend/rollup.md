# Rollup Configuration

## rollup.config.js
```js
// rollup.config.js
import vue from 'rollup-plugin-vue'
import css from 'rollup-plugin-css-only'
import typescript from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { name } from '../package.json'
const file = type => `dist/${name}.${type}.js`
const overrides = {
  compilerOptions: { declaration: true },
  exclude: ["tests/**/*.ts", "tests/**/*.tsx"]
}
export { name, file }
export default {
  input: 'src/index.ts',
  output: {
    name,
    file: file('esm'),
    format: 'es'
  },
  plugins: [
    nodeResolve(),
    typescript({ tsconfigOverride: overrides }),
    vue(),
    css({ output: 'bundle.css' })
  ],
  external: ['vue', 'lodash-es']
}
```
## rollup.esm.config.js
```js
import basicConfig, { name, file } from './rollup.config'
export default {
  ...basicConfig,
  output: {
    name,
    file: file('esm'),
    format: 'es'
  }
}
```
## rollup.umd.config.js
```js
import basicConfig, { name, file } from './rollup.config'
export default {
  ...basicConfig,
  output: {
    name: 'LegoComponents',
    file: file('umd'),
    format: 'umd',
    globals: {
      'vue': 'Vue',
      'lodash-es': '_'
    },
    exports: 'named'
  }
}
```

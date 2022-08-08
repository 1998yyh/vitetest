# Vue 3 + TypeScript + Vite

## 初始化
``` js
pnpm create vite
```


### CSS 预处理器

Vite 本身对 CSS 各种预处理器语言(Sass/Scss、Less和Stylus)做了内置支持

由于 Vite 底层会调用 CSS 预处理器的官方库进行编译，而 Vite 为了实现按需加载，并没有内置这些工具库，而是让用户根据需要安装。

``` js
pnpm i sass -D
```

### 自动引入方案


```js
// vite.config.ts
import { normalizePath } from 'vite';
// 如果类型报错，需要安装 @types/node: pnpm i @types/node -D
import path from 'path';

// 全局 scss 文件的路径
// 用 normalizePath 解决 window 下的路径问题
const variablePath = normalizePath(path.resolve('./src/variable.scss'));

export default defineConfig({
  // css 相关的配置
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData 的内容会在每个 scss 文件的开头自动注入
        additionalData: `@import "${variablePath}";`
      }
    }
  }
})
```


### PostCSS

一般你可以通过 postcss.config.js 来配置 postcss ，不过在 Vite 配置文件中已经提供了 PostCSS 的配置入口，我们可以直接在 Vite 配置文件中进行操作。

https://www.postcss.parts/ 插件大全

``` js
pnpm i autoprefixer -D
```

使用

``` js
// vite.config.ts 增加如下的配置
import autoprefixer from 'autoprefixer';

export default {
  css: {
    // 进行 PostCSS 配置
    postcss: {
      plugins: [
        autoprefixer({
          // 指定目标浏览器
          overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11']
        })
      ]
    }
  }
}
```

### postcss-pxtorem
用来将 px 转换为 rem 单位，在适配移动端的场景下很常用。

``` js
pnpm i postcss-pxtorem -D
```

使用

``` js
// vite.config.ts 增加如下的配置
import postcssPxtorem from 'postcss-pxtorem';

export default {
  css: {
    // 进行 PostCSS 配置
    postcss: {
      plugins: [
        postcssPxtorem({
          rootValue: 20,
          propList: [*],
        })
      ]
    }
  }
}
```


### postcss-preset-env
可以编写最新的 CSS 语法，不用担心兼容性问题。


### cssnano
主要用来压缩 CSS 代码，跟常规的代码压缩工具不一样，它能做得更加智能，比如提取一些公共样式进行复用、缩短一些常见的属性值等等。



## 格式化

``` js
pnpm i eslint -D

npx eslint --init

```

下面是初始化的时候一些问题
``` 
? How would you like to use ESLint? (Use arrow keys) // 你想怎样使用eslint
  To check syntax only //只检查语法
  To check syntax and find problems//检查语法、发现问题
> To check syntax, find problems, and enforce code style//检查语法、发现问题并执行代码样式

? What type of modules does your project use? (Use arrow keys) // 您的项目使用什么类型的模块?
> JavaScript modules (import/export)
  CommonJS (require/exports)
  None of these

? Which framework does your project use? (Use arrow keys) // 项目中使用的什么框架？
  React
> Vue.js
  None of these

? Where does your code run? (Press <space> to select, <a> to toggle all, <i> to invert selection) // 你的代码运行在什么地方？(多选)
>(*) Browser // 浏览器
 ( ) Node // node

? How would you like to define a style for your project? (Use arrow keys) // 您想如何为您的项目定义一个样式?
> Use a popular style guide // 使用流行的风格指南
  Answer questions about your style // 回答关于你的风格的问题
  Inspect your JavaScript file(s) // 检查JavaScript文件

? Which style guide do you want to follow? 那种风格
> standard

```


### 配置属性

#### 1. parser - 解析器

`ESLint` 底层默认使用 `Espree`来进行 AST 解析，这个解析器目前已经基于 `Acron` 来实现，虽然说 `Acron` 目前能够解析绝大多数的 ECMAScript 规范的语法，但还是不支持 `TypeScript` ，因此需要引入其他的解析器完成 TS 的解析。

社区提供了`@typescript-eslint/parser`这个解决方案，专门为了 `TypeScript` 的解析而诞生，将 `TS` 代码转换为 Espree 能够识别的格式(即 `Estree` 格式)，然后在 `Eslint` 下通过`Espree`进行格式检查， 以此兼容了 `TypeScript` 语法。


#### 2. parserOptions - 解析器选项

`ecmaVersion`: 这个配置和 Acron 的 ecmaVersion 是兼容的，可以配置 ES + 数字(如 ES6)或者ES + 年份(如 ES2015)，也可以直接配置为latest，启用最新的 ES 语法。
`sourceType`: 默认为script，如果使用 ES Module 则应设置为module
`ecmaFeatures`: 为一个对象，表示想使用的额外语言特性，如开启 jsx。

#### 3. rules - 具体代码规则

在 rules 对象中，key 一般为规则名，value 为具体的配置内容,对于规则的 ID，它的语法对所有规则都适用，你可以设置以下的值:

`off` 或 0: 表示关闭规则。
`warn` 或 1: 表示开启规则，不过违背规则后只抛出 warning，而不会导致程序退出。
`error` 或 2: 表示开启规则，不过违背规则后抛出 error，程序会退出。


#### 4. plugins

ESLint 本身没有内置 TypeScript 的代码规则，这个时候 ESLint 的插件系统就派上用场了。我们需要通过添加 ESLint 插件来增加一些特定的规则，比如添加@typescript-eslint/eslint-plugin 来拓展一些关于 TS 代码的规则

值得注意的是，添加插件后只是拓展了 ESLint 本身的规则集，但 ESLint 默认并没有开启这些规则的校验！如果要开启或者调整这些规则，你需要在 rules 中进行配置，如:

``` js
module.exports = {
  // 开启一些 TS 规则
  rules: {
    '@typescript-eslint/ban-ts-comment': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
  }
}

```
####  5. extends - 继承配置

extends 相当于继承另外一份 ESLint 配置，可以配置为一个字符串，也可以配置成一个字符串数组。


#### 6. env 和 globals

这两个配置分别表示运行环境和全局变量，在指定的运行环境中会预设一些全局变量，比如:

``` js
module.export = {
  "env": {
    "browser": "true",
    "node": "true"
  }
}
```


有些全局变量是业务代码引入的第三方库所声明，这里就需要在globals配置中声明全局变量

```js
module.exports = {
  "globals": {
    // 不可重写
    "$": false, 
    "jQuery": false 
  }
}
```

### Prettier

``` js
pnpm i prettier eslint-config-prettier eslint-plugin-prettier -D

```

其中eslint-config-prettier用来覆盖 ESLint 本身的规则配置，而eslint-plugin-prettier则是用于让 Prettier 来接管eslint --fix即修复代码的能力。


同时我们需要再vite 中接入eslint 

``` js
pnpm i vite-plugin-eslint -D

```

``` js
import viteEslint from 'vite-plugin-eslint';

{
  plugins: [
    viteEslint(),
  ]
}

```

这样我们可以再 package.json 里定义一个脚本

``` js
"lint:script": "eslint --ext .js,.jsx,.ts,.tsx --fix --quiet ./",
```

这样我们就可以做一些 比如pre-commit的一些校验了


### stylelint


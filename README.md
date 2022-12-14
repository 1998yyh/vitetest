# Vue 3 + TypeScript + Vite

## 参考文档等
1. 15个vue3生态的库
https://javascript.plainenglish.io/15-game-changing-tools-in-vue-3-ecosystem-2998f117bae7

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

Stylelint 主要专注于样式代码的规范检查，内置了 170 多个 CSS 书写规则，支持 CSS 预处理器(如 Sass、Less)，提供插件化机制以供开发者扩展规则，已经被 Google、Github 等大型团队投入使用。与 ESLint 类似，在规范检查方面，Stylelint 已经做的足够专业，而在代码格式化方面，我们仍然需要结合 Prettier 一起来使用。

安装：
``` js
pnpm i stylelint stylelint-prettier stylelint-config-prettier stylelint-config-recess-order stylelint-config-standard stylelint-config-standard-scss -D

```

``` js
// .stylelintrc.js
module.exports = {
  // 注册 stylelint 的 prettier 插件
  plugins: ['stylelint-prettier'],
  // 继承一系列规则集合
  extends: [
    // standard 规则集合
    'stylelint-config-standard',
    // standard 规则集合的 scss 版本
    'stylelint-config-standard-scss',
    // 样式属性顺序规则
    'stylelint-config-recess-order',
    // 接入 Prettier 规则
    'stylelint-config-prettier',
    'stylelint-prettier/recommended'
  ],
  // 配置 rules
  rules: {
    // 开启 Prettier 自动格式化功能
    'prettier/prettier': true
  }
};

```

可以发现 Stylelint 的配置文件和 ESLint 还是非常相似的，常用的plugins、extends和rules属性在 ESLint 同样存在，并且与 ESLint 中这三个属性的功能也基本相同。

接下来我们将 Stylelint 集成到项目中，回到 package.json 中，增加如下的 scripts 配置:

``` js
{
  "scripts": {
    // 整合 lint 命令
    "lint": "npm run lint:script && npm run lint:style",
    // stylelint 命令
    "lint:style": "stylelint --fix \"src/**/*.{css,scss}\""
  }
}

```


当然，我们也可以直接在 Vite 中集成 Stylelint。社区中提供了 Stylelint 的 Vite 插件，实现在项目开发阶段提前暴露出样式代码的规范问题。我们来安装一下这个插件:

``` js
pnpm i @amatlash/vite-plugin-stylelint -D
```


然后在 Vite 配置文件中添加如下的内容:

``` js

import viteStylelint from '@amatlash/vite-plugin-stylelint';

// 具体配置
{
  plugins: [
    // 省略其它插件
    viteStylelint({
      // 对某些文件排除检查
      exclude: /windicss|node_modules/
    }),
  ]
}

```


### Husky + lint-staged 的 Git 提交工作流集成

我们可以在代码提交的时候进行卡点检查，也就是拦截 git commit 命令，进行代码格式检查，只有确保通过格式检查才允许正常提交代码。社区中已经有了对应的工具——Husky来完成这件事情，让我们来安装一下这个工具:

``` js
pnpm i husky -D
pnpm i -D lint-staged
```

然后初始化`npx husky install`，并将 `husky install`作为项目启动前脚本，如:

``` js
{
  "scripts": {
    // 会在安装 npm 依赖后自动执行
    "postinstall": "husky install"
  }
}
```

添加 Husky 钩子，在终端执行如下命令:

``` js
npx husky add .husky/pre-commit "npm run lint"

```

执行 git commit 的时候，会首先执行 npm run lint脚本，通过 Lint 检查后才会正式提交代码记录。

但是这会产生一个额外的问题: Husky 中每次执行npm run lint都对仓库中的代码进行全量检查，也就是说，即使某些文件并没有改动，也会走一次 Lint 检查，当项目代码越来越多的时候，提交的过程会越来越慢，影响开发体验。

``` js
{
  "lint-staged": {
    "**/*.{js,jsx,tsx,ts}": [
      "npm run lint:script",
      "git add ."
    ],
    "**/*.{scss}": [
      "npm run lint:style",
      "git add ."
    ]
  }
}

```

接下来我们需要在 Husky 中应用lint-stage，回到.husky/pre-commit脚本中，将原来的npm run lint换成如下脚本:

``` js
npx --no -- lint-staged
```

如此一来，我们便实现了提交代码时的增量 Lint 检查。


### commit lint

安装：

``` js
pnpm i commitlint @commitlint/cli @commitlint/config-conventional -D

```


一般我们直接使用@commitlint/config-conventional规范集就可以了，它所规定的 commit 信息一般由两个部分: type 和 subject 组成，结构如下:


``` js
// type 指提交的类型
// subject 指提交的摘要信息
<type>: <subject>

```

常用的 type 值包括如下:

* feat: 添加新功能。
* fix: 修复 Bug。
* chore: 一些不影响功能的更改。
* docs: 专指文档的修改。
* perf: 性能方面的优化。
* refactor: 代码重构。
* test: 添加一些测试代码等等。

然后将commitlint的功能集成到Husky的钩子当中，
``` js
npx husky add .husky/commit-msg "npx --no-install commitlint -e $HUSKY_GIT_PARAMS"

```
输入一个错误的 commit 信息，commitlint 会自动抛出错误并退出


## 资源加载

而静态资源本身并不是标准意义上的模块，因此对它们的处理和普通的代码是需要区别对待的。一方面我们需要解决资源加载的问题，对 Vite 来说就是如何将静态资源解析并加载为一个 ES 模块的问题；另一方面在生产环境下我们还需要考虑静态资源的部署问题、体积问题、网络性能问题，并采取相应的方案来进行优化。

### SVG 组件方式加载

插件安装
```  js
pnpm i vite-svg-loader -D

```

使用方式：

``` js
<template>
  <MyIcon />
</template>

<script setup>
import MyIcon from './my-icon.svg'
</script>
```


### JSON自动解析 
``` js
// vite.config.ts

{
  json: {
    stringify: true
  }
}

```

### Web Worker 脚本

引入的时候注意加上?worker后缀，相当于告诉 Vite 这是一个 Web Worker 脚本文件

`?url`: 表示获取资源的路径，这在只想获取文件路径而不是内容的场景将会很有用。
`?raw`: 表示获取资源的字符串内容，如果你只想拿到资源的原始内容，可以使用这个后缀。
`?inline`: 表示资源强制内联，而不是打包成单独的文件。

### 其他静态资源

你可以在 Vite 将这些类型的文件当做一个 ES 模块来导入使用

媒体类文件，包括mp4、webm、ogg、mp3、wav、flac和aac。
字体类文件。包括woff、woff2、eot、ttf 和 otf。
文本类。包括webmanifest、pdf和txt。

``` JavaScript
// vite.config.ts
{
  assetsInclude: ['.txt']
}
```

##  生产处理

### 自定义部署域名

#### 方式一（全局）
``` js

// vite.config.ts
// 是否为生产环境，在生产环境一般会注入 NODE_ENV 这个环境变量，见下面的环境变量文件配置
const isProduction = process.env.NODE_ENV === 'production';
// 填入项目的 CDN 域名地址
const CDN_URL = 'xxxxxx';

// 具体配置
{
  base: isProduction ? CDN_URL: '/'
}

// .env.development
NODE_ENV=development

// .env.production
NODE_ENV=production

```

#### 方式二（局部）

我们可以通过定义环境变量的方式来解决这个问题，在项目根目录新增.env文件:


``` js
// .env 文件
VITE_IMG_BASE_URL=https://my-image-cdn.com
```

然后我们就可以在组件中使用这个变量了 

```js
new URL('./logo.png', import.meta.env.VITE_IMG_BASE_URL).href
```


### 资源压缩
Vite 中内置的优化方案是下面这样的:

如果静态资源体积 >= 4KB，则提取成单独的文件

如果静态资源体积 < 4KB，则作为 base64 格式的字符串内联

上述的4 KB即为提取成单文件的临界值，当然，这个临界值你可以通过build.assetsInlineLimit自行配置，如下代码所示:

```js
// vite.config.ts
{
  build: {
    // 8 KB
    assetsInlineLimit: 8 * 1024
  }
}
```


### 图片压缩


```js
pnpm i vite-plugin-imagemin -D

//vite.config.ts
import viteImagemin from 'vite-plugin-imagemin';

{
  plugins: [
    // 忽略前面的插件
    viteImagemin({
      // 无损压缩配置，无损压缩下图片质量不会变差
      optipng: {
        optimizationLevel: 7
      },
      // 有损压缩配置，有损压缩下图片质量可能会变差
      pngquant: {
        quality: [0.8, 0.9],
      },
      // svg 优化
      svgo: {
        plugins: [
          {
            name: 'removeViewBox'
          },
          {
            name: 'removeEmptyAttrs',
            active: false
          }
        ]
      }
    })
  ]
}


```


### 自定义拆包

``` js
pnpm i vite-plugin-chunk-split -D

// vite.config.ts
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';

export default {
  chunkSplitPlugin({
    // 指定拆包策略
    customSplitting: {
      // 1. 支持填包名。`react` 和 `react-dom` 会被打包到一个名为`render-vendor`的 chunk 里面(包括它们的依赖，如 object-assign)
      'react-vendor': ['vue', 'pina'],
      // 2. 支持填正则表达式。src 中 components 和 utils 下的所有文件被会被打包为`component-util`的 chunk 中
      'components-util': [/src\/components/, /src\/utils/]
    }
  })
}

```


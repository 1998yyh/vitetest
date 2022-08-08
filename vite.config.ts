import { defineConfig, normalizePath } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import postcssPxtorem from 'postcss-pxtorem'
import tailwindcss from 'tailwindcss'
import viteEslint from 'vite-plugin-eslint'
import cssnano from 'cssnano'
import path from 'path'

// 全局 scss 文件的路径
// 用 normalizePath 解决 window 下的路径问题
const variablePath = normalizePath(path.resolve('./src/variable.scss'))

export default defineConfig({
    plugins: [vue(), viteEslint()],
    // css 相关的配置
    css: {
        preprocessorOptions: {
            scss: {
                // additionalData 的内容会在每个 scss 文件的开头自动注入
                additionalData: `@import "${variablePath}";`
            }
        },
        // 进行 PostCSS 配置
        postcss: {
            plugins: [
                autoprefixer({
                    // 指定目标浏览器
                    overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11']
                }),
                postcssPxtorem({
                    rootValue: 20,
                    propList: ['*']
                }),
                cssnano({
                    preset: 'default'
                })
                // tailwindcss(),
            ]
        }
    }

})

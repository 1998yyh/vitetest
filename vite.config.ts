import { defineConfig, normalizePath } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import postcssPxtorem from 'postcss-pxtorem'
import svgr from 'vite-svg-loader'
// import tailwindcss from 'tailwindcss'
// ! 这个家伙暴露出来的不是函数 是个对象
import viteStylelint from '@amatlash/vite-plugin-stylelint'
import viteEslint from 'vite-plugin-eslint'
import cssnano from 'cssnano'
import path from 'path'

const _viteStylelint = (viteStylelint as Record<string, any>).default

const isProduction = process.env.NODE_ENV === 'production'
// 填入项目的 CDN 域名地址
const CDN_URL = 'xxxxxx'

// 全局 scss 文件的路径
// 用 normalizePath 解决 window 下的路径问题
const variablePath = normalizePath(path.resolve('./src/variable.scss'))

export default defineConfig({
    base: isProduction ? CDN_URL : '/',
    plugins: [
        vue(),
        svgr(),
        viteEslint(),
        _viteStylelint({
            // 对某些文件排除检查
            exclude: /windicss|node_modules/
        })
    ],
    resolve: {
        alias: {
            '@assets': path.join(__dirname, 'src/assets')
        }
    },
    // 处理JSON解析
    json: {
        stringify: true
    },
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
    },
    assetsInclude: ['.txt']
})

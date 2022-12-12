import {svelte} from '@sveltejs/vite-plugin-svelte'
import svelte_preprocess from 'svelte-preprocess'
import postcssNesting from 'postcss-nesting'
import path from 'path'

const is_build = process.argv.includes('build')
const build_config = {
    lib: {
        entry: 'src/main.js',
        formats: ['es'],
        fileName: (format) => `bundle.${format}.js`,
    },
    rollupOptions: {
        output: {
            entryFileNames: 'bundle.js',
            assetFileNames: 'bundle.css',
        },
    },
}
export default {
    publicDir: is_build ? false : 'public',
    build: {
        reportCompressedSize: false,
        minify: false,
        ...(is_build ? build_config : {}),
    },
    server: {host: !!process.env.VITE_HOST},
    resolve: {
        alias: [{find: '~', replacement: path.resolve('src')}],
    },
    plugins: [
        svelte({
            preprocess: [
                svelte_preprocess({markupTagName: 'not_a_tag', postcss: {plugins: [postcssNesting()]}}),
            ],
        }),
    ],
}

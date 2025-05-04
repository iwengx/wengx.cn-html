import UnoCSS from 'unocss/vite'
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/',
  plugins: [UnoCSS()],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          let extType = info[info.length - 1]
          if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)) {
            extType = 'media'
          } else if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(assetInfo.name)) {
            extType = 'img'
          } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
            extType = 'fonts'
          }
          return `${extType}/[name]-[hash][extname]`
        },
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
      },
      input: {
        main: resolve(__dirname, 'index.html'),
        programhome: resolve(__dirname, 'programhome.html'),
        support: resolve(__dirname, 'support.html'),
      },
    },
  },
  server: {
    host: true,
    port: 8080,
  },
})

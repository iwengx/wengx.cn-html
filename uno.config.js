// import presetWind4 from '@unocss/preset-wind4'
import presetWind3 from '@unocss/preset-wind3'
import { defineConfig, toEscapedSelector as e } from 'unocss'

export default defineConfig({
  presets: [presetWind3()],
  rules: [
    // 隐藏滚动条但保留滚动功能
    [
      /^hide-scrollbar$/,
      (_, record) => {
        const { rawSelector } = record
        const selector = e(rawSelector)
        return `${selector}{-ms-overflow-style: none;scrollbar-width: none;}
${selector}::-webkit-scrollbar{display: none;}`
      },
    ],
  ],
})

// import presetWind4 from '@unocss/preset-wind4' // 版本太高新语法多，部分浏览器还不兼容
import presetWind3 from '@unocss/preset-wind3'
import { defineConfig, toEscapedSelector as e } from 'unocss'

export default defineConfig({
  presets: [presetWind3()],
  shortcuts: {
    // 底部的链接按钮
    'btn-link':
      'flex items-center mx-1 rounded p-[5px] transition-[box-shadow,background-color] duration-150 ease-in-out hover:bg-[#f7d51d] hover:shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px]',

    // 首页卡片容器
    'main-container':
      'w-full h-full md:aspect-video md:max-w-[1680px] md:max-h-[1050px] md:rounded-xl bg-white overflow-hidden shadow-[rgba(0,0,0,0.45)_0px_25px_20px_-20px] backface-hidden transition-transform transition-duration-800',
  },
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

    ['text-minecraft', { 'text-shadow': '2px 2px 0px rgba(0,0,0,0.8)' }],
    ['text-minecraft-sm', { 'text-shadow': '1px 1px 0px rgba(0,0,0,0.8)' }],
    ['shadow-minecraft', { 'box-shadow': 'inset -4px -4px 0px rgba(0,0,0,0.3), inset 4px 4px 0px rgba(255,255,255,0.1)' }],
    ['shadow-minecraft-sm', { 'box-shadow': 'inset -2px -2px 0px rgba(0,0,0,0.5), inset 2px 2px 0px rgba(255,255,255,0.1)' }],
  ],
})

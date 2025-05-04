// import presetWind4 from '@unocss/preset-wind4'
import presetWind3 from '@unocss/preset-wind3'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [presetWind3()],
  rules: [
    // 隐藏滚动条但保留滚动功能
    [
      'hide-scrollbar',
      {
        '-ms-overflow-style': 'none' /* IE/Edge */,
        'scrollbar-width': 'none' /* Firefox */,
        '&::-webkit-scrollbar': {
          /* WebKit */ display: 'none',
        },
      },
    ],
  ],
})

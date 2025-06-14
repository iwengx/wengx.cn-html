const wrapperEl = document.getElementById('wengxcn-wrapper')
const logoEl = document.getElementById('wengxcn-logo')

// 监听滚动事件，当滚动时 logo 旋转 90 度
wrapperEl.addEventListener('scroll', (e) => {
  const { scrollTop } = e.target
  if (scrollTop > 0) {
    logoEl.style.transform = 'rotate(90deg)'
  } else {
    logoEl.style.transform = ''
  }
})

// 软件版本
const llhVersion = '2.5.6'
// 下载链接
const downloadLink = `https://slink.ltd/https://github.com/iwengx/Minecraft-Lil-liver-helper/releases/download/${llhVersion}/minecraft-lil-liver-helper-v${llhVersion}.exe`
// 给下载按钮添加下载链接
const downloadEl = document.getElementById('wengxcn-download')
downloadEl.setAttribute('href', downloadLink)

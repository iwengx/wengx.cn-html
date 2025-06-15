/** 监听滚动事件，当滚动时 logo 旋转 90 度 */
const wrapperEl = document.getElementById('wengxcn-wrapper')
const logoEl = document.getElementById('wengxcn-logo')
wrapperEl.addEventListener('scroll', (e) => {
  const { scrollTop } = e.target
  if (scrollTop > 0) {
    logoEl.style.transform = 'rotate(90deg)'
  } else {
    logoEl.style.transform = ''
  }
})

/** 软件下载配置 */
const llhVersion = '2.5.6'
const downloadLink = `https://slink.ltd/https://github.com/iwengx/Minecraft-Lil-liver-helper/releases/download/${llhVersion}/minecraft-lil-liver-helper-v${llhVersion}.exe`
const downloadEl = document.getElementById('wengxcn-download')
downloadEl.setAttribute('href', downloadLink)

/** 卡片翻转 */
const faceCreeper = document.querySelector('#face-creeper')
const backCreeper = document.querySelector('#back-creeper')
const homeMain = document.querySelector('#home-main')
const sponsorMain = document.querySelector('#sponsor-main')

const sponsorIframe = document.createElement('iframe')
sponsorIframe.src = './support.html'
sponsorIframe.className = 'w-full h-full'
sponsorIframe.setAttribute('frameborder', '0')

faceCreeper.addEventListener('click', () => {
  homeMain.style.transform = 'rotateY(-180deg)'
  homeMain.style.zIndex = '0'
  sponsorMain.style.transform = 'rotateY(0)'
  sponsorMain.style.zIndex = '10'
  if (!sponsorMain.contains(sponsorIframe)) {
    sponsorMain.appendChild(sponsorIframe)
  }
})

backCreeper.addEventListener('click', () => {
  homeMain.style.transform = ''
  homeMain.style.zIndex = ''
  sponsorMain.style.transform = ''
  sponsorMain.style.zIndex = ''
})

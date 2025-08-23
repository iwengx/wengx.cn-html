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
const llhVersion = '2.5.7'
const downloadLink = `https://github.099899.xyz/Minecraft-Lil-liver-helper/minecraft-lil-liver-helper-v${llhVersion}.exe`
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
sponsorIframe.style.opacity = '0'
sponsorIframe.style.transition = 'opacity .3s'
sponsorIframe.setAttribute('frameborder', '0')

faceCreeper.addEventListener('click', () => {
  homeMain.style.transform = 'rotateY(-180deg)'
  homeMain.style.zIndex = '0'
  sponsorMain.style.transform = 'rotateY(0)'
  sponsorMain.style.zIndex = '10'
  if (!sponsorMain.contains(sponsorIframe)) {
    // 执行苦力怕爆炸动画
    const crepper = document.querySelector('#creeper-boom')
    crepper.style.display = ''

    // 动态载入赞助页面
    sponsorMain.appendChild(sponsorIframe)

    // 动态载入 confetti
    const confettiScript = document.createElement('script')
    confettiScript.src = './js/confetti.browser.min.js'
    document.head.appendChild(confettiScript)

    // 模拟苦力怕爆炸粒子
    setTimeout(() => {
      if (confetti) {
        // 绿色粒子爆炸（主色调）
        confetti({
          particleCount: 250,
          spread: 360,
          origin: { y: 0.8 },
          colors: ['#7CFC00', '#00AA00', '#008000'],
          shapes: ['circle', 'square'],
          gravity: 0.5,
          scalar: 1,
        })
        // 模拟烟雾（灰色粒子）
        confetti({
          particleCount: 150,
          spread: 360,
          origin: { y: 0.8 },
          colors: ['#AAAAAA', '#DDDDDD'],
          gravity: 0.2,
          scalar: 1.2,
          decay: 1,
        })
      }

      // 爆炸完后显示赞助页面
      sponsorIframe.style.opacity = ''
    }, 3800)
  }
})

backCreeper.addEventListener('click', () => {
  homeMain.style.transform = ''
  homeMain.style.zIndex = ''
  sponsorMain.style.transform = ''
  sponsorMain.style.zIndex = ''
})

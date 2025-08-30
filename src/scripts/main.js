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

/** 立刻下载 */
const expandBtn = document.getElementById('expandBtn')
expandBtn.addEventListener('click', function (e) {
  e.preventDefault() // 阻止默认跳转行为

  // 获取鼠标点击位置
  const mouseX = e.clientX
  const mouseY = e.clientY

  // 计算需要的圆形半径（确保能覆盖整个屏幕）
  const maxDistance = Math.max(
    Math.sqrt(mouseX * mouseX + mouseY * mouseY),
    Math.sqrt((window.innerWidth - mouseX) * (window.innerWidth - mouseX) + mouseY * mouseY),
    Math.sqrt(mouseX * mouseX + (window.innerHeight - mouseY) * (window.innerHeight - mouseY)),
    Math.sqrt((window.innerWidth - mouseX) * (window.innerWidth - mouseX) + (window.innerHeight - mouseY) * (window.innerHeight - mouseY))
  )

  const radius = maxDistance * 2

  // 创建圆形覆盖层
  const circleOverlay = document.createElement('div')
  circleOverlay.className = 'circle-overlay'
  circleOverlay.style.width = radius + 'px'
  circleOverlay.style.height = radius + 'px'
  circleOverlay.style.left = mouseX - radius / 2 + 'px'
  circleOverlay.style.top = mouseY - radius / 2 + 'px'

  document.body.appendChild(circleOverlay)

  // 触发扩展动画
  setTimeout(() => {
    circleOverlay.classList.add('expand')
  }, 10)

  // 创建新内容
  const newContent = document.createElement('div')
  newContent.className = 'new-content'
  newContent.innerHTML = `<iframe src="./download.html" class="w-full h-full" frameborder="0" border="0"></iframe>`

  document.body.appendChild(newContent)

  // 显示新内容
  setTimeout(() => {
    newContent.classList.add('show')
  }, 400)
})

// 返回首页功能
window.goBack = function () {
  const circleOverlay = document.querySelector('.circle-overlay')
  const newContent = document.querySelector('.new-content')

  if (newContent) {
    newContent.classList.remove('show')
    setTimeout(() => {
      newContent.remove()
    }, 300)
  }

  if (circleOverlay) {
    circleOverlay.classList.remove('expand')
    setTimeout(() => {
      circleOverlay.remove()
    }, 800)
  }
}

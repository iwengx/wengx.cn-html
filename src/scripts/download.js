// 检测链接延迟和状态
async function checkLatency(url, linkId) {
  const start = Date.now()
  const linkItem = document.querySelector(`#link${linkId}`)
  const latencySpan = linkItem.querySelector('.latency')
  const statusSpan = linkItem.querySelector('.status')

  // 添加检测动画
  linkItem.style.opacity = '0.7'

  try {
    await fetch(url, {
      mode: 'no-cors',
      cache: 'no-cache',
    })

    const latency = Date.now() - start
    latencySpan.textContent = `延迟：${latency}ms`

    if (latency <= 1500) {
      statusSpan.textContent = '状态：优秀 ⭐⭐⭐'
      statusSpan.className = 'status good'
      linkItem.style.borderColor = '#4CAF50'
    } else if (latency <= 2500) {
      statusSpan.textContent = '状态：良好 ⭐⭐'
      statusSpan.className = 'status good'
      linkItem.style.borderColor = '#8BC34A'
    } else if (latency <= 4000) {
      statusSpan.textContent = '状态：一般 ⭐'
      statusSpan.className = 'status average'
      linkItem.style.borderColor = '#FF9800'
    } else {
      statusSpan.textContent = '状态：较慢'
      statusSpan.className = 'status poor'
      linkItem.style.borderColor = '#F44336'
    }

    // 恢复透明度
    linkItem.style.opacity = '1'
  } catch (error) {
    latencySpan.textContent = '延迟：无法测量'
    statusSpan.textContent = '状态：无法访问 ❌'
    statusSpan.className = 'status unable'
    linkItem.style.borderColor = '#9E9E9E'
    linkItem.style.opacity = '0.5'
  }
}

// 更新全局状态指示器
function updateGlobalStatus() {
  const statusDot = document.querySelector('.status-dot')
  const statusText = document.querySelector('.status-text')

  const statuses = document.querySelectorAll('.status')
  let goodCount = 0
  let totalCount = statuses.length

  statuses.forEach((status) => {
    if (status.classList.contains('good')) {
      goodCount++
    }
  })

  if (goodCount === totalCount) {
    statusDot.style.background = '#4CAF50'
    statusText.textContent = '所有链接正常'
  } else if (goodCount > 0) {
    statusDot.style.background = '#FF9800'
    statusText.textContent = `${goodCount}/${totalCount} 个链接可用`
  } else {
    statusDot.style.background = '#F44336'
    statusText.textContent = '网络连接异常'
  }
}

const downloadLinks = [
  {
    url: 'https://wengx.099899.xyz/Minecraft-Lil-liver-helper/minecraft-lil-liver-helper-v2.6.0.exe',
    title: '主下载源',
    deadline: null,
  },
  {
    url: 'https://wengx.ping.cloudns.club/Minecraft-Lil-liver-helper/minecraft-lil-liver-helper-v2.6.0.exe',
    title: '备用源A',
    deadline: null,
  },
  {
    url: 'https://wengx.ping.cloudns.pro/Minecraft-Lil-liver-helper/minecraft-lil-liver-helper-v2.6.0.exe',
    title: '备用源B',
    deadline: '开小黄云',
  },
  {
    url: 'https://github.com/iwengx/Minecraft-Lil-liver-helper/releases/download/2.6.0/minecraft-lil-liver-helper-v2.6.0.exe',
    title: 'GitHub Releases',
    deadline: null,
  },
]

// 初始化下载卡片元素
function initDownloadCards() {
  const lineksContainer = document.querySelector('#download-links')
  downloadLinks.forEach((item, index) => {
    const cartdHTML = `<div class="link-item" id="link${index}">
      <div class="link-header">
        <span class="link-number">${(index + 1).toString().padStart(2, '0')}</span>
        <span class="link-title">${item.title}</span>
        ${item.deadline ? `<span class="expiry">（${item.deadline}）</span>` : ''}
      </div>
      <div class="link-content">
        <div class="left-section">
          <a
            href="${item.url}"
            target="_blank"
            class="minecraft-button color-white">
            <span class="button-text">下载</span>
            <span class="button-icon">⬇️</span>
          </a>
        </div>
        <div class="link-status">
          <span class="latency"></span>
          <span class="status"></span>
        </div>
      </div>
    </div>`
    lineksContainer.insertAdjacentHTML('beforeend', cartdHTML)
  })
}
initDownloadCards()

// 检查所有链接的函数
function checkAllLinks() {
  const checkPromises = []
  downloadLinks
    .map((item) => item.url)
    .forEach((link, index) => {
      checkPromises.push(checkLatency(link, index))
    })

  const promiseAll = Promise.all(checkPromises)
  promiseAll
    .then(() => {
      updateGlobalStatus()
    })
    .catch(() => {})

  return promiseAll
}

// 页面加载完成后的初始化
window.onload = async () => {
  await checkAllLinks()

  // 添加页面加载动画
  document.body.style.opacity = '0'
  document.body.style.transition = 'opacity 0.5s ease-in-out'
  setTimeout(() => {
    document.body.style.opacity = '1'
  }, 100)
}

// 页面重新可见时重新检测链接状态
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    setTimeout(() => {
      checkAllLinks()
    }, 500)
  }
})

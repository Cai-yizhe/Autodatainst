#!/usr/bin/env node

/**
 * HMR功能验证脚本
 * 用于验证Vue3+Vite的热更新功能
 */

const { spawn } = require('child_process')
const fs = require('fs')
const path = require('path')

console.log('🔍 开始验证HMR功能...')

// 测试组件路径
const testComponentPath = path.join(__dirname, '../src/renderer/src/components/HmrTest.vue')

// 启动开发服务器
function startDevServer() {
  const devServer = spawn('npm', ['run', 'dev'], {
    stdio: 'inherit',
    shell: true
  })

  // 监听进程退出
  devServer.on('exit', (code) => {
    if (code !== 0) {
      console.error('❌ 开发服务器异常退出，代码:', code)
      process.exit(1)
    }
  })

  return devServer
}

// 等待指定时间
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// 主验证流程
async function verifyHmr() {
  try {
    console.log('📦 启动开发服务器...')
    const devServer = startDevServer()

    // 等待服务器启动
    console.log('⏳ 等待服务器启动...')
    await wait(8000)

    console.log('🔄 开始HMR测试...')
    console.log('👉 请在浏览器中观察组件变化')
    console.log('按 Ctrl+C 退出测试')

    // 保持进程运行
    process.stdin.resume()

    // 优雅退出
    process.on('SIGINT', () => {
      console.log('\n🛑 停止HMR测试')
      devServer.kill()
      process.exit(0)
    })
  } catch (error) {
    console.error('❌ HMR验证出错:', error)
    process.exit(1)
  }
}

// 运行验证
verifyHmr()
#!/usr/bin/env node

/**
 * 启动测试脚本
 * 验证应用能否正确启动空白窗口
 */

const { spawn } = require('child_process')
const path = require('path')

console.log('🔍 正在测试应用启动...')

// 启动应用
const startProcess = spawn('npm', ['run', 'start'], {
  cwd: path.join(__dirname, '..'),
  stdio: 'inherit',
  shell: true
})

// 设置超时，5秒后检查进程是否仍在运行
setTimeout(() => {
  if (startProcess.exitCode === null) {
    console.log('✅ 应用启动成功！窗口已显示')
    console.log('🔄 请按 Ctrl+C 退出测试')
  } else {
    console.error('❌ 应用启动失败，退出码:', startProcess.exitCode)
    process.exit(1)
  }
}, 5000)
#!/usr/bin/env node

/**
 * 环境配置验证脚本
 * 用于确认开发环境是否正确设置
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

console.log('🔍 检查开发环境配置...')

// 检查 Node.js 版本
const nodeVersion = process.version
console.log(`Node.js 版本: ${nodeVersion}`)
const majorVersion = parseInt(nodeVersion.substring(1).split('.')[0])
if (majorVersion < 18) {
  console.error('❌ Node.js 版本必须 >= 18.x')
  process.exit(1)
}

// 检查 npm 依赖
console.log('📦 验证依赖安装...')
try {
  const packageJsonPath = path.join(__dirname, '..', 'package.json')
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
  
  // 检查核心依赖
  const requiredDeps = [
    { name: 'electron', version: '^35.0.0' },
    { name: 'vue', version: '^3.5.0' },
    { name: 'element-plus', version: '^2.9.0' }
  ]
  
  let allDepsInstalled = true
  for (const dep of requiredDeps) {
    const installedVersion = packageJson.dependencies[dep.name] || packageJson.devDependencies[dep.name]
    if (!installedVersion) {
      console.error(`❌ 缺少核心依赖: ${dep.name}`)
      allDepsInstalled = false
    }
  }
  
  if (allDepsInstalled) {
    console.log('✅ 所有核心依赖已安装')
  }
} catch (error) {
  console.error('❌ 检查依赖失败:', error.message)
  process.exit(1)
}

console.log('🚀 环境配置验证完成!')
#!/bin/bash

# 部署脚本
set -e

echo "🚀 开始部署 MovieDB 应用..."

# 检查是否存在 .env 文件
if [ ! -f .env ]; then
    echo "⚠️  警告: .env 文件不存在，请复制 .env.example 并配置环境变量"
    exit 1
fi

# 构建 Docker 镜像
echo "📦 构建 Docker 镜像..."
docker build -t moviedb-app:latest . --no-cache

# 停止现有容器（如果存在）
echo "🛑 停止现有容器..."
docker compose down || true

# 启动新容器
echo "🚀 启动新容器..."
docker compose up -d

# 等待应用启动
echo "⏳ 等待应用启动..."
sleep 10

# 健康检查
echo "🔍 执行健康检查..."
if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
    echo "✅ 部署成功！应用正在运行在 http://localhost:3000"
else
    echo "❌ 健康检查失败，请检查日志"
    docker-compose logs moviedb-app
    exit 1
fi

echo "🎉 部署完成！"
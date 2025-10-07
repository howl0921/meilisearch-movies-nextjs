# 🚀 MovieDB 部署指南

## 📋 部署前准备

### 1. 环境要求
- Docker 20.10+
- Docker Compose 2.0+
- Node.js 20+ (本地开发)

### 2. 环境变量配置
```bash
# 复制环境变量模板
cp .env.example .env

# 编辑环境变量
nano .env
```

必需的环境变量：
```env
MEILISEARCH_API_URL=https://your-meilisearch-instance.com
MEILISEARCH_API_KEY=your-api-key-here
```

## 🐳 Docker 部署

### 方法一：使用部署脚本（推荐）
```bash
# 给脚本执行权限
chmod +x scripts/deploy.sh

# 执行部署
./scripts/deploy.sh
```

### 方法二：手动部署
```bash
# 1. 构建镜像
docker build -t moviedb-app:latest .

# 2. 启动服务
docker-compose up -d

# 3. 查看日志
docker-compose logs -f moviedb-app

# 4. 健康检查
curl http://localhost:3000/api/health
```

## 📊 部署验证

### 健康检查
```bash
# 检查应用状态
curl http://localhost:3000/api/health

# 预期响应
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456
}
```

### 功能测试
1. 访问 http://localhost:3000
2. 验证电影列表加载
3. 测试搜索功能
4. 测试观看列表功能

## 🔧 常用命令

### 容器管理
```bash
# 查看运行状态
docker-compose ps

# 查看日志
docker-compose logs moviedb-app

# 重启服务
docker-compose restart moviedb-app

# 停止服务
docker-compose down

# 完全清理（包括镜像）
docker-compose down --rmi all
```

### 更新部署
```bash
# 拉取最新代码
git pull

# 重新部署
./scripts/deploy.sh
```

## 🌐 生产环境部署

### 1. 反向代理配置（Nginx）
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 2. SSL 配置（Let's Encrypt）
```bash
# 安装 Certbot
sudo apt install certbot python3-certbot-nginx

# 获取 SSL 证书
sudo certbot --nginx -d your-domain.com
```

### 3. 系统服务配置
```bash
# 创建 systemd 服务
sudo nano /etc/systemd/system/moviedb.service
```

```ini
[Unit]
Description=MovieDB Application
After=docker.service
Requires=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/path/to/your/app
ExecStart=/usr/bin/docker-compose up -d
ExecStop=/usr/bin/docker-compose down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
```

```bash
# 启用服务
sudo systemctl enable moviedb.service
sudo systemctl start moviedb.service
```

## 🔍 故障排除

### 常见问题

1. **容器启动失败**
   ```bash
   # 查看详细日志
   docker-compose logs moviedb-app
   
   # 检查镜像构建
   docker build -t moviedb-app:latest . --no-cache
   ```

2. **API 连接失败**
   - 检查 `.env` 文件中的 API 配置
   - 验证 Meilisearch 服务可访问性
   - 检查网络连接

3. **端口冲突**
   ```bash
   # 检查端口占用
   sudo netstat -tlnp | grep :3000
   
   # 修改 docker-compose.yml 中的端口映射
   ports:
     - "3001:3000"  # 改为其他端口
   ```

### 性能优化

1. **内存限制**
   ```yaml
   # docker-compose.yml
   services:
     moviedb-app:
       deploy:
         resources:
           limits:
             memory: 512M
           reservations:
             memory: 256M
   ```

2. **日志轮转**
   ```yaml
   # docker-compose.yml
   services:
     moviedb-app:
       logging:
         driver: "json-file"
         options:
           max-size: "10m"
           max-file: "3"
   ```

## 📈 监控和维护

### 日志监控
```bash
# 实时查看日志
docker-compose logs -f moviedb-app

# 查看最近的日志
docker-compose logs --tail=100 moviedb-app
```

### 资源监控
```bash
# 查看容器资源使用
docker stats moviedb-app

# 查看系统资源
htop
```

### 备份策略
```bash
# 备份应用数据（如果有持久化数据）
docker-compose exec moviedb-app tar -czf /backup/app-$(date +%Y%m%d).tar.gz /app/data

# 备份配置文件
tar -czf config-backup-$(date +%Y%m%d).tar.gz .env docker-compose.yml
```

## 🎯 部署清单

- [ ] 环境变量配置完成
- [ ] Docker 和 Docker Compose 已安装
- [ ] 应用构建成功
- [ ] 健康检查通过
- [ ] 功能测试完成
- [ ] 反向代理配置（生产环境）
- [ ] SSL 证书配置（生产环境）
- [ ] 监控和日志配置
- [ ] 备份策略制定

---

🎉 **恭喜！你的 MovieDB 应用已成功部署！**

如有问题，请查看日志或联系开发团队。
# 使用官方 Node.js 镜像作为基础镜像
FROM node:20-alpine AS base

# 全局安装 pnpm
RUN npm install -g pnpm

# 安装依赖阶段
FROM base AS deps
# 检查 https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine
RUN apk add --no-cache libc6-compat
WORKDIR /app

# 设置淘宝镜像源
RUN pnpm config set registry https://registry.npmmirror.com/

# 复制包管理文件
COPY package.json pnpm-lock.yaml* ./
# 安装所有依赖（包括 devDependencies，构建时需要）
RUN pnpm install --frozen-lockfile

# 构建阶段
FROM base AS builder
WORKDIR /app

# 设置淘宝镜像源
RUN pnpm config set registry https://registry.npmmirror.com/

# 复制依赖和源代码
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 构建应用
RUN pnpm run build

# 生产依赖阶段（只安装生产依赖用于运行时）
FROM base AS prod-deps
WORKDIR /app

# 设置淘宝镜像源
RUN pnpm config set registry https://registry.npmmirror.com/

# 复制包管理文件
COPY package.json pnpm-lock.yaml* ./
# 只安装生产依赖
RUN pnpm install --frozen-lockfile --prod

# 运行阶段
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# 禁用 Next.js 遥测
ENV NEXT_TELEMETRY_DISABLED=1

# 创建非 root 用户
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 复制构建产物
COPY --from=builder /app/public ./public

# 设置正确的权限
RUN mkdir .next
RUN chown nextjs:nodejs .next

# 复制构建产物并设置权限
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# 复制生产依赖
COPY --from=prod-deps --chown=nextjs:nodejs /app/node_modules ./node_modules

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# 启动应用
CMD ["node", "server.js"]
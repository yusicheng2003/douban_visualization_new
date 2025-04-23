# 前端构建部分
# 使用 Node.js 镜像
FROM node:16 as frontend

# 设置工作目录
WORKDIR /frontend

# 复制前端的 package.json 和 package-lock.json
COPY frontend/package*.json ./

# 安装前端依赖
RUN npm install

# 复制前端代码
COPY frontend/ .

# 构建前端应用
RUN npm run build

# 后端构建部分
# 使用 Python 镜像
FROM python:3.9-slim as backend

# 设置工作目录
WORKDIR /backend

# 复制 backend 目录中的 requirements.txt 文件
COPY backend/requirements.txt .

# 安装后端依赖
RUN pip install -r requirements.txt

# 复制后端代码
COPY backend/ .

# 复制前端构建后的文件到后端服务中（用于后端静态文件服务）
COPY --from=frontend /frontend/build /backend/static

# 启动后端应用
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]

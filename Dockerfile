# 使用官方 Node.js 镜像
FROM node:16

# 设置工作目录
WORKDIR /frontend

# 将 package.json 和 package-lock.json 复制到工作目录
COPY frontend/package*.json ./

# 安装依赖
RUN npm install

# 复制前端代码
COPY frontend/ .

# 构建前端
RUN npm run build

# 使用 Python 镜像来搭建 Flask 后端
FROM python:3.9-slim
WORKDIR /backend
COPY backend/ .

# 安装后端依赖
RUN pip install -r requirements.txt

# 启动应用
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]

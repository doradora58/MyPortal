FROM node:22-bookworm-slim AS builder
WORKDIR /app
COPY package.json ./
RUN npm install --package-lock=false
COPY . .
RUN npm run build

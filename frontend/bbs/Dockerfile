# bbs/Dockerfile
FROM node:lts-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN chmod +x ./node_modules/.bin/*
RUN npm run build
# ベースイメージとして最新のNode.jsを利用
FROM node:20 AS build

# 作業ディレクトリを設定
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピーして依存関係をインストール
COPY package*.json ./
RUN npm install

# ソースコードをコピーしてアプリをビルド
COPY . .
ENV APP_VERSION=$VERSION
RUN npm run build

# 軽量なNginxイメージを使ってビルド結果を配信
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# 必要に応じてポートを公開
EXPOSE 80

# デフォルトのNginx実行コマンド
CMD ["nginx", "-g", "daemon off;"]

FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache tzdata
ENV TZ=Asia/Seoul

RUN mkdir -p data

COPY package*.json ./
RUN npm install

COPY . .

ARG ENV_FILE_BASE64
RUN echo $ENV_FILE_BASE64 | base64 -d > .env

CMD ["node", "index.js"] 
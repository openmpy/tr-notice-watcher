FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache tzdata
ENV TZ=Asia/Seoul

RUN mkdir -p data

COPY package*.json ./
RUN npm install

COPY . .

CMD ["node", "index.js"] 
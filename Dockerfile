FROM node:lts-alpine

RUN npm install -g live-server

COPY . .

EXPOSE 3000 8080

WORKDIR /app
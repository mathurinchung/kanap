FROM node:lts-alpine

ADD frontend /app
WORKDIR /app

RUN npm install -g live-server

EXPOSE 3000
EXPOSE 8080

CMD ["live-server"]

# docker build --no-cache -t kanap .
# docker run -td -p 8080:8080 --name kanap
# docker run -td -p 8080:8080 -v $PATH/frontend:/app --name kanap kanap

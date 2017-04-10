FROM node:latest

RUN mkdir /src

WORKDIR /src

ADD api/nodemon.json /src/nodemon.json

ADD api/package.json /src/package.json

RUN npm install

EXPOSE 3000

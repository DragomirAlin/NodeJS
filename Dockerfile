FROM node:latest
WORKDIR /app
COPY package-lock.json /app
RUN npm install
COPY . /app
EXPOSE 3000
CMD mongod
CMD node server.js


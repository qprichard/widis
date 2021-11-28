FROM node:16.13-alpine3.14

ENV PORT="" \
    MYSQL_HOST="" \
    MYSQL_PORT="" \
    MYSQL_USER="" \
    MYSQL_PASSWORD="" \
    MYSQL_DATABASE=""

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "run", "start:prod"]


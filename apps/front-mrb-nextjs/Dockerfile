FROM node:alpine

WORKDIR /usr/src/app

COPY . .

WORKDIR /usr/src/app/libs/common

RUN npm install

WORKDIR /usr/src/app/apps/front-mrb-nextjs

RUN npm install

EXPOSE 3000

CMD [ "npm", "start", "dev" ]
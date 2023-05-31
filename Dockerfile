FROM node:18

WORKDIR /app

COPY package.json ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 5005

CMD ["yarn", "start"]
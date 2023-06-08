FROM node:18

WORKDIR /app

COPY package.json ./

RUN yarn install

COPY . .

RUN yarn build

ENV PORT=5005
EXPOSE 5005

CMD ["yarn", "start"]

FROM node:17.8.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g @nestjs/cli
RUN npm install

COPY . .

RUN npm run build

RUN npm prune --production

EXPOSE 4000

CMD ["node", "dist/main"]
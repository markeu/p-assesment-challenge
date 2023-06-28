FROM node:17.8.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY tsconfig.build.json ./

RUN npm install -g @nestjs/cli
RUN npm install -g husky
RUN npm install

COPY . .

EXPOSE 4000

RUN npm run build

CMD ["npm", "run", "dev"]

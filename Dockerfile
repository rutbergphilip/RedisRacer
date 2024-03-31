FROM node:18 AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18 as runtime

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package*.json ./

RUN npm ci

COPY --from=build /usr/src/app/dist ./dist

EXPOSE 3000

ENV REDIS_URL=redis://redis:6379

CMD ["node", "dist/index.js"]

FROM node:10-alpine

RUN mkdir /app
WORKDIR /app

COPY server/package.json .

RUN npm install --production

COPY ./server .

COPY ./frontend/build ./timetrack
EXPOSE 5000

CMD ["npm", "start"]
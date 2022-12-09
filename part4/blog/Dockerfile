FROM node:16

RUN npm install

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3003

CMD ["npm", "start"]

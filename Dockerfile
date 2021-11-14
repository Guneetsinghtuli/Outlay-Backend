FROM node

WORKDIR /server/src

COPY . .

EXPOSE 3001

RUN npm install

CMD ["node" , "app.js"]  
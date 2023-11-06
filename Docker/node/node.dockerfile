FROM node:17-alpine

WORKDIR /home_page

COPY package.json /home_page

RUN npm install

COPY . /home_page

EXPOSE 3000

CMD ["npm", "start"]



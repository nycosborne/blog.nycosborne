FROM node:18-alpine as build_image
WORKDIR /app/react

COPY ./react/package.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine as production_image
WORKDIR /app/react

COPY --from=build_image /app/react/dist ./dist
EXPOSE 8080
CMD ["npm", "run", "preview"]


# docker build . -t registry.home.lan/demo/be2:latest
FROM node:20 as build
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build
FROM node:20-alpine
WORKDIR /app
COPY --from=build /app .
EXPOSE 80
ENV PORT=80
CMD ["node", "./build/index.js"]
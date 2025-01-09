FROM node:22 AS build-stage
WORKDIR /app
COPY . .
RUN npm ci
COPY static static
RUN npm run build
FROM node:22-alpine as production-stage
WORKDIR /app
ENV NODE_ENV=production
ENV TZ=Asia/Bangkok
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
COPY static static
COPY package*.json ./
RUN npm ci
COPY --from=build-stage /app/dist ./bin
EXPOSE 80
CMD ["node","bin/index.js"]

FROM node:20
ENV TZ=Asia/Bangkok
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN mkdir /app
WORKDIR /app
COPY package.json .
COPY package-lock.json .
ENV NODE_ENV production
RUN npm ci
COPY dist bin
EXPOSE 80
CMD ["node","bin/app.js"]

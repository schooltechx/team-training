FROM node:20
ENV TZ=Asia/Bangkok
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN mkdir /app
WORKDIR /app
COPY package.json .
ENV NODE_ENV production
RUN npm install
# COPY static static
COPY dist src
EXPOSE 80
CMD ["node","src/app.js"]

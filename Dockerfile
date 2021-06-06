FROM node:14-alpine
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
ADD . /usr/src/app
EXPOSE 3081
CMD ["npm", "run", "prod"]

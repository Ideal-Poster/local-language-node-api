# Specify a base image
FROM node:alpine

WORKDIR /usr/api

# Install some dependencies
COPY package.json .
RUN yarn

COPY . .

EXPOSE 3000

RUN export NODE_ENV=production
RUN ["yarn", "start"]
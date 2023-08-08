FROM nginx:alpine AS base
MAINTAINER Maarten Balliauw "maarten.balliauw@jetbrains.com"
WORKDIR /usr/share/nginx/html
EXPOSE 80

FROM node:18 AS build
WORKDIR ./src
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install
COPY . .
RUN npm run build

FROM base AS final
WORKDIR /usr/share/nginx/html
#COPY ./deployment/nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./deployment/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY ./deployment/nginx/conf.d/include/redirects.conf /etc/nginx/conf.d/include/redirects.conf
COPY --from=build /src/_site .
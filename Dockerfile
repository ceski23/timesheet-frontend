FROM node:12.22.1 AS builder

COPY package.json package-lock.json ./
RUN npm install

COPY . ./
RUN npm run build

FROM nginx:1.25.1-alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder ./build /usr/share/nginx/html
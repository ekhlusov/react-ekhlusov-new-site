# build environment
FROM node:22-alpine AS build
WORKDIR /app
COPY ./app/package.json ./app/package-lock.json ./
RUN npm ci
# .env с VITE_* переменными нужен здесь: Vite подставляет их на этапе сборки
COPY ./app ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY ./containers/node-nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

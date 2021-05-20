# build environment
FROM node:16.2.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./app/package.json ./
COPY ./app/yarn.lock ./
# RUN npm install react-scripts@4.0.3 -g --silent
RUN rm -rf node_modules && yarn install --frozen-lockfile
COPY ./app ./
RUN yarn run build
RUN rf -rf node_modules

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
# new
COPY ./containers/node-nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

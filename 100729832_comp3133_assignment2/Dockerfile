# Build Angular app
FROM node:20 as build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --prod

# Serve with NGINX
FROM nginx:alpine

# remove default nginx welcome files then copy built browser output
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist/100729832_comp3133_assignment2/browser/ /usr/share/nginx/html/

EXPOSE 80
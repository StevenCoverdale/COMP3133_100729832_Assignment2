# Build Angular app
FROM node:18 as build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --prod

# Serve with NGINX
FROM nginx:alpine

COPY --from=build /app/dist/100729832_comp3133_assignment2 /usr/share/nginx/html

EXPOSE 80
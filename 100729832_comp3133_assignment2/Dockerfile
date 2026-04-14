# Build Angular app
FROM node:20 as build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --prod

# Serve with NGINX
FROM nginx:alpine

# Use a custom nginx config that supports SPA fallback, then copy built browser output
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/100729832_comp3133_assignment2/browser/ /usr/share/nginx/html/

EXPOSE 80
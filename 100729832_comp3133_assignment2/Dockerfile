# Build Angular app
FROM node:20 as build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --prod

# Serve with NGINX
FROM nginx:alpine

# Remove default nginx files so our app replaces the welcome page
RUN rm -rf /usr/share/nginx/html/*

# Copy the built Angular browser output into nginx html root
COPY --from=build /app/dist/100729832_comp3133_assignment2/browser/ /usr/share/nginx/html/

EXPOSE 80
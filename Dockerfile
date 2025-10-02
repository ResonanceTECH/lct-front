# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /usr/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: Production (Serve with Nginx)
FROM nginx:alpine

# Copy built files from build stage
COPY --from=build /usr/app/dist /usr/share/nginx/html

# Copy custom Nginx configuration (optional, for custom settings)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

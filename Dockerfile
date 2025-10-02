# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /usr/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: Production (Serve with Node.js)
FROM node:20-alpine

WORKDIR /usr/app

# Install serve to serve static files
RUN npm install -g serve

# Copy built files from build stage
COPY --from=build /usr/app/dist ./dist

# Expose port (configurable via .env)
EXPOSE ${APP_PORT:-3000}

# Serve the static files
CMD ["serve", "-s", "dist", "-l", "${APP_PORT:-3000}"]

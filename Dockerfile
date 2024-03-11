# Step 1: Build the Next.js application
# Use an official Node runtime as a parent image
FROM node:20-alpine AS builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Use ARG to define the build-time environment variable that specifies which .env file to use

# Copy package.json and package-lock.json files
COPY package.json ./
COPY package-lock.json ./


# Install dependencies
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Copy the appropriate .env file based on the build-time environment variable
COPY .env ./.env


# Build your Next.js app using the environment variables from the file
RUN source .env && npm run build

# Step 2: Serve the Next.js application
FROM node:20-alpine AS runner

WORKDIR /usr/src/app

# Copy the built assets from the builder stage
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./package.json


# Copy the appropriate .env file

# Your app binds to port 3000 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 3000

# Define the command to run your app using CMD which defines your runtime
# Here we will use the Next.js start script which starts the production server
# ENTRYPOINT ["npm", "run", "start"]
ENTRYPOINT ["npm", "run", "dev"]
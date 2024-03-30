# Use a Node.js base image
FROM node:18 AS build

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Start a new stage from scratch
FROM node:18 as runtime

WORKDIR /usr/src/app

# Copy package.json and other necessary files
COPY --from=build /usr/src/app/package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy compiled JavaScript from the previous stage
COPY --from=build /usr/src/app/dist ./dist

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["node", "dist/index.js"]

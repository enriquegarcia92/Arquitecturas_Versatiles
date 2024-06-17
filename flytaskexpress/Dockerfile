# Use Node.js LTS version as the base image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
# RUN npm run build

ENV SECRET_KEY=$SECRET_KEY
ENV EMAIL_HOST_USER=$EMAIL_HOST_USER
ENV EMAIL_HOST_PASSWORD=$EMAIL_HOST_PASSWORD

# Expose the port the app runs on
EXPOSE 3000

# Command to start the app
CMD ["npm", "start"]
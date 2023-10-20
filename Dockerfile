# Use the official Node.js image as a base image
FROM node:16

# Set the working directory in the docker image
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Expose port based on the PORT environment variable, default to 3000
# No need to expose 8080 unless your app actually uses it
EXPOSE 3000

# Command to run the app
CMD [ "npm", "start" ]

FROM node:16.14.0-alpine AS build
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build


# Expose the port your React app runs on
EXPOSE 3000

# Command to start Nginx and serve the React app
CMD ["npm", "start"]
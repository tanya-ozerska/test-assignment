# Base Node.js image with Cypress included
FROM cypress/included:14.0.0

# Set working directory inside the container
WORKDIR /ui-tests

# Copy package.json and package-lock.json to install dependencies
COPY ./package.json ./package-lock.json ./

# Install all dependencies
RUN npm ci

# Copy the rest of the project files
COPY . .

# Add a health check to ensure Cypress is properly installed
RUN npx cypress verify

# Set the default command to run Cypress tests
CMD ["npm", "test:run"]
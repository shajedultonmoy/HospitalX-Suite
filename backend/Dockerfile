# Use Node.js official runtime base image
FROM node:20

# Set environment
ENV NODE_ENV=production

# Set working directory
WORKDIR /usr/src/app

# Copy dependency files
COPY package*.json ./

# Install dependencies (including production native dependencies)
RUN npm ci --omit=dev

# Rebuild native sqlite3 bindings in container
RUN npm rebuild sqlite3

# Copy application source code
COPY . .

# Expose backend service port
EXPOSE 5000

# Command to run the application
CMD ["node", "server.js"]

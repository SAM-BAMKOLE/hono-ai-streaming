# Use an official Bun image as the base
FROM oven/bun:1.1.17-slim

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and bun.lockb (if used) to leverage Docker's caching
COPY package.json bun.lockb* ./

# Install dependencies using Bun
RUN bun install --frozen-lockfile

# Copy the rest of your application files
COPY . .

# Expose the port your application listens on (e.g., 3000 for a web server)
EXPOSE 3000

# Define the command to run your application
CMD ["bun", "run", "start"]

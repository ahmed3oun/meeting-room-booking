#!/bin/bash

# Set up your project
# echo "Setting up your project..."
cd ${PWD}

# Start Docker containers (if using Docker)
# echo "Starting Docker containers..."
docker-compose up -d --build 

# Wait for a few seconds to ensure that services are up
sleep 5

# List running containers to verify
# echo "Docker containers running:"
docker ps

# Migrate database
# echo "Mongo db database migration..."
sleep 10
docker exec -it booking-ms npx prisma generate
docker exec -it booking-ms npx prisma db push

# Final message
echo "Workspace setup complete! You're ready to start developing."

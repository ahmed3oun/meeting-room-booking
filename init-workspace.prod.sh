#!/bin/bash

# Update and upgrade the system
echo "Updating system..."
sudo apt-get update && sudo apt-get upgrade -y

# Install essential tools
echo "Installing essential tools..."
sudo apt-get install -y build-essential curl git wget

# Install Node.js and npm (using nvm)
echo "Installing Node.js and npm..."
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
source ~/.bashrc
nvm install --lts
nvm use --lts

# Install Docker
echo "Installing Docker..."
sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
sudo apt-get install -y docker-ce
sudo usermod -aG docker $USER

# Install Docker Compose
echo "Installing Docker Compose..."
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

#Install kubectl
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

# Set up your project
echo "Setting up your project..."
cd ${PWD}

# Start Docker containers in production mode
echo "Starting Docker containers in production mode..."
docker-compose -f docker-compose.prod.yml up -d --build --scale booking=2

# Wait for a few seconds to ensure that services are up
sleep 5

# List running containers to verify
echo "Docker containers running:"
docker ps

# Migrate database
echo "Mongo db database migration..."
sleep 10
docker exec -it booking-ms npx prisma generate
docker exec -it booking-ms npx prisma db push

kubectl apply -f deployment.yaml



# Final message
echo "Production workspace setup complete! Services are running."

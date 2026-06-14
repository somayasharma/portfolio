#!/bin/bash

# Navigate to the script's directory
cd "$(dirname "$0")"

# Check if Node.js is installed, otherwise fall back to Python
if command -v node &> /dev/null
then
    echo "Starting local portfolio server using Node.js..."
    node server.js &
    SERVER_PID=$!
elif command -v python3 &> /dev/null
then
    echo "Node.js not found. Starting local portfolio server using Python 3..."
    python3 -m http.server 8088 &
    SERVER_PID=$!
elif command -v python &> /dev/null
then
    echo "Node.js and Python 3 not found. Starting local portfolio server using Python..."
    python -m SimpleHTTPServer 8088 &
    SERVER_PID=$!
else
    echo "Error: Neither Node.js nor Python is installed on your system."
    echo "Please install Node.js (https://nodejs.org/) or Python 3 to run this server."
    exit 1
fi

# Wait for server to bind
sleep 1.5

# Open the site in the default browser (Mac command)
open http://localhost:8088

# Handle script exit cleanly
cleanup() {
    echo -e "\nShutting down server (PID: $SERVER_PID)..."
    kill $SERVER_PID 2>/dev/null
    exit 0
}

# Trap Ctrl+C (SIGINT) and SIGTERM
trap cleanup SIGINT SIGTERM

# Keep script running to show logs
wait $SERVER_PID

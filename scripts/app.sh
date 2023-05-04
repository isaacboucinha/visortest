#!/bin/bash

# load env file
if test -f "../.env"; then
  echo "Loading env file..."
  export $(grep -v '^#' ../.env | xargs)
fi

echo "Starting web app application..."

# start express server
( cd ../client ; npm run dev -- -p $APP_PORT )
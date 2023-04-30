#!/bin/bash

if test -f "../.env"; then
  echo "Loading env file..."
  export $(grep -v '^#' ../.env | xargs)
fi

echo "Starting api application..."

# start express server
( cd ../api ; DEBUG=express:server PORT=$API_PORT npm start )
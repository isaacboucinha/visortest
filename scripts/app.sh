#!/bin/bash

# load env file
sh ./_load_env.sh

echo "Starting web app application..."

# start express server
( cd ../client ; npm run dev -- -p $APP_PORT )
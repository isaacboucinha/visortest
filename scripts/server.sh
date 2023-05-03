#!/bin/bash

# load env file
if test -f "../.env"; then
  echo "Loading env file..."
  export $(grep -v '^#' ../.env | xargs)
fi

# check if -d option is enabled for development server
dev=0
while getopts d flag
do
  case "${flag}" in
    d) 
      dev=1
      ;;
  esac
done

# redefine mongodb host since we're runnning server locally (i.e. not in docker)
echo "Redefining MONGODB_URI..."
export MONGODB_URI=mongodb://localhost:27017/visortest_db
echo "It is now MONGODB_URI="$MONGODB_URI

if [ $dev -eq 0 ]
then
  # start express server normally
  echo "Starting api application..."
  
  ( cd ../api ; DEBUG=app:* npm start)
else
  # start express server normally
  echo "Starting api application in dev mode..."

  ( cd ../api ; DEBUG=app:* npm run dev)
fi
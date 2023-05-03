#!/bin/bash

# install server app dependencies
( cd ../api ; npm install )

# install web app dependencies
( cd ../client ; npm install )
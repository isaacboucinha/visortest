#!/bin/bash

# install server app
( cd ../api ; npm install )

# install web app
( cd ../client ; npm install )
#!/bin/bash

git pull
sudo docker rm $(sudo docker ps -aq)
docker-compose build
#!/bin/bash

git pull
sudo docker rm $(sudo docker ps -aq)
sudo docker-compose build

#v1
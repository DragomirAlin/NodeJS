#!/bin/bash
echo "[SHome]Starting server..."
docker-compose run mongo rm /data/db/mongod.lock
docker-compose up

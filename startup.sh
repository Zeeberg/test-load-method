#!/usr/bin/env bash
set -e

/opt/wait-for-it.sh mongo:27017
cat .env
npm run seed:run
npm run start:prod
#!/bin/sh

yarn install
yarn workspace @web-speed-hackathon/scoring run build:watch
yarn workspace @web-speed-hackathon/vrt run build:watch
exec "$@"

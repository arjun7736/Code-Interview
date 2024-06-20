#!/bin/sh

cd "$(dirname "$0")"

export $(grep -v '^#' .env | xargs)

echo "Loaded environment variables:"
env | grep VITE_

npm run build

#!/bin/sh
set -e

echo "Building application..."
pnpm run build

echo "Starting server..."
node dist/index.js

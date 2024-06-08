#!/bin/bash
set -e
npm run typeorm migration:run -- -d build/data-source
exec "$@"
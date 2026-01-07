#!/bin/bash

# Setup script for weekly data refresh cron job
# This script adds a cron job to refresh credit card data every Sunday at midnight

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

# Cron job command
CRON_COMMAND="0 0 * * 0 cd $PROJECT_DIR && npx ts-node scripts/refresh-data.ts >> $PROJECT_DIR/logs/refresh.log 2>&1"

# Create logs directory
mkdir -p "$PROJECT_DIR/logs"

# Add to crontab if not already present
(crontab -l 2>/dev/null | grep -v "refresh-data.ts"; echo "$CRON_COMMAND") | crontab -

echo "Cron job setup complete!"
echo "Data will be refreshed every Sunday at midnight"
echo "Logs will be saved to: $PROJECT_DIR/logs/refresh.log"

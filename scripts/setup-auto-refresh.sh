#!/bin/bash

# GTFS Auto-Refresh Setup Script
# Sets up automatic GTFS data refresh via cron

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo "🔄 Setting up GTFS auto-refresh..."

# Create cron job
CRON_JOB="0 2 * * 1 cd $PROJECT_DIR && npm run transit:refresh >> $PROJECT_DIR/logs/gtfs-refresh.log 2>&1"

# Check if cron job already exists
if crontab -l 2>/dev/null | grep -q "transit:refresh"; then
    echo "✅ Auto-refresh cron job already exists"
else
    # Add cron job
    (crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -
    echo "✅ Auto-refresh cron job added (runs every Monday at 2 AM)"
fi

# Create logs directory
mkdir -p "$PROJECT_DIR/logs"

echo ""
echo "📋 Cron job details:"
echo "   Schedule: Every Monday at 2:00 AM"
echo "   Command: npm run transit:refresh"
echo "   Logs: $PROJECT_DIR/logs/gtfs-refresh.log"
echo ""
echo "💡 To view cron jobs: crontab -l"
echo "💡 To remove: crontab -e (then delete the line)"


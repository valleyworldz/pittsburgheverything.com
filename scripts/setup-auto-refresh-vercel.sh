#!/bin/bash

# GTFS Auto-Refresh Setup for Vercel
# Uses Vercel Cron Jobs (vercel.json) instead of system cron

echo "🔄 Setting up GTFS auto-refresh for Vercel..."

# Check if vercel.json exists
if [ ! -f "vercel.json" ]; then
    echo "Creating vercel.json..."
    cat > vercel.json << 'EOF'
{
  "crons": [
    {
      "path": "/api/transit/refresh",
      "schedule": "0 2 * * 1"
    }
  ]
}
EOF
    echo "✅ Created vercel.json with cron job"
else
    echo "⚠️  vercel.json already exists. Please add manually:"
    echo ""
    echo '  "crons": ['
    echo '    {'
    echo '      "path": "/api/transit/refresh",'
    echo '      "schedule": "0 2 * * 1"'
    echo '    }'
    echo '  ]'
fi

echo ""
echo "📋 Vercel Cron Job:"
echo "   Path: /api/transit/refresh"
echo "   Schedule: Every Monday at 2:00 AM UTC"
echo ""
echo "💡 Deploy to Vercel to activate cron job"


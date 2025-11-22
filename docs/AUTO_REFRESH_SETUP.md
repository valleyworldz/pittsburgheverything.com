# GTFS Auto-Refresh Setup

This guide explains how to set up automatic GTFS data refresh so your bus schedules are always up to date.

## Overview

GTFS data should be refreshed regularly (weekly recommended) to ensure schedules stay current. PRT typically updates their GTFS data quarterly or when service changes occur.

## Option 1: Vercel Cron Jobs (Recommended for Vercel Deployments)

If you're deploying to Vercel, use Vercel Cron Jobs:

### Setup

1. **Add cron configuration to `vercel.json`:**

```json
{
  "crons": [
    {
      "path": "/api/transit/refresh",
      "schedule": "0 2 * * 1"
    }
  ]
}
```

This runs every Monday at 2:00 AM UTC.

2. **Deploy to Vercel:**

```bash
vercel deploy
```

The cron job will automatically call `/api/transit/refresh` on schedule.

### Manual Trigger

You can also trigger a refresh manually:

```bash
curl -X POST https://your-domain.com/api/transit/refresh
```

## Option 2: System Cron (For Self-Hosted)

For self-hosted deployments, use system cron:

### Setup

1. **Make script executable:**

```bash
chmod +x scripts/setup-auto-refresh.sh
```

2. **Run setup:**

```bash
./scripts/setup-auto-refresh.sh
```

This adds a cron job that runs every Monday at 2:00 AM.

### Manual Setup

Or add manually to crontab:

```bash
crontab -e
```

Add this line:

```
0 2 * * 1 cd /path/to/project && npm run transit:refresh >> /path/to/project/logs/gtfs-refresh.log 2>&1
```

## Option 3: GitHub Actions (For GitHub Deployments)

Create `.github/workflows/refresh-gtfs.yml`:

```yaml
name: Refresh GTFS Data

on:
  schedule:
    - cron: '0 2 * * 1'  # Every Monday at 2 AM UTC
  workflow_dispatch:  # Allow manual trigger

jobs:
  refresh:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run transit:refresh
      # Add deployment step if needed
```

## Option 4: API Endpoint (For Any Platform)

The `/api/transit/refresh` endpoint can be called by:

- **External cron services** (cron-job.org, EasyCron, etc.)
- **Monitoring services** (UptimeRobot, Pingdom, etc.)
- **CI/CD pipelines**
- **Manual triggers**

### Check Status

```bash
GET /api/transit/refresh
```

Returns:
```json
{
  "database": {
    "exists": true,
    "ageDays": 5,
    "sizeMB": "12.5"
  },
  "status": "ready",
  "needsRefresh": false
}
```

### Trigger Refresh

```bash
POST /api/transit/refresh
```

## Refresh Frequency Recommendations

- **Weekly**: Recommended for most use cases
- **Monthly**: If PRT updates infrequently
- **On-demand**: When you know PRT has updated schedules

## Monitoring

### Check Refresh Status

```bash
curl https://your-domain.com/api/transit/refresh
```

### View Logs

**Vercel:**
- Check Vercel dashboard → Functions → Logs

**Self-hosted:**
```bash
tail -f logs/gtfs-refresh.log
```

**System cron:**
```bash
grep transit:refresh /var/log/syslog
```

## Troubleshooting

### Refresh Not Running

1. **Check cron job exists:**
   ```bash
   crontab -l
   ```

2. **Check API endpoint:**
   ```bash
   curl -X POST https://your-domain.com/api/transit/refresh
   ```

3. **Check logs:**
   ```bash
   tail -f logs/gtfs-refresh.log
   ```

### Refresh Failing

1. **Verify GTFS zip exists:**
   ```bash
   ls -lh data/gtfs/prt.zip
   ```

2. **Check permissions:**
   ```bash
   chmod 644 data/gtfs/prt.zip
   ```

3. **Manual test:**
   ```bash
   npm run transit:refresh
   ```

## Best Practices

1. ✅ **Set up monitoring** - Get alerts if refresh fails
2. ✅ **Test manually first** - Verify refresh works before automating
3. ✅ **Check logs regularly** - Ensure refreshes are succeeding
4. ✅ **Update on service changes** - PRT announces major schedule changes
5. ✅ **Backup database** - Before major refreshes (optional)

## Current Status

Check your current GTFS data status:

```bash
npm run transit:status
# Or
curl https://your-domain.com/api/transit/refresh
```

---

**Note**: The first time setup still requires manual download of GTFS zip from PRT's website. Auto-refresh will re-import when you update the zip file.


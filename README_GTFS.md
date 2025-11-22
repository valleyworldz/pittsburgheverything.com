# 🚌 GTFS Setup - Quick Start

## ✅ What's Already Done

- ✅ GTFS infrastructure built
- ✅ API endpoints created
- ✅ Auto-refresh system ready
- ✅ Client component updated

## 📥 Step 1: Download GTFS Data (One-Time Manual Step)

PRT doesn't provide a direct download URL, so you need to download manually:

1. **Visit**: https://www.portauthority.org/developer-resources/gtfs-data/
2. **Download** the GTFS zip file
3. **Place it at**: `data/gtfs/prt.zip`

## 📦 Step 2: Import Data

```bash
npm run transit:import
```

This will:
- Extract the GTFS zip
- Import into SQLite database
- Create indexes for fast queries

## 🔄 Step 3: Set Up Auto-Refresh

### For Vercel (Recommended):

Already configured! The `vercel.json` file includes a cron job that runs every Monday at 2 AM UTC.

Just deploy:
```bash
vercel deploy
```

### For Self-Hosted:

```bash
./scripts/setup-auto-refresh.sh
```

### Manual Setup:

Add to crontab:
```bash
0 2 * * 1 cd /path/to/project && npm run transit:refresh
```

## ✅ Verify It Works

```bash
# Check status
curl http://localhost:3000/api/transit/refresh

# Test routes API
curl http://localhost:3000/api/transit/routes

# Visit bus schedules
open http://localhost:3000/tools/bus-schedules
```

## 🔄 Auto-Refresh Details

- **Schedule**: Every Monday at 2:00 AM
- **Endpoint**: `POST /api/transit/refresh`
- **Status Check**: `GET /api/transit/refresh`
- **Manual Trigger**: `npm run transit:refresh`

## 📚 Full Documentation

- `docs/GTFS_SETUP.md` - Complete setup guide
- `docs/AUTO_REFRESH_SETUP.md` - Auto-refresh options
- `docs/GTFS_IMPLEMENTATION_COMPLETE.md` - Implementation details

## 🎯 Current Status

Once you download and import the GTFS zip file, everything else is automatic!

The system will:
- ✅ Use 100% accurate GTFS schedules
- ✅ Overlay real-time predictions when available
- ✅ Auto-refresh weekly (or on your schedule)
- ✅ Work offline once imported

---

**Next Step**: Download the GTFS zip from PRT and run `npm run transit:import`


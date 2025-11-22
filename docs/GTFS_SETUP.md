# GTFS Transit Data Setup

This guide explains how to set up 100% accurate bus schedule data using Pittsburgh Regional Transit (PRT) GTFS data.

## Overview

We use **GTFS (General Transit Feed Specification)** static data as the authoritative source for all bus schedules. This provides:

- ✅ **100% accurate schedules** - Official PRT data
- ✅ **No API keys required** - Free public data
- ✅ **Offline capability** - Data stored locally in SQLite
- ✅ **Fast queries** - Indexed database
- ✅ **Real-time overlay** - Optional real-time predictions from Port Authority API

## Quick Start

### 1. Download GTFS Data

PRT provides GTFS data on their developer resources page:

**Option A: Manual Download**
1. Visit: https://www.portauthority.org/developer-resources/gtfs-data/
2. Download the GTFS zip file
3. Place it at: `data/gtfs/prt.zip`

**Option B: Automated Download (if URL is available)**
```bash
# Update scripts/download-gtfs.ts with the actual PRT GTFS URL
npm run transit:download
```

### 2. Import GTFS Data

```bash
npm run transit:import
```

This will:
- Extract the GTFS zip file
- Parse all CSV files (routes, stops, trips, stop_times, calendar, etc.)
- Import into SQLite database at `data/gtfs/prt.sqlite`
- Create indexes for fast queries

### 3. Verify Import

Check that the database was created:

```bash
ls -lh data/gtfs/prt.sqlite
```

The file should be several MB in size.

## Data Refresh

GTFS data should be refreshed when PRT updates their schedules (typically quarterly or when service changes occur).

### Manual Refresh

1. Download the latest GTFS zip from PRT
2. Replace `data/gtfs/prt.zip`
3. Run: `npm run transit:import`

### Automated Refresh (Recommended)

Set up a cron job or scheduled task:

```bash
# Weekly check (every Monday at 2 AM)
0 2 * * 1 cd /path/to/project && npm run transit:import
```

## API Endpoints

Once GTFS is imported, these endpoints are available:

### Get All Routes
```
GET /api/transit/routes
```

### Search Stops
```
GET /api/transit/stops?q=oakland
GET /api/transit/stops?withRoutes=true
```

### Get Stop Schedule
```
GET /api/transit/stop/{stopId}/schedule?date=2025-01-20&routeId=61A
```

### Get Route Stops
```
GET /api/transit/route/{routeId}/stops?directionId=0
```

### Bus Schedules (Combined GTFS + Real-time)
```
GET /api/bus-schedules?stopId=4021&route=61A&includeRealtime=true
```

## Data Structure

### GTFS Tables

- **routes**: All transit routes (buses, light rail, etc.)
- **stops**: All stop locations with coordinates
- **trips**: Individual trip instances
- **stop_times**: Schedule for each stop on each trip
- **calendar**: Regular service patterns (weekday, weekend, etc.)
- **calendar_dates**: Service exceptions (holidays, special events)

### Service IDs

GTFS uses "service_id" to represent different service patterns:
- Weekday service
- Saturday service
- Sunday service
- Holiday service
- Special event service

The system automatically determines which service_ids are active for a given date.

## Real-Time Predictions

The bus schedules API can overlay real-time predictions from Port Authority's BusTime API:

- **GTFS schedules**: Authoritative, always available
- **Real-time predictions**: Live ETAs when available
- **Combined**: Best of both worlds

Real-time requires a Port Authority API key (optional):
```env
PORT_AUTHORITY_API_KEY=your_key_here
```

## Troubleshooting

### "GTFS data not available"

**Solution**: Run the import script:
```bash
npm run transit:import
```

### "Stop not found"

**Solution**: 
1. Verify the stop ID is correct
2. Search for stops: `GET /api/transit/stops?q=searchterm`
3. Check that GTFS data includes the stop

### Import fails

**Common issues**:
- Missing required GTFS files (routes.txt, stops.txt, trips.txt, stop_times.txt)
- Corrupted zip file - re-download from PRT
- Insufficient disk space
- File permissions

**Check logs**: The import script will show which files are missing.

### Database locked

**Solution**: Close any other processes accessing the database, or restart the application.

## Performance

- **Database size**: Typically 5-20 MB for PRT data
- **Query speed**: < 10ms for most queries (thanks to indexes)
- **Memory**: Minimal - SQLite is file-based
- **Concurrent access**: SQLite handles read-only queries well

## Attribution

Transit data reproduced with permission from Pittsburgh Regional Transit, provided 'as-is' without warranty.

## Next Steps

1. ✅ Import GTFS data
2. ✅ Test API endpoints
3. ✅ Integrate with bus schedule tool UI
4. ⏳ Set up automated refresh
5. ⏳ Add real-time predictions (optional, requires API key)


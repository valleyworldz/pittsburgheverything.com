# 🔧 DNS Fix Guide for www.pittsburgheverything.com

## Problem
The `www.pittsburgheverything.com` subdomain is showing "Invalid Configuration" in Vercel because it needs a **CNAME record** instead of an A record.

## Solution: Add CNAME Record in Namecheap

### Step 1: Go to Namecheap DNS Settings
1. Log in to Namecheap: https://www.namecheap.com/
2. Go to **Domain List** → Click **Manage** next to `pittsburgheverything.com`
3. Click on **Advanced DNS** tab

### Step 2: Add CNAME Record for www
1. Click **"Add New Record"** button
2. Select **CNAME Record** from the Type dropdown
3. Fill in:
   - **Host**: `www`
   - **Value/Target**: `cname.vercel-dns.com`
   - **TTL**: `Automatic` (or `30 min`)
4. Click **Save** (checkmark icon or Save button)

### Step 3: Verify Current Records
You should have these DNS records:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A | @ | 76.76.21.21 | Automatic |
| CNAME | www | cname.vercel-dns.com | Automatic |

**Note**: If you currently have an A record for `www` pointing to `216.198.79.1`, you need to **delete it** and replace it with the CNAME record above.

### Step 4: Wait for DNS Propagation
- DNS changes typically take **15-60 minutes** to propagate
- You can check propagation status at: https://dnschecker.org/
- Search for: `www.pittsburgheverything.com` CNAME

### Step 5: Verify in Vercel
1. Go to: https://vercel.com/valleytainment/pittsburgheverything-com/settings/domains
2. Click **"Refresh"** next to `www.pittsburgheverything.com`
3. Status should change from "Invalid Configuration" to "Valid Configuration"

## Why This Is Needed

- **Root domain** (`pittsburgheverything.com`): Uses A record pointing to Vercel's IP
- **www subdomain** (`www.pittsburgheverything.com`): **MUST** use CNAME record pointing to `cname.vercel-dns.com`

Vercel requires CNAME records for subdomains because they need to manage the routing dynamically.

## Alternative: Use Vercel's Recommended IP

If the A record isn't working, Vercel's current recommended IP is:
- **76.76.21.21** (instead of 216.198.79.1)

You can update the root domain A record to use this IP if needed.

## Quick Checklist

- [ ] Logged into Namecheap
- [ ] Opened Advanced DNS for pittsburgheverything.com
- [ ] Added CNAME record: Host=`www`, Value=`cname.vercel-dns.com`
- [ ] Removed any existing A record for `www` (if present)
- [ ] Saved changes
- [ ] Waited 15-60 minutes for propagation
- [ ] Refreshed domain in Vercel dashboard
- [ ] Verified www.pittsburgheverything.com is working

## Still Not Working?

If after 60 minutes the domain still doesn't work:

1. **Check DNS propagation**: https://dnschecker.org/
2. **Verify records are correct** in Namecheap
3. **Clear your DNS cache**:
   - macOS: `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`
   - Windows: `ipconfig /flushdns`
4. **Contact Vercel support** if DNS is correct but domain still shows invalid

---

**Last Updated**: November 21, 2025


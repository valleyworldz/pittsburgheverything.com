# 🔧 Add Google Verification DNS Record in Vercel

## ⚠️ Important: You're Using Vercel DNS!

Your domain `pittsburgheverything.com` is using **Vercel DNS** (nameservers: `ns1.vercel-dns.com` and `ns2.vercel-dns.com`).

**You MUST add the DNS TXT record in Vercel, NOT in Namecheap!**

---

## 🎯 Step-by-Step Instructions

### Step 1: Log into Vercel

1. Go to: https://vercel.com/login
2. Sign in with your account (GitHub, Google, or email)

### Step 2: Navigate to Your Project

1. In Vercel Dashboard, find your **PittsburghEverything** project
2. Click on the project name

### Step 3: Go to Domain Settings

1. Click on **"Settings"** tab (top navigation)
2. Click on **"Domains"** in the left sidebar
3. Find `pittsburgheverything.com` in the list
4. Click on the domain name

### Step 4: Access DNS Records

1. You should see a section called **"DNS Records"** or **"DNS Configuration"**
2. Click **"Add Record"** or **"Manage DNS"**

### Step 5: Add TXT Record

Click **"Add Record"** and fill in:

- **Type:** `TXT`
- **Name:** `@` (or leave blank/empty)
- **Value:** `google-site-verification=hPFeJhF-yg2ZIX_YHJ95h0ZkxtVn1IlUeUssncEcXXI`
- **TTL:** `600` (or leave as default)

### Step 6: Save

1. Click **"Save"** or **"Add Record"**
2. Wait 5-30 minutes for DNS propagation

### Step 7: Verify in Google Search Console

1. Go to: https://search.google.com/search-console
2. Go back to your verification page
3. Click **"Verify"**
4. Should work once DNS propagates!

---

## 📋 Your DNS Record Details

```
Type: TXT
Name: @ (or leave blank)
Value: google-site-verification=hPFeJhF-yg2ZIX_YHJ95h0ZkxtVn1IlUeUssncEcXXI
TTL: 600
```

---

## 🔍 Alternative: Vercel DNS Dashboard

If you can't find DNS settings in your project:

1. Go to: https://vercel.com/dashboard
2. Click on your **Team/Account** (top right)
3. Go to **"Domains"** or **"DNS"**
4. Find `pittsburgheverything.com`
5. Click **"DNS Records"** or **"Manage DNS"**
6. Add the TXT record as shown above

---

## ⚡ Quick Method: Use Vercel CLI

If you have Vercel CLI installed:

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Login
vercel login

# Add DNS record
vercel dns add pittsburgheverything.com TXT @ "google-site-verification=hPFeJhF-yg2ZIX_YHJ95h0ZkxtVn1IlUeUssncEcXXI"
```

---

## ✅ Verification Checklist

- [ ] Logged into Vercel
- [ ] Navigated to domain settings
- [ ] Added TXT record with correct value
- [ ] Saved the record
- [ ] Waited 5-30 minutes
- [ ] Verified in Google Search Console

---

## 🆘 Troubleshooting

### Can't Find DNS Settings?
- Look for "Domains" in Settings
- Check if you have the right permissions
- Try the Vercel dashboard directly: https://vercel.com/dashboard

### Record Not Working?
- Wait longer (can take up to 24 hours)
- Check for typos in the value
- Verify the record appears in Vercel DNS settings
- Use online DNS checker: https://mxtoolbox.com/TXTLookup.aspx

### Still Having Issues?
- Try the HTML meta tag method instead (already in your code!)
- Contact Vercel support
- Check Vercel documentation: https://vercel.com/docs/concepts/projects/domains

---

## 🎉 After Verification

Once verified:

1. **Submit Sitemap** in Google Search Console:
   - Go to "Sitemaps"
   - Submit: `https://pittsburgheverything.com/sitemap.xml`

2. **Request Indexing** for important pages

3. **Monitor Performance** in Search Console

---

**Remember:** Since you're using Vercel DNS, you MUST add the record in Vercel, not Namecheap!

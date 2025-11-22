# ⚡ Quick DNS Setup for Vercel

## 🎯 Your Situation

- **Domain:** pittsburgheverything.com
- **DNS Provider:** Vercel (not Namecheap!)
- **Nameservers:** ns1.vercel-dns.com, ns2.vercel-dns.com

## ✅ What to Do

### In Vercel Dashboard:

1. **Go to:** https://vercel.com/dashboard
2. **Find your project** → Click **Settings** → **Domains**
3. **Click on** `pittsburgheverything.com`
4. **Add DNS Record:**
   - Type: `TXT`
   - Name: `@` (or blank)
   - Value: `google-site-verification=hPFeJhF-yg2ZIX_YHJ95h0ZkxtVn1IlUeUssncEcXXI`
5. **Save** and wait 5-30 minutes
6. **Verify** in Google Search Console

## 📋 Exact Values

```
Type: TXT
Name: @
Value: google-site-verification=hPFeJhF-yg2ZIX_YHJ95h0ZkxtVn1IlUeUssncEcXXI
```

## ⚠️ Important

**Don't add it in Namecheap!** Your DNS is managed by Vercel, so add the record in Vercel's dashboard.

---

**That's it!** Once added, wait a few minutes and verify in Google Search Console.

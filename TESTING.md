# 🧪 KASPA-NEXUS v1.0.5 - Testing Guide

## ✅ SERVER STATUS

**Server IP:** 138.199.206.199
**Application Port:** 3000
**Status:** ✅ ONLINE

---

## 🌐 CORRECT URLs TO TEST

### Homepage:
```
http://138.199.206.199/
```

### Main Dashboard:
```
http://138.199.206.199/dashboard/main
```

**⚠️ IMPORTANT:**
- Use `/dashboard/main` (with lowercase 'm')
- NOT `/Dashboard/Main`
- NOT `/dashboard/`
- The full path is: `/dashboard/main`

---

## 🔍 TROUBLESHOOTING

### If you get 404:

1. **Clear Browser Cache:**
   - Chrome/Edge: Ctrl + Shift + Delete
   - Or use Incognito Mode: Ctrl + Shift + N

2. **Hard Refresh:**
   - Windows: Ctrl + Shift + R
   - Mac: Cmd + Shift + R

3. **Test in Terminal:**
   ```bash
   curl -I http://138.199.206.199/dashboard/main
   ```
   Should return: `HTTP/1.1 200 OK`

4. **Check if server is up:**
   ```bash
   curl http://138.199.206.199/
   ```
   Should show KASPA-NEXUS content

---

## ✅ WHAT TO SEE

### On Homepage (`/`):
- ✅ KASPA-NEXUS Logo (large, centered)
- ✅ Purple/Blue gradient background
- ✅ "Version 1.0.5" badge
- ✅ 3 Feature cards
- ✅ "Get Started" and "Learn More" buttons

### On Dashboard (`/dashboard/main`):
- ✅ **Left Sidebar (Bessere Visuelle Hierarchie!):**
  - KASPA-NEXUS logo (weiß im Light Mode, dunkel im Dark Mode)
  - 6 Navigation Bereiche (GROßE, FETTE Header):
    * 📊 **DASHBOARD** (Dropdown mit NUR 4 Dashboards!)
      - Kaspa-Nexus (Main)
      - KRC-20 Netzwerk
      - Signal Dashboard
      - Investment Hub
    * 🌐 **ECOSYSTEM** (5 Kategorien)
    * 📈 **SIGNAL DASHBOARD** (Pro)
    * 💰 **INVESTMENT HUB**
    * 🛒 **ACCOUNT & SHOP** (eigener Bereich!)
    * ℹ️ **TEAM & INFO** (eigener Bereich!)
  - Klare Hierarchie: Header fett & groß, Items normal & kleiner
  - Active items haben blauen Glow-Effekt
  - User profile at bottom (Demo User - Free badge)
  - Collapse toggle button
  - Dark Mode Toggle im Header funktioniert!

- ✅ **Top Header:**
  - Mobile menu button (hamburger)
  - Search button
  - Notifications icon
  - Dark mode toggle
  - "Upgrade" button

- ✅ **Main Content:**
  - "Welcome to KASPA-NEXUS 3.0" heading
  - 4 stats cards (Users, Signals, Win Rate, Tokens)
  - "Latest Signals" card
  - "Platform Updates" card
  - Quick Actions buttons

---

## 🎨 FEATURES TO TEST

### Sidebar:
1. Click logo → Collapse/Expand
2. Click "Kaspa-Nexus" → Active state (blue)
3. Resize to mobile (< 1024px) → Sidebar becomes drawer

### Header:
1. Click Search → Shows button interaction
2. Click Dark Mode → Toggle theme
3. Click Notifications → Badge indicator

### Responsive:
- Desktop: Full sidebar visible
- Tablet: Can collapse sidebar
- Mobile: Hamburger menu, drawer overlay

---

## 📊 SERVER VERIFICATION

### Check if Next.js is running:
```bash
ssh root@138.199.206.199
pm2 status
```
Should show: `kaspa-nexus-v3 | online`

### Check logs:
```bash
pm2 logs kaspa-nexus-v3 --lines 20
```
Should show: `✓ Ready in XXXms`

### Test endpoint:
```bash
curl -I http://localhost:3000/dashboard/main
```
Should return: `HTTP/1.1 200 OK`

---

## 🔗 DIRECT LINKS

Click these to test:

**Homepage:**
<http://138.199.206.199/>

**Dashboard:**
<http://138.199.206.199/dashboard/main>

---

## ⚠️ COMMON ISSUES

### "404 Not Found"
- ✅ Clear browser cache
- ✅ Use correct URL (lowercase `/dashboard/main`)
- ✅ Hard refresh (Ctrl + Shift + R)
- ✅ Try incognito mode

### "Connection Refused"
- Check if PM2 is running: `pm2 status`
- Restart if needed: `pm2 restart kaspa-nexus-v3`

### "Blank Page"
- Check browser console (F12)
- Look for JavaScript errors
- Try different browser

---

## 📱 MOBILE TESTING

### On Phone/Tablet:
```
http://138.199.206.199/dashboard/main
```

Features to test:
- ✅ Hamburger menu works
- ✅ Touch interactions
- ✅ Responsive layout
- ✅ Cards stack properly

---

**Status:** ✅ Server is LIVE and READY
**Version:** 1.0.5 (Korrekte Dashboard-Struktur + Visuelle Hierarchie)
**Last Updated:** November 21, 2025

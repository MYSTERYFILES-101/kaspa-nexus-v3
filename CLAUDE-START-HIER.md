# 🚀 CLAUDE CODE - START HIER!

**Projekt**: KASPA-NEXUS v3
**Letzte Aktualisierung**: 2025-11-22
**Status**: Production Live auf https://kaspa-nexus.io

---

## ⚡ WICHTIG: Bei jedem Claude Code Neustart ZUERST LESEN!

Diese Datei enthält alle kritischen Informationen für die weitere Arbeit am Projekt.

---

## 📍 Projekt-Verzeichnis

```bash
/var/www/kaspa-nexus-v3
```

**Wichtig**: IMMER in diesem Verzeichnis arbeiten, NICHT in `/root/kaspa-nexus-v3/`!

---

## 🔒 AUTOMATISCHES GIT-BACKUP-SYSTEM AKTIV

### Nach JEDER Änderung ausführen:
```bash
kaspa-save
```

### Auto-Backup läuft:
- **Intervall**: Alle 2 Stunden automatisch
- **Logs**: `/var/log/kaspa-nexus-git-backup.log`
- **Cron-Job**: Aktiv und konfiguriert

### GitHub Repository:
https://github.com/MYSTERYFILES-101/kaspa-nexus-v3

**Dokumentation**: Siehe `GIT-BACKUP-SYSTEM.md`

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15.0.3 (App Router)
- **React**: 19.0.0
- **TypeScript**: 5.7.2
- **Styling**: Tailwind CSS 3.4.15
- **Node Version**: v20+ erforderlich
- **Process Manager**: PM2 (Production)
- **Server**: Ubuntu Linux (Nginx als Reverse Proxy)

---

## 🌐 API Konfiguration

### CoinGecko Pro API
- **Key**: Gespeichert (aktiv)
- **Verwendung**: KASPA Live-Preisdaten
- **Endpoint**: `/api/tokens/KASPA`

### kas.fyi API
- **Public API**: Keine Authentifizierung erforderlich
- **Verwendung**: KRC-20 Token Daten
- **Endpoint**: `/api/tokens/[ticker]`

---

## 📊 Aktuelle Features (Stand 2025-11-22)

### ✅ Implementiert:

1. **KASPA + 39 KRC-20 Tokens**
   - Live-Preisdaten via CoinGecko Pro + kas.fyi
   - Token Detail Pages mit Charts
   - `/dashboard/ecosystem/coins`

2. **4 Dashboards**
   - `/dashboard/main` - Haupt-Dashboard
   - `/dashboard/krc20` - KRC-20 Netzwerk Hub
   - `/dashboard/signals` - Signal Dashboard (PRO Teaser)
   - `/dashboard/investment` - Investment Hub (PRO Teaser)
   - `/dashboard/account` - Account & Shop
   - `/dashboard/team` - Team & Info

3. **DEX & DeFi Platforms**
   - `/dashboard/ecosystem/defi`
   - 4 Trading Platforms (KaspaCom, Chainge DEX, Zealous Swap, KaspaCat DEX)

4. **API Endpoints**
   - `/api/tokens` - Alle Tokens
   - `/api/tokens/[ticker]` - Einzelner Token
   - `/api/kaspa` - KASPA Daten

### 🚧 Nicht implementiert:

- NFT Projects Page (`/dashboard/ecosystem/nft`)
- Gaming & Metaverse Page (`/dashboard/ecosystem/gaming`)
- Infrastructure Page (`/dashboard/ecosystem/infrastructure`)
- Signal Pro Features (AI Signals, Analytics)
- Investment Pro Features (Portfolio Generator, Future Calculator)
- API Codes System
- User Authentication

---

## 🎯 Wichtige Dateien

### Komponenten:
- **Tokens**: `/src/components/tokens/TokenCard.tsx`
- **DeFi**: `/src/components/defi/DeFiPlatformCard.tsx`
- **Sidebar**: `/src/components/layout/Sidebar/`

### Daten:
- **Mock Tokens**: `/src/data/mockTokens.ts` (39 KRC-20 Tokens)
- **Types**: `/src/types/token.ts`, `/src/types/defi.ts`

### API:
- **CoinGecko**: `/src/lib/api/coinGecko.ts`
- **kas.fyi**: `/src/lib/api/kasFyi.ts`
- **Transformers**: `/src/lib/api/transformers.ts`

### Dokumentation:
- **Handover**: `HANDOVER.md` - Vollständige Projektdokumentation
- **Token System**: `UEBERGABE-TOKEN-SYSTEM.md`
- **Git Backup**: `GIT-BACKUP-SYSTEM.md`
- **Testing**: `TESTING.md`
- **Checklist**: `CHECKLIST.md`

---

## 🚀 Deployment

### Build & Restart:
```bash
cd /var/www/kaspa-nexus-v3
npm run build
pm2 restart kaspa-nexus-v3
pm2 logs kaspa-nexus-v3 --lines 20
```

### PM2 Management:
```bash
pm2 status                    # Status anzeigen
pm2 restart kaspa-nexus-v3    # Neustart
pm2 logs kaspa-nexus-v3       # Logs ansehen
pm2 save                      # Konfiguration speichern
```

### Live-URL:
- Production: https://kaspa-nexus.io
- Port: 3000 (intern), 443 (extern via Nginx)

---

## 📝 Workflow bei Änderungen

1. **Änderungen machen**
   ```bash
   # Code bearbeiten in /var/www/kaspa-nexus-v3
   ```

2. **Testen (lokal)**
   ```bash
   npm run dev
   # Öffne http://localhost:3000
   ```

3. **Build & Deploy**
   ```bash
   npm run build
   pm2 restart kaspa-nexus-v3
   ```

4. **Git Backup**
   ```bash
   kaspa-save
   ```

5. **Verifizieren**
   - Prüfe https://kaspa-nexus.io
   - Prüfe https://github.com/MYSTERYFILES-101/kaspa-nexus-v3

---

## 🔧 Häufige Probleme

### Problem: "Permission Denied"
```bash
sudo chown -R $(whoami) /var/www/kaspa-nexus-v3
```

### Problem: Build-Fehler
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Problem: PM2 nicht gestartet
```bash
pm2 restart kaspa-nexus-v3
pm2 save
```

### Problem: Git Push schlägt fehl
```bash
git remote -v
# Sollte zeigen: https://github.com/MYSTERYFILES-101/kaspa-nexus-v3.git
```

---

## 📞 Wichtige Commands

### Git:
```bash
kaspa-save                    # Quick Save & Push
git status                    # Status anzeigen
git log --oneline -5          # Letzte 5 Commits
```

### Logs:
```bash
tail -f /var/log/kaspa-nexus-git-backup.log    # Git Backup Logs
pm2 logs kaspa-nexus-v3                        # App Logs
```

### Cron:
```bash
crontab -l                    # Cron-Jobs anzeigen
```

---

## ⚠️ WICHTIGE REGELN

### ❌ NIEMALS:
1. In `/root/kaspa-nexus-v3/` arbeiten (falsches Verzeichnis!)
2. Git Commits ohne Push machen
3. Änderungen ohne Backup (nutze `kaspa-save`)
4. `node_modules` oder `.next` committen

### ✅ IMMER:
1. In `/var/www/kaspa-nexus-v3/` arbeiten
2. Nach Änderungen: `kaspa-save` ausführen
3. Nach Änderungen: Build testen
4. Dokumentation aktualisieren (HANDOVER.md)

---

## 🎯 Für neue Claude Code Sessions

**Beim Start IMMER sagen:**

```
"Lies bitte /var/www/kaspa-nexus-v3/CLAUDE-START-HIER.md
und /var/www/kaspa-nexus-v3/HANDOVER.md"
```

Das gibt Claude Code den vollständigen Kontext!

---

## 📊 Projekt-Status

**Version**: 1.0 (package.json)
**Komponenten**: v1.0.1 - v1.0.26 (verschiedene Versionen)
**Letzter Deploy**: 2025-11-22
**GitHub Commits**: 3+ heute

**Features Completion**:
- Token System: ✅ 100%
- Dashboards: ✅ 66% (4/6)
- DeFi Platforms: ✅ 100% (nur Trading)
- API Integration: ✅ 100%
- PRO Features: ⏳ 0% (Teaser only)

---

## 🔗 Links

- **Production**: https://kaspa-nexus.io
- **GitHub**: https://github.com/MYSTERYFILES-101/kaspa-nexus-v3
- **kas.fyi**: https://kas.fyi (KRC-20 Daten Quelle)

---

**Erstellt**: 2025-11-22
**Maintainer**: KASPA-NEXUS Development Team
**Claude Code**: Immer diese Datei zuerst lesen! 🚀

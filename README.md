# KASPA-NEXUS v3.0

> Die ultimative Tracking-Plattform für das KRC-20 Ökosystem auf Kaspa

[![Production](https://img.shields.io/badge/Live-kaspa--nexus.io-success)](https://kaspa-nexus.io)
[![GitHub](https://img.shields.io/badge/GitHub-MYSTERYFILES--101-blue)](https://github.com/MYSTERYFILES-101/kaspa-nexus-v3)
[![Next.js](https://img.shields.io/badge/Next.js-15.0.3-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue)](https://www.typescriptlang.org/)

---

## 🚀 Quick Start für Entwickler

### 1. Claude Code Neustart?
**Lies zuerst:** [`CLAUDE-START-HIER.md`](./CLAUDE-START-HIER.md)

### 2. Vollständige Dokumentation?
**Lies:** [`HANDOVER.md`](./HANDOVER.md)

### 3. Git Backup System?
**Lies:** [`GIT-BACKUP-SYSTEM.md`](./GIT-BACKUP-SYSTEM.md)

---

## 📋 Aktueller Stand (2025-11-22)

### ✅ Fertig:
- 40 KRC-20 Tokens mit Live-Preisdaten (KASPA + 39 Tokens)
- 4 von 6 Dashboards (Main, KRC-20, Signals, Investment, Account, Team)
- DEX & DeFi Plattformen (4 Trading Platforms)
- API Endpoints (CoinGecko Pro + kas.fyi)
- Automatisches Git-Backup-System

### 🚧 In Entwicklung:
- NFT Projects Dashboard
- Gaming & Metaverse Dashboard
- Infrastructure Dashboard
- PRO Features (AI Signals, Portfolio Generator)

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15.0.3 (App Router)
- **React**: 19.0.0
- **TypeScript**: 5.7.2
- **Styling**: Tailwind CSS 3.4.15
- **Deployment**: PM2 + Nginx
- **Git**: Automatisches Backup-System

---

## 🔒 Git-Backup-System

**Nach jeder Änderung:**
```bash
kaspa-save
```

**Automatisch**: Alle 2 Stunden via Cron-Job

**Details**: Siehe [`GIT-BACKUP-SYSTEM.md`](./GIT-BACKUP-SYSTEM.md)

---

## 📂 Projekt-Struktur

```
/var/www/kaspa-nexus-v3/
├── app/                          # Next.js App Router
│   ├── (dashboard)/
│   │   └── dashboard/
│   │       ├── main/            # Haupt-Dashboard
│   │       ├── krc20/           # KRC-20 Hub
│   │       ├── ecosystem/       # Ecosystem Pages
│   │       │   ├── coins/       # Token Übersicht
│   │       │   └── defi/        # DeFi Plattformen
│   │       ├── signals/         # Signal Dashboard (PRO)
│   │       ├── investment/      # Investment Hub (PRO)
│   │       ├── account/         # Account & Shop
│   │       └── team/            # Team & Info
│   └── api/                     # API Routes
│       ├── tokens/              # Token API
│       └── kaspa/               # KASPA API
├── src/
│   ├── components/              # React Components
│   │   ├── tokens/             # Token Components
│   │   ├── defi/               # DeFi Components
│   │   └── layout/             # Layout Components
│   ├── lib/                    # Libraries & Utils
│   │   └── api/                # API Clients
│   ├── types/                  # TypeScript Types
│   └── data/                   # Static Data
├── public/                     # Static Assets
│   └── images/                # Banners & Logos
└── docs/                       # Dokumentation
    ├── CLAUDE-START-HIER.md   # ← START HIER!
    ├── HANDOVER.md            # Vollständige Doku
    └── GIT-BACKUP-SYSTEM.md   # Backup-System
```

---

## 🌐 Live URLs

- **Production**: https://kaspa-nexus.io
- **GitHub**: https://github.com/MYSTERYFILES-101/kaspa-nexus-v3

---

## 🎯 Für Claude Code

**Bei jedem Neustart sagen:**

> "Lies bitte `/var/www/kaspa-nexus-v3/CLAUDE-START-HIER.md` und `HANDOVER.md`"

---

## 📞 Deployment

```bash
# Build
npm run build

# Restart
pm2 restart kaspa-nexus-v3

# Logs
pm2 logs kaspa-nexus-v3

# Git Backup
kaspa-save
```

---

## 📝 License

Private - KASPA-NEXUS Development Team

---

**Letzte Aktualisierung**: 2025-11-22
**Version**: 1.0
**Status**: Production Live 🚀

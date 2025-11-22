# 🔒 KASPA-NEXUS Automatisches Git-Backup-System

**Version**: 1.0
**Erstellt**: 2025-11-22
**Zweck**: 100% sichere, automatische Git-Backups nach jeder Änderung

---

## 🎯 Problem gelöst

**Vorher**: Manuelle Commits wurden vergessen, Änderungen gingen verloren
**Jetzt**: Automatische Backups alle 2 Stunden + On-Demand Saves

---

## 🛠️ Installierte Komponenten

### 1. **Auto-Backup Script**
- **Pfad**: `/var/www/kaspa-nexus-v3/.git-auto-backup.sh`
- **Funktion**: Erkennt Änderungen, committed und pusht zu GitHub
- **Log**: `/var/log/kaspa-nexus-git-backup.log`

### 2. **Quick Save Kommando**
- **Befehl**: `kaspa-save`
- **Funktion**: Sofortiges Backup mit einem Befehl
- **Verwendung**: Einfach `kaspa-save` eingeben nach Änderungen

### 3. **Automatischer Cron-Job**
- **Intervall**: Alle 2 Stunden
- **Zeit**: :00 Uhr (00:00, 02:00, 04:00, 06:00, ...)
- **Funktion**: Automatisches Backup ohne manuelle Eingabe

### 4. **Git Watch Script** (Optional)
- **Pfad**: `/var/www/kaspa-nexus-v3/.git-watch.sh`
- **Funktion**: Überwacht Dateien und committed sofort bei Änderungen
- **Status**: Verfügbar, aber nicht automatisch gestartet

---

## 📋 Verwendung

### Option 1: Quick Save (Empfohlen)
```bash
# Nach jeder wichtigen Änderung einfach ausführen:
kaspa-save
```

### Option 2: Manuelles Backup
```bash
cd /var/www/kaspa-nexus-v3
./.git-auto-backup.sh
```

### Option 3: Automatisch (läuft bereits)
- Cron-Job alle 2 Stunden
- Keine Aktion erforderlich

---

## 🔍 Logs überprüfen

### Backup-Log ansehen
```bash
tail -f /var/log/kaspa-nexus-git-backup.log
```

### Letzte 20 Backup-Einträge
```bash
tail -20 /var/log/kaspa-nexus-git-backup.log
```

### Cron-Job Status
```bash
crontab -l
```

---

## ⚙️ Konfiguration

### Backup-Intervall ändern
```bash
# Crontab bearbeiten
crontab -e

# Aktuell: Alle 2 Stunden
0 */2 * * * /var/www/kaspa-nexus-v3/.git-auto-backup.sh

# Jede Stunde:
0 * * * * /var/www/kaspa-nexus-v3/.git-auto-backup.sh

# Alle 30 Minuten:
*/30 * * * * /var/www/kaspa-nexus-v3/.git-auto-backup.sh
```

### Watch-Modus aktivieren (Sofortige Backups)
```bash
# Terminal 1: Git Watch starten
cd /var/www/kaspa-nexus-v3
./.git-watch.sh

# Oder als Background Process:
nohup ./.git-watch.sh > /var/log/kaspa-nexus-git-watch.log 2>&1 &
```

---

## 🚨 Troubleshooting

### Problem: "Permission Denied"
```bash
chmod +x /var/www/kaspa-nexus-v3/.git-auto-backup.sh
chmod +x /usr/local/bin/kaspa-save
```

### Problem: Commits funktionieren nicht
```bash
# Git Konfiguration prüfen
git config --global user.name
git config --global user.email

# Falls leer, konfigurieren:
git config --global user.name "KASPA-NEXUS"
git config --global user.email "noreply@kaspa-nexus.io"
```

### Problem: Push schlägt fehl
```bash
# Remote prüfen
git remote -v

# Falls falsch, korrigieren:
git remote set-url origin https://github.com/MYSTERYFILES-101/kaspa-nexus-v3.git
```

---

## 📊 Commit-Format

Automatische Commits verwenden dieses Format:

```
auto: Automatic backup - X files changed at YYYY-MM-DD HH:MM:SS

Auto-generated commit by git-auto-backup.sh
Changes since last backup:
M app/page.tsx
A new-file.tsx
D old-file.tsx

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## ✅ Checkliste für jede Änderung

- [ ] Änderungen gemacht
- [ ] `kaspa-save` ausführen (oder warten auf Auto-Backup)
- [ ] Erfolgs-Meldung prüfen
- [ ] GitHub Repository checken (optional)

**GitHub Repository**: https://github.com/MYSTERYFILES-101/kaspa-nexus-v3

---

## 🎯 Garantie

Mit diesem System wird **NICHTS mehr verloren gehen**:

1. ✅ Cron-Job: Backup alle 2 Stunden automatisch
2. ✅ Quick Save: `kaspa-save` für sofortige Backups
3. ✅ Logging: Alle Backups werden protokolliert
4. ✅ GitHub: Alle Commits werden automatisch gepusht

---

## 📞 Support

Bei Problemen mit dem Backup-System:

1. Log-Dateien prüfen: `/var/log/kaspa-nexus-git-backup.log`
2. Cron-Status prüfen: `crontab -l`
3. Manuelles Backup testen: `kaspa-save`

---

**Erstellt am**: 2025-11-22
**Letzte Änderung**: 2025-11-22
**Maintainer**: KASPA-NEXUS Development Team

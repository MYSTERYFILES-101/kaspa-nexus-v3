# KASPA-NEXUS 3.0 - Arbeitsübergabe Version 1.0.1

**Datum:** 21. November 2025
**Server:** Ubuntu 24.04 LTS
**Status:** Produktionsbereit

---

## 1. SYSTEM-ÜBERSICHT

### Server-Spezifikationen
- **Betriebssystem:** Ubuntu 24.04 LTS
- **Hostname:** KASPA-NEXUS-3
- **Node.js:** v20.19.5
- **NPM:** v10.8.2
- **Projekt-Pfad:** `/var/www/kaspa-nexus-v3`

### Installierte Software-Stack
```
✓ Node.js 20.19.5
✓ NPM 10.8.2
✓ Nginx 1.24.0
✓ MariaDB 10.11.13
✓ Redis 7.0.15
✓ PM2 (neueste Version)
✓ Fail2ban 1.0.2
✓ UFW Firewall
```

---

## 2. PROJEKT-DETAILS

### Next.js Anwendung
- **Framework:** Next.js 15.0.3
- **TypeScript:** 5.7.2
- **Tailwind CSS:** 3.4.15
- **React:** 19.0.0
- **Build-Status:** ✓ Erfolgreich kompiliert

### Verzeichnisstruktur
```
/var/www/kaspa-nexus-v3/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── .next/                 (Build-Ausgabe)
├── node_modules/
├── public/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
├── postcss.config.mjs
├── ecosystem.config.js    (PM2 Konfiguration)
└── .gitignore
```

---

## 3. DATENBANK-KONFIGURATION

### MariaDB
- **Version:** 10.11.13
- **Status:** Aktiv und läuft
- **Root-Passwort:** `Kaspa#Nexus#2025!SecureDB`
- **Port:** 3306 (localhost only)

#### Zugriff
```bash
mysql -u root -p
# Passwort: Kaspa#Nexus#2025!SecureDB
```

#### Sicherheitsmaßnahmen
- ✓ Root-Passwort gesetzt
- ✓ Anonyme Benutzer entfernt
- ✓ Remote-Root-Login deaktiviert
- ✓ Test-Datenbank entfernt

---

## 4. REDIS

- **Version:** 7.0.15
- **Status:** Aktiv und läuft
- **Port:** 6379 (localhost only)
- **Konfiguration:** `/etc/redis/redis.conf`

#### Zugriff testen
```bash
redis-cli ping
# Erwartete Ausgabe: PONG
```

---

## 5. NGINX KONFIGURATION

### Reverse Proxy Setup
- **Konfigurationsdatei:** `/etc/nginx/sites-available/kaspa-nexus.io`
- **Domain:** kaspa-nexus.io (www.kaspa-nexus.io)
- **Upstream:** http://127.0.0.1:3000
- **Status:** Aktiv

#### Features
- ✓ Gzip-Kompression
- ✓ Security Headers
- ✓ WebSocket-Unterstützung
- ✓ Static File Caching
- ✓ Proxy Buffering

#### Logs
```
Access Log: /var/log/nginx/kaspa-nexus.io-access.log
Error Log:  /var/log/nginx/kaspa-nexus.io-error.log
```

#### SSL/HTTPS (noch nicht konfiguriert)
**WICHTIG:** SSL-Zertifikat muss nach DNS-Konfiguration installiert werden:

```bash
# 1. Certbot installieren
apt install certbot python3-certbot-nginx -y

# 2. SSL-Zertifikat beantragen
certbot --nginx -d kaspa-nexus.io -d www.kaspa-nexus.io

# 3. Auto-Renewal testen
certbot renew --dry-run
```

Die Nginx-Konfiguration enthält bereits auskommentierte SSL-Einstellungen!

---

## 6. PM2 PROCESS MANAGER

### Anwendungsstatus
```bash
pm2 status
pm2 logs kaspa-nexus-v3
pm2 monit
```

### Wichtige Befehle
```bash
# Anwendung neu starten
pm2 restart kaspa-nexus-v3

# Logs anzeigen
pm2 logs kaspa-nexus-v3 --lines 100

# Anwendung stoppen
pm2 stop kaspa-nexus-v3

# Anwendung aus PM2 entfernen
pm2 delete kaspa-nexus-v3

# Nach Code-Änderungen
cd /var/www/kaspa-nexus-v3
npm run build
pm2 restart kaspa-nexus-v3
```

### Auto-Start
PM2 ist für automatischen Start beim Server-Neustart konfiguriert:
```bash
# Überprüfen
systemctl status pm2-root
```

### Log-Dateien
```
Error Log:    /var/log/pm2/kaspa-nexus-v3-error.log
Output Log:   /var/log/pm2/kaspa-nexus-v3-out.log
Combined Log: /var/log/pm2/kaspa-nexus-v3-combined.log
```

---

## 7. FIREWALL & SICHERHEIT

### UFW (Uncomplicated Firewall)
```bash
# Status prüfen
ufw status

# Offene Ports
22/tcp  (SSH)
80/tcp  (HTTP)
443/tcp (HTTPS)
```

### Fail2ban
- **Status:** Aktiv
- **Konfiguration:** `/etc/fail2ban/jail.local`
- **Überwachte Services:** SSH

#### Fail2ban Befehle
```bash
# Status prüfen
systemctl status fail2ban

# Gebannte IPs anzeigen
fail2ban-client status sshd

# IP entbannen
fail2ban-client set sshd unbanip <IP-ADRESSE>
```

#### Einstellungen
- Ban-Zeit: 3600 Sekunden (1 Stunde)
- Find-Zeit: 600 Sekunden (10 Minuten)
- Max. Versuche: 5

---

## 8. DEPLOYMENT & UPDATES

### Code-Update Prozess
```bash
# 1. Zum Projekt-Verzeichnis wechseln
cd /var/www/kaspa-nexus-v3

# 2. Code aktualisieren (z.B. via git pull)
# git pull origin main

# 3. Dependencies installieren (falls package.json geändert)
npm install

# 4. Neuen Build erstellen
npm run build

# 5. Anwendung neu starten
pm2 restart kaspa-nexus-v3

# 6. Status überprüfen
pm2 status
pm2 logs kaspa-nexus-v3 --lines 50
```

### System-Updates
```bash
# Sicherheitsupdates installieren
apt update && apt upgrade -y

# Services neu starten falls nötig
systemctl restart nginx
systemctl restart mariadb
systemctl restart redis-server
pm2 restart all
```

---

## 9. MONITORING & WARTUNG

### Service-Status prüfen
```bash
# Alle Services
systemctl status nginx
systemctl status mariadb
systemctl status redis-server
systemctl status fail2ban
systemctl status pm2-root

# PM2 Anwendung
pm2 status
pm2 monit
```

### Log-Dateien Überwachung
```bash
# Nginx
tail -f /var/log/nginx/kaspa-nexus.io-access.log
tail -f /var/log/nginx/kaspa-nexus.io-error.log

# PM2
pm2 logs kaspa-nexus-v3 --lines 100

# MariaDB
tail -f /var/log/mysql/error.log

# System
journalctl -f
```

### Disk Space
```bash
# Disk-Nutzung prüfen
df -h

# PM2 Logs rotieren
pm2 flush

# Alte Logs löschen
find /var/log -type f -name "*.log" -mtime +30 -delete
```

---

## 10. BACKUP-STRATEGIE

### Datenbank-Backup
```bash
# MariaDB Backup erstellen
mysqldump -u root -p'Kaspa#Nexus#2025!SecureDB' --all-databases > /root/backup-$(date +%Y%m%d).sql

# Backup komprimieren
gzip /root/backup-$(date +%Y%m%d).sql
```

### Projekt-Backup
```bash
# Komplettes Projekt sichern
tar -czf /root/kaspa-nexus-v3-backup-$(date +%Y%m%d).tar.gz /var/www/kaspa-nexus-v3
```

### Automatisches Backup (optional)
Cronjob erstellen:
```bash
crontab -e

# Täglich um 2 Uhr morgens
0 2 * * * mysqldump -u root -p'Kaspa#Nexus#2025!SecureDB' --all-databases | gzip > /root/backup-$(date +\%Y\%m\%d).sql.gz
```

---

## 11. TROUBLESHOOTING

### Anwendung läuft nicht
```bash
# PM2 Status prüfen
pm2 status
pm2 logs kaspa-nexus-v3 --err --lines 50

# Manuell starten
cd /var/www/kaspa-nexus-v3
npm run build
pm2 restart ecosystem.config.js
```

### Nginx Fehler
```bash
# Konfiguration testen
nginx -t

# Neu laden
systemctl reload nginx

# Logs prüfen
tail -f /var/log/nginx/error.log
```

### Port 3000 bereits belegt
```bash
# Prozess finden
lsof -i :3000

# PM2 stoppen und neu starten
pm2 stop kaspa-nexus-v3
pm2 start kaspa-nexus-v3
```

### Datenbank-Verbindungsfehler
```bash
# MariaDB Status
systemctl status mariadb

# Neustart
systemctl restart mariadb

# Logs prüfen
journalctl -u mariadb -n 50
```

---

## 12. NÄCHSTE SCHRITTE

### Sofort erforderlich:
- [ ] DNS A-Record für kaspa-nexus.io auf Server-IP zeigen lassen
- [ ] SSL-Zertifikat mit Let's Encrypt einrichten
- [ ] Datenbank-Schema für die Anwendung erstellen
- [ ] Umgebungsvariablen in `.env.local` konfigurieren

### Empfohlen:
- [ ] Monitoring-Tool einrichten (z.B. Grafana, Netdata)
- [ ] Automatische Backups konfigurieren
- [ ] CDN für statische Assets einrichten (optional)
- [ ] Rate Limiting in Nginx konfigurieren
- [ ] Redis-Passwort setzen

---

## 13. WICHTIGE ZUGANGSDATEN

**⚠️ WICHTIG: Sicher aufbewahren!**

| Service  | Benutzer | Passwort                      | Port | Zugriff    |
|----------|----------|-------------------------------|------|------------|
| MariaDB  | root     | Kaspa#Nexus#2025!SecureDB     | 3306 | localhost  |
| SSH      | root     | (aus Hetzner Email)           | 22   | extern     |
| Redis    | -        | (kein Passwort gesetzt)       | 6379 | localhost  |

---

## 14. SUPPORT & KONTAKT

### Hilfreiche Ressourcen
- Next.js Dokumentation: https://nextjs.org/docs
- PM2 Dokumentation: https://pm2.keymetrics.io/docs
- Nginx Dokumentation: https://nginx.org/en/docs/
- MariaDB Dokumentation: https://mariadb.com/kb/en/

### Quick Reference Commands
```bash
# System-Info
hostnamectl
uname -a
df -h
free -h
top

# Service-Status
systemctl status nginx mariadb redis-server fail2ban

# PM2
pm2 status
pm2 logs --lines 100

# Nginx
nginx -t
systemctl reload nginx

# Firewall
ufw status verbose
```

---

## 15. VERSION HISTORY

### Version 1.0.1 (21.11.2025)
- ✓ Initiale Server-Installation
- ✓ Next.js 15 Projekt-Setup
- ✓ Nginx Reverse Proxy konfiguriert
- ✓ MariaDB installiert und gesichert
- ✓ Redis installiert
- ✓ PM2 Process Manager eingerichtet
- ✓ Firewall (UFW) konfiguriert
- ✓ Fail2ban für SSH-Schutz aktiviert
- ✓ Produktions-Build erfolgreich

---

**Ende der Arbeitsübergabe**

Bei Fragen oder Problemen, bitte die Log-Dateien konsultieren und die Troubleshooting-Sektion verwenden.

_Erstellt am: 21. November 2025_
_Server: KASPA-NEXUS-3 (Ubuntu 24.04 LTS)_
_Version: 1.0.1_

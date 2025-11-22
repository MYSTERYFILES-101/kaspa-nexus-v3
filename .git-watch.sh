#!/bin/bash
# Git Watch Script - Überwacht Dateiänderungen und committed automatisch

REPO_DIR="/var/www/kaspa-nexus-v3"
WATCH_DIRS="app src public"
LOG_FILE="/var/log/kaspa-nexus-git-watch.log"

cd "$REPO_DIR" || exit 1

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Git Watch gestartet - Überwache: $WATCH_DIRS" | tee -a "$LOG_FILE"

# Installiere inotify-tools falls nicht vorhanden
if ! command -v inotifywait &> /dev/null; then
    echo "Installiere inotify-tools..."
    apt-get update && apt-get install -y inotify-tools
fi

# Überwache Verzeichnisse auf Änderungen
inotifywait -m -r -e modify,create,delete,move \
    --exclude '\.git|node_modules|\.next' \
    $WATCH_DIRS |
while read -r directory event file; do
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Änderung erkannt: $directory$file ($event)" | tee -a "$LOG_FILE"

    # Warte 30 Sekunden nach letzter Änderung
    sleep 30

    # Führe Auto-Backup aus
    /var/www/kaspa-nexus-v3/.git-auto-backup.sh
done

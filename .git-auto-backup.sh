#!/bin/bash
# Automatisches Git Backup Script
# Führt automatische Commits und Pushes durch

# Farben für Output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

REPO_DIR="/var/www/kaspa-nexus-v3"
LOG_FILE="/var/log/kaspa-nexus-git-backup.log"

cd "$REPO_DIR" || exit 1

# Logging Funktion
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log "=========================================="
log "Starting automatic Git backup..."

# Prüfe ob Änderungen vorhanden sind
if [[ -z $(git status -s) ]]; then
    log "No changes detected. Skipping backup."
    exit 0
fi

log "Changes detected:"
git status -s | tee -a "$LOG_FILE"

# Automatischer Commit
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
CHANGED_FILES=$(git status -s | wc -l)

git add .

COMMIT_MSG="auto: Automatic backup - $CHANGED_FILES files changed at $TIMESTAMP

Auto-generated commit by git-auto-backup.sh
Changes since last backup:
$(git status -s)

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"

git commit -m "$COMMIT_MSG"

if [ $? -eq 0 ]; then
    log "${GREEN}✅ Commit successful${NC}"
else
    log "${RED}❌ Commit failed${NC}"
    exit 1
fi

# Push zu GitHub
log "Pushing to GitHub..."
git push origin main 2>&1 | tee -a "$LOG_FILE"

if [ $? -eq 0 ]; then
    log "${GREEN}✅ Push successful - All changes backed up to GitHub${NC}"
else
    log "${RED}❌ Push failed - Changes committed locally but not pushed${NC}"
    exit 1
fi

log "Backup completed successfully!"
log "=========================================="

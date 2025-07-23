#!/usr/bin/env bash
# Usage: ./log.sh <scope> "<markdown bullets>"
DATE=$(date +"%F")
SCOPE=${1:-misc}
ENTRY="## ${DATE}  [${SCOPE}]\n\n${2}\n\n"
echo -e "$ENTRY$(cat CLAUDE_LOG.md)" > CLAUDE_LOG.md
git add CLAUDE_LOG.md
git commit -m "docs: log ${DATE} ${SCOPE}"
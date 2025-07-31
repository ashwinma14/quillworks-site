# 📸 Snapshot Management Strategy

## Overview

This document outlines the snapshot management strategy for visual regression testing in the Quillworks project.

## Directory Structure

```
snapshots/
├── archive/                    # Historical snapshots
│   └── YYYY-MM-DD/            # Date-based archives
│       ├── *-snapshots/       # Actual snapshot files
│       └── README.md          # Context and metadata
└── active/                    # Current work reference
    └── README.md              # Points to active baseline
```

## Snapshot Lifecycle

### 1. Development Phase
- Snapshots live in `tests/*-snapshots/` directories
- Modified as features are developed
- Backed up before major changes

### 2. Validation Phase
- All visual tests must pass
- Snapshots reviewed for correctness
- Tagged with descriptive commit message

### 3. Archive Phase
- On production promotion
- Copy to `snapshots/archive/YYYY-MM-DD/`
- Create comprehensive README
- Tag with `prod-visual-lock-YYYY-MM-DD`

### 4. Reference Phase
- Active development references archived baseline
- `snapshots/active/README.md` points to current baseline
- Used for rollback and comparison

## Management Commands

### Backup Current Snapshots
```bash
npm run snapshots backup
# Creates: .snapshot-backups/snapshots-YYYY-MM-DDTHH-MM-SS/
```

### List Available Backups
```bash
npm run snapshots list
# Shows all backups with git references
```

### Restore from Backup
```bash
npm run snapshots restore snapshots-2025-07-30T15-30-00
# Restores specific backup to tests/
```

### Validate Integrity
```bash
npm run snapshots validate
# Checks file sizes and git status
```

### Clean Old Backups
```bash
npm run snapshots clean
# Keeps only last 10 backups
```

## Best Practices

### 1. Before Visual Changes
Always backup:
```bash
npm run snapshots backup
git add -A && git commit -m "chore: backup snapshots before visual changes"
```

### 2. Updating Snapshots
Document why:
```bash
npx playwright test --update-snapshots
git add -A && git commit -m "test: update snapshots for new Hero spacing"
```

### 3. Production Archives
Create on milestones:
```bash
# After production promotion
cp -r tests/*-snapshots snapshots/archive/$(date +%Y-%m-%d)/
```

### 4. Feature Branch Strategy
```bash
# Start from production baseline
git checkout prod-visual-lock-2025-07-30
git checkout -b feature/new-visual-feature

# Reference active baseline
cat snapshots/active/README.md
```

## Snapshot Sizing

### Guidelines
- Monitor snapshot sizes with `npm run snapshots validate`
- Warning threshold: 5MB per file
- Use Git LFS for files >10MB (if needed)

### Optimization
- Use PNG format (default)
- Avoid full-page snapshots when possible
- Focus on changed components

## Troubleshooting

### Snapshot Mismatch
1. Check if changes are intentional
2. Review visual diff in `test-results/`
3. Update if correct, rollback if not

### Large Snapshot Files
1. Check image dimensions
2. Consider component-level snapshots
3. Use `clip` option in Playwright

### Missing Snapshots
1. Run tests with `--update-snapshots`
2. Restore from backup if available
3. Regenerate from known good commit

## Git Integration

### Commit Messages
```bash
# For updates
test: update snapshots for [component] changes

# For backups  
chore: backup snapshots before [feature]

# For archives
chore: archive production snapshots YYYY-MM-DD
```

### Branch Protection
- Snapshot changes require PR review
- Visual diff artifacts in PR comments
- Approval needed for snapshot updates

## Rollback Procedures

### Quick Rollback
```bash
# From backup
npm run snapshots restore snapshots-YYYY-MM-DD

# From archive
cp -r snapshots/archive/YYYY-MM-DD/*-snapshots tests/

# From git
git checkout prod-visual-lock-YYYY-MM-DD -- tests/*-snapshots/
```

### Verification
```bash
# After rollback
npm run test:visual:all
npm run snapshots validate
```

## Archive Retention

### Policy
- Keep all production archives (tagged)
- Keep monthly archives for 1 year
- Keep weekly backups for 1 month
- Clean temporary backups after 2 weeks

### Implementation
```bash
# Manual cleanup
find snapshots/archive -type d -mtime +365 -name "2*" | grep -v prod-visual-lock

# Automated cleanup
npm run snapshots clean
```

---

**Last Updated**: 2025-07-30  
**Version**: 1.0.0  
**Owner**: QA Team
# Main Branch Sync Instructions

## Purpose
Reset the `main` branch to the validated production state (commit `0246dc3`) using a clean squash-merge strategy. This removes old experimental commit clutter while preserving the current validated production output.

## Branch Information
- **Source Branch**: `main-sync`
- **Target Branch**: `main`
- **Base Commit**: `0246dc3` (prod-visual-lock-2025-07-30)
- **Strategy**: Squash and merge

## Step-by-Step Instructions

### 1. Create Pull Request
Navigate to: https://github.com/ashwinma14/quillworks-site/pull/new/main-sync

Or use GitHub CLI:
```bash
gh pr create --base main --head main-sync --title "Reset main to production baseline" --body "Squash-merge to reset main branch to validated production state (commit 0246dc3)"
```

### 2. Pull Request Settings
- **Title**: "Reset main to production baseline"
- **Description**: 
  ```
  ## Purpose
  Reset main branch to the validated production state from commit 0246dc3
  
  ## Changes
  - Syncs main with prod-visual-lock-2025-07-30 tag
  - Removes old experimental commits
  - Preserves validated visual state
  
  ## Method
  This PR will be squash-merged to create a clean history
  ```

### 3. Merge Strategy
**IMPORTANT**: Use **Squash and merge** (not regular merge)
- This creates a single clean commit on main
- Removes all intermediate experimental commits
- Preserves the exact file state from production

### 4. Post-Merge Verification
After merging:
```bash
git checkout main
git pull origin main
git log --oneline -5  # Should show clean history
```

## Vercel Configuration Check

If your project uses `.vercel/project.json`, verify the production branch setting:

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "devCommand": "npm run dev",
  "git": {
    "deploymentEnabled": {
      "main": true
    }
  }
}
```

**Note**: Since `.vercel/` directory is not present in this repository, Vercel is likely using default settings where `main` is the production branch.

## Why Squash-Merge?

1. **Clean History**: Removes dozens of experimental commits
2. **Single Source of Truth**: One commit represents the entire validated state
3. **Easy Rollback**: If needed, can easily revert one commit
4. **Audit Trail**: Commit message documents the reset action

## Important Notes

- Do NOT use regular merge or rebase
- This is a one-time cleanup operation
- Future PRs should follow normal merge strategies
- Tag `prod-visual-lock-2025-07-30` remains as permanent reference

---

**Last Updated**: 2025-07-30  
**Next Step**: Create PR and squash-merge as instructed above
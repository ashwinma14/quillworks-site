# 🛡️ Branch Protection and Deployment Rules

This document outlines the required protection settings for GitHub and Vercel. Note that Claude Code cannot automatically enforce these UI settings - they must be configured manually.

## 📌 GitHub Branch Protection Rules

### Main Branch Protection

Navigate to: `Settings → Branches → Add rule`

#### Branch name pattern: `main`

**Protect matching branches:**

✅ **Require a pull request before merging**
- [ ] Require approvals: 1
- [ ] Dismiss stale pull request approvals when new commits are pushed
- [ ] Require review from CODEOWNERS (if applicable)

✅ **Require status checks to pass before merging**
- [ ] Require branches to be up to date before merging
- **Required status checks:**
  - `visual-regression / visual-tests`
  - `visual-regression / mobile-visual-tests`
  - `build`
  - `lint`
  - `check-types`

✅ **Require conversation resolution before merging**

✅ **Require linear history** (optional but recommended)
- Enforces squash-merge or rebase-merge only
- Prevents merge commits

✅ **Include administrators**
- Apply rules even to repository administrators

✅ **Restrict who can push to matching branches** (optional)
- Add specific users or teams if needed

**Do not allow:**
- ❌ Allow force pushes
- ❌ Allow deletions

### Additional Recommended Rules

#### Pattern: `prod-*`
Protect production tags from accidental deletion:
- ✅ Restrict who can push
- ❌ Allow deletions

## 🚀 Vercel Deployment Protection

### Production Environment Settings

Navigate to: `Project Settings → Git → Production Branch`

**Production Branch**: `main`

### Deployment Protection

Navigate to: `Project Settings → Deployment Protection`

**For Production Environment:**

✅ **Deployment Protection**
- Enable: "Only deploy when promoted to production"
- This requires manual promotion for all production deployments

✅ **Branch Deployments**
- Production: Only from `main` branch
- Preview: All branches except `main`

**Recommended Settings:**

```
Production Branch: main
Deploy Previews: Enabled for all branches
Production Deployments: Manual promotion only
```

### Environment Variables

If using different configs for production:

```
Production:
- NODE_ENV=production
- NEXT_PUBLIC_API_URL=https://api.quillworks.com

Preview:
- NODE_ENV=development
- NEXT_PUBLIC_API_URL=https://staging-api.quillworks.com
```

## 🔒 CODEOWNERS (Optional)

Create `.github/CODEOWNERS` if you want to require specific reviewers:

```
# Global owners
* @quillworks-team

# Visual system owners
/tests/ @visual-team
/snapshots/ @visual-team
VISUAL_*.md @visual-team

# Design system
/src/styles/ @design-team
/src/components/ @design-team
```

## 📋 Implementation Checklist

### GitHub Setup
- [ ] Navigate to repository Settings
- [ ] Add branch protection rule for `main`
- [ ] Enable required status checks
- [ ] Set up required reviews
- [ ] Enable linear history (if desired)
- [ ] Protect production tags

### Vercel Setup
- [ ] Set `main` as production branch
- [ ] Enable deployment protection
- [ ] Require manual promotion
- [ ] Configure environment variables
- [ ] Disable auto-deploy for production

### Verification
- [ ] Try to push directly to main (should fail)
- [ ] Create PR without passing tests (should block merge)
- [ ] Deploy preview from feature branch (should work)
- [ ] Check production requires manual promotion

## 🚨 Important Notes

1. **Manual Configuration Required**: These settings must be configured through the GitHub and Vercel UIs
2. **Team Permissions**: Ensure team members have appropriate access levels
3. **Emergency Override**: Keep at least one admin who can bypass in emergencies
4. **Regular Review**: Review these settings quarterly

## 📊 Monitoring

### GitHub
- Check "Branches" page for protection status
- Monitor "Settings → Webhooks" for CI integration
- Review "Insights → Community" for standards compliance

### Vercel
- Monitor "Deployments" page for promotion patterns
- Check "Analytics" for deployment frequency
- Review "Logs" for deployment failures

## 🔄 Rollback Access

Ensure these roles can perform emergency rollbacks:
- Repository administrators
- Deployment team leads
- On-call engineers

Document emergency contacts in your team runbook.

---

**Last Updated**: 2025-07-30  
**Review Schedule**: Quarterly  
**Owner**: Platform Team
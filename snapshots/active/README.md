# Active Development Snapshot Reference

**Base Reference**: Production archive from 2025-07-30  
**Source Commit**: 0246dc3  
**Source Tag**: prod-visual-lock-2025-07-30  
**Current Branch**: feature/next-phase  

## Description

This directory contains the active snapshot reference for current development work. It serves as a quick reference to the last validated production state while working on new features. The actual snapshots remain in the tests directory - this is documentation only.

## Snapshot Contents

- **hero-wrapping.spec.ts-snapshots/**: Hero headline typography wrapping tests (3 files)
- **icon-consistency.spec.ts-snapshots/**: Icon rendering consistency tests (1 file)  
- **mobile-accessibility.spec.ts-snapshots/**: Mobile device visual tests (3 files)
- **thesis.spec.ts-snapshots/**: Thesis section visual tests (2 files)
- **visual-integrity.spec.ts-snapshots/**: Comprehensive visual protection tests (7 files)
- **visual-parity.spec.ts-snapshots/**: Baseline comparison tests (5 files)

**Total**: 21 snapshot files across 6 test suites

## Test Results at Time of Archive

- ✅ All 25 visual regression tests passing
- ✅ Ultra-strict diff thresholds (0.005%-0.03%) maintained
- ✅ Typography wrapping locked across lg/xl/2xl breakpoints
- ✅ Icons rendering at exactly 28×28px with consistent colors
- ✅ Mobile accessibility compliance (touch targets ≥44×44px)
- ✅ Font loading <4s on 3G networks
- ✅ No FOUT/FOIT detected

## Usage

These snapshots serve as the immutable reference for production visual state. Any future visual changes should be compared against this baseline to ensure intentional modifications only.

To restore these snapshots:
```bash
cp -r snapshots/archive/2025-07-30/*-snapshots tests/
```

## Related Tags

- `prod-visual-lock-2025-07-30`: Production tag for commit 0246dc3
- `visually-locked-2025-07-30`: Original visual lock tag
- `visual-baseline-2025-07-30`: Initial baseline tag
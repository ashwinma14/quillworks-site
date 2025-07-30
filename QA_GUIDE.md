# 📐 Quillworks Visual QA Guide

This guide documents the pixel-perfect alignment process with the Aura HTML baseline and provides guidelines for maintaining visual fidelity.

## 🎯 Baseline Reference

**Source**: `/src/tmp/generated.html` - Direct export from Aura design tool  
**Target**: Achieve pixel-perfect parity between React implementation and baseline HTML

## 🔧 Quick Comparison Tool

```bash
# Start comparison workflow (opens both baseline and live site)
npm run compare-baseline

# With custom zoom for detailed inspection
npm run compare-baseline --zoom=150

# Save zoom preference for future sessions
npm run compare-baseline --default-zoom=125 --remember
```

## 🎨 Critical Visual Elements

### Hero Section Typography

- **Font**: Instrument Serif (not Merriweather)
- **Exact classes**: `font-['Instrument_Serif'] font-semibold tracking-tight text-[#353535] leading-[1.1] text-[clamp(48px,8vw,88px)] -tracking-[0.5px] mb-6`
- **Key detail**: Both `tracking-tight` AND `-tracking-[0.5px]` required for correct kerning
- **Color**: `#353535` (not `text-charcoal` custom token)

### NavBar Branding

- **Font**: Instrument Serif for brand name
- **Classes**: `font-['Instrument_Serif'] font-bold text-[22px] tracking-[0.01em] text-[#353535]`
- **Button focus**: `focus-visible:outline-[#67705D]` (exact hex)

### StoryCards Layout

- **Container**: `flex flex-wrap justify-center` (not CSS Grid)
- **Card width**: `w-[300px]` (fixed, not max-width)
- **Icon container**: `w-14 h-14` (NOT `size-14` - linter override required)
- **Shadow**: `shadow-[0_4px_16px_rgba(103,112,93,0.08)]`
- **Class order**: Matches baseline exactly for consistent rendering

### Color System

All colors use exact hex values from baseline:

- **Primary**: `#67705D`
- **Charcoal**: `#353535`
- **Paper**: `#FAFAF7`

## 🔍 QA Checklist

### Typography Verification

- [ ] Hero uses Instrument Serif font family
- [ ] NavBar brand uses Instrument Serif
- [ ] Letter spacing matches baseline exactly
- [ ] Line heights render identically
- [ ] No font flash (FOUT) on load

### Layout Verification

- [ ] StoryCards use flexbox, not grid
- [ ] All cards have `w-[300px]` fixed width
- [ ] Icon containers use `w-14 h-14` sizing
- [ ] Proper visual flow from Hero to StoryCards
- [ ] Responsive behavior matches baseline

### Color Verification

- [ ] All text colors use exact hex values
- [ ] Focus states use correct hex colors
- [ ] No custom Tailwind color tokens in critical areas

### Performance Verification

- [ ] Fonts load with `display: swap`
- [ ] Critical fonts are preloaded
- [ ] No layout shift during font loading

## 🚨 Common Issues & Solutions

### Linter Overwrites

**Problem**: ESLint changes `w-14 h-14` to `size-14`  
**Solution**: Add `{/* eslint-disable-next-line tailwindcss/no-custom-classname */}` above affected elements

### Font Loading Issues

**Problem**: Merriweather loads instead of Instrument Serif  
**Solution**: Ensure `font-['Instrument_Serif']` class is in Tailwind safelist

### Color Mismatches

**Problem**: Custom tokens don't match baseline exactly  
**Solution**: Use direct hex values (`text-[#353535]`) in critical components

### Layout Differences

**Problem**: CSS Grid vs Flexbox creates different wrapping behavior  
**Solution**: Always use `flex flex-wrap justify-center` for StoryCards to match baseline

## 📸 Chromatic Testing Strategy

### Noise Suppression

Components include `data-chromatic` attributes to ignore minor rendering differences:

- `data-chromatic="ignore-text-rendering"` - Font antialiasing variations
- `data-chromatic="ignore-shadow-variations"` - Cross-browser shadow rendering
- `data-chromatic="ignore-icon-antialiasing"` - Icon rendering differences

### Review Process

1. **Pre-change audit**: Document current visual state
2. **Human review required**: Typography changes trigger comprehensive diffs
3. **Staged acceptance**: Review components individually, not bulk approval
4. **Documentation**: Add PR comments explaining alignment rationale

## 🎨 Visual Documentation

### Before/After Screenshots

Store comparison screenshots in `/chromatic/screenshots/` showing:

- Hero typography alignment
- StoryCards layout corrections
- Color accuracy improvements
- Focus state corrections

### Key Measurement Points

- Hero heading letter spacing
- StoryCard icon alignment within containers
- Button focus ring thickness and color
- Overall visual rhythm and spacing

## 🔄 Maintenance Guidelines

### Future Contributor Guidelines

1. **Never "fix" w-14 h-14 to size-14** - This breaks icon alignment
2. **Don't replace hex colors with custom tokens** in critical components
3. **Always test with baseline comparison** before committing typography changes
4. **Update this guide** when making visual system changes

### Regression Prevention

- Use the comparison tool for every visual change
- Run Chromatic tests before merging
- Document any intentional deviations from baseline
- Keep baseline HTML file updated if design iterations occur

---

_This guide ensures long-term maintenance of pixel-perfect visual fidelity with the Aura design baseline._

# 📸 Chromatic Visual Testing Documentation

This directory contains documentation and artifacts for Chromatic visual regression testing of Quillworks components.

## 🎯 Overview

Chromatic provides automated visual testing for our Storybook components, ensuring that changes don't introduce unintended visual regressions while maintaining pixel-perfect alignment with our Aura baseline.

## 🔧 Workflow Integration

### Automatic Testing
Chromatic runs automatically on:
- All pushes to any branch
- All pull requests
- Manual workflow dispatch

See `.github/workflows/chromatic.yml` for configuration details.

## 🎨 Baseline Alignment Strategy

### Typography-Level Changes
After implementing pixel-perfect alignment with `/src/tmp/generated.html`, expect comprehensive visual diffs across all components due to:

1. **Font Family Changes**: Merriweather → Instrument Serif
2. **Typography Precision**: Added `tracking-tight` + `-tracking-[0.5px]` combinations
3. **Color Exactness**: Custom tokens → exact hex values (`#353535`, `#67705D`)
4. **Layout Corrections**: Grid → Flexbox for StoryCards

### Expected Components with Diffs
- ✅ **Hero**: Typography, font family, color corrections
- ✅ **NavBar**: Font family, color corrections  
- ✅ **StoryCards**: Layout, icon sizing, color corrections

## 🚨 Noise Suppression

### Data Attributes for Cross-Browser Consistency
Components include Chromatic ignore attributes for known rendering variations:

```jsx
// Hero heading - ignore font antialiasing differences
<h1 data-chromatic="ignore-text-rendering">

// StoryCard containers - ignore shadow rendering variations  
<div data-chromatic="ignore-shadow-variations">

// Icon containers - ignore SVG antialiasing differences
<div data-chromatic="ignore-icon-antialiasing">
```

### Why Noise Suppression?
- **Font Antialiasing**: Varies across browsers and rendering engines
- **Shadow Rendering**: Subtle differences in blur algorithms
- **SVG Rendering**: Icon antialiasing inconsistencies
- **Sub-pixel Rendering**: Slight positioning variations

## 📋 Review Process

### Pre-Typography Changes (Baseline)
Before implementing Instrument Serif and exact color matching:
- Hero used Merriweather serif font
- Colors used Tailwind custom tokens
- StoryCards used CSS Grid layout
- Some icon containers used `size-14` utility

### Post-Typography Changes (Target State)
After pixel-perfect alignment implementation:
- Hero uses Instrument Serif with exact baseline kerning
- All critical colors use exact hex values
- StoryCards use Flexbox layout matching baseline
- All icon containers use `w-14 h-14` for proper alignment

### Human Review Requirements
⚠️ **MANDATORY**: All typography-level changes require human review before snapshot acceptance because:

1. **Design Intent**: Typography changes affect brand consistency
2. **Accessibility**: Font changes may impact readability
3. **Cross-Browser**: Typography renders differently across browsers
4. **Pixel Precision**: Sub-pixel differences matter for brand fidelity

### Review Checklist
- [ ] Hero typography matches Instrument Serif baseline exactly
- [ ] NavBar branding uses correct font family
- [ ] StoryCards layout uses flexbox (not grid)
- [ ] All colors match exact hex values from baseline
- [ ] Icon alignment is pixel-perfect within containers
- [ ] No unintended layout shifts or spacing changes

## 🎯 Component-Specific Notes

### Hero Component
**Expected Changes:**
- Font family: Merriweather → Instrument Serif
- Letter spacing: Combined `tracking-tight` + `-tracking-[0.5px]`
- Color: `text-charcoal` → `text-[#353535]`

**Review Focus:**
- Kerning accuracy (especially in hero heading)
- Font loading and fallback behavior
- Focus state color accuracy

### NavBar Component  
**Expected Changes:**
- Brand font: Merriweather → Instrument Serif
- Color precision for focus states

**Review Focus:**
- Brand text rendering consistency
- Button focus ring color accuracy

### StoryCards Component
**Expected Changes:**
- Layout: CSS Grid → Flexbox
- Icon containers: `size-14` → `w-14 h-14`
- Color precision in headings

**Review Focus:**
- Card wrapping behavior (3 cards per row when space allows)
- Icon centering within circular containers
- Shadow rendering consistency

## 📁 File Organization

```
chromatic/
├── README.md                 # This documentation
├── screenshots/             # Before/after comparison images
│   ├── hero-typography-before.png
│   ├── hero-typography-after.png
│   ├── storycards-layout-before.png
│   └── storycards-layout-after.png
└── review-notes/           # Detailed review documentation
    ├── typography-alignment-2024.md
    └── color-precision-audit.md
```

## 🔗 Related Documentation

- **QA Guide**: `/QA_GUIDE.md` - Manual comparison workflow
- **Baseline Comparison**: `npm run compare-baseline` - Side-by-side QA tool
- **Tailwind Config**: Typography and color token documentation
- **Component Stories**: Individual component documentation in Storybook

## 📞 Troubleshooting

### Common Issues

**Issue**: All stories show diffs after typography changes  
**Solution**: This is expected. Review each component individually using the checklist above.

**Issue**: Shadow/gradient rendering differences  
**Solution**: Check if `data-chromatic` attributes are properly applied to suppress noise.

**Issue**: Font loading inconsistencies  
**Solution**: Verify font preloading in `_document.tsx` and check network tab for proper loading.

### Getting Help

1. **Reference the QA Guide** for manual comparison workflows
2. **Use the comparison tool**: `npm run compare-baseline --zoom=150`
3. **Check baseline HTML**: `/src/tmp/generated.html` for exact specifications
4. **Review Tailwind config**: Font family and color token definitions

---

*This documentation ensures consistent visual testing practices and proper review of typography-level changes.*
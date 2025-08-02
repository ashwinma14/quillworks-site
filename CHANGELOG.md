# Changelog

All notable changes to the Quillworks site will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2025-08-02] - 2025-08-02

### Added
- Formspree integration for email capture, replacing Substack iframe
- Snapshot backup and restore utilities (`npm run snapshots`, `npm run snapshots:restore`)
- Production visual lock tagging system

### Changed
- Increased hero heading vertical spacing for better visual rhythm (mb-8 sm:mb-10 lg:mb-12)
- Chromatic CI now accepts visual changes without failing (exitZeroOnChanges: true)
- Upgraded all CI workflows to Node 20

### Fixed
- Chromatic workflow configuration for proper visual change handling
- Pre-commit hook compatibility with visual test updates

### Removed
- Deprecated Chromatic workflow inputs (diffThreshold, diffIncludeAntiAliasing)
- Substack iframe component and related tests

### Security
- Email capture now uses server-side validation via Formspree
- Added honeypot field for spam protection

## [1.0.0] - 2025-07-30

### Added
- Initial release of Quillworks splash page
- Hero section with email capture
- Story cards explaining the Quillworks philosophy
- Visual regression testing with Playwright
- Chromatic integration for component testing
- GitHub Actions CI/CD pipeline
#!/usr/bin/env node
/**
 * Archives current Playwright or Chromatic snapshot directories
 * into snapshots/archive/YYYY-MM-DD/
 */
const { execSync } = require('child_process');
const { existsSync } = require('fs');

const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
const dest = `snapshots/archive/${today}`;
const src = 'tests/**/*-snapshots'; // adjust if needed

// create target directory
execSync(`mkdir -p ${dest}`, { stdio: 'inherit' });

// copy snapshots if they exist
if (existsSync('tests')) {
  try {
    // Find all snapshot directories
    const snapshotDirs = execSync('find tests -name "*-snapshots" -type d', {
      encoding: 'utf8',
    })
      .trim()
      .split('\n')
      .filter(Boolean);

    if (snapshotDirs.length > 0) {
      // Copy each directory
      snapshotDirs.forEach((dir) => {
        execSync(`cp -R ${dir} ${dest}/`, { stdio: 'inherit' });
      });
      console.log(`📸  Snapshots archived → ${dest}/`);
      console.log(`   Archived ${snapshotDirs.length} snapshot directories`);
    } else {
      console.warn('⚠️  No snapshot directories found.');
    }
  } catch (error) {
    console.warn('⚠️  Error archiving snapshots:', error.message);
  }
} else {
  console.warn('⚠️  No tests directory found.');
}

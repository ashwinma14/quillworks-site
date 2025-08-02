#!/usr/bin/env node
/**
 * Restores snapshots from archive
 * Usage: npm run snapshots:restore 2025-08-02
 */
const day = process.argv[2];
if (!day) throw new Error('Provide archive date (YYYY-MM-DD)');
require('child_process').execSync(`cp -R snapshots/archive/${day}/* tests/`, {
  stdio: 'inherit',
});
console.log(`✅ Restored snapshots from ${day}`);

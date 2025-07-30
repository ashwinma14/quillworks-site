#!/usr/bin/env node

/* eslint-disable no-console, no-plusplus, no-await-in-loop, no-promise-executor-return, no-use-before-define, radix */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const http = require('http');

const CONFIG_FILE = '.compare-config.json';
const DEV_SERVER_URL = 'http://localhost:3001';
const BASELINE_PATH = path.join(__dirname, '../src/tmp/generated.html');

// Default configuration
const DEFAULT_CONFIG = {
  defaultZoom: 100,
  openSequence: 'baseline-first',
  waitForServer: true,
  maxRetries: 10,
  retryDelay: 1000,
};

/**
 * Load configuration from file or use defaults
 */
function loadConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
      return { ...DEFAULT_CONFIG, ...config };
    }
  } catch (error) {
    console.warn('⚠️  Warning: Could not load config file, using defaults');
  }
  return DEFAULT_CONFIG;
}

/**
 * Save configuration to file
 */
function saveConfig(config) {
  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
    console.log('✅ Configuration saved');
  } catch (error) {
    console.error('❌ Failed to save configuration:', error.message);
  }
}

/**
 * Parse command line arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg.startsWith('--zoom=')) {
      options.zoom = parseInt(arg.split('=')[1]);
    } else if (arg.startsWith('--default-zoom=')) {
      options.defaultZoom = parseInt(arg.split('=')[1]);
      options.saveConfig = true;
    } else if (arg === '--remember') {
      options.saveConfig = true;
    } else if (arg === '--help' || arg === '-h') {
      showHelp();
      process.exit(0);
    }
  }

  return options;
}

/**
 * Show help message
 */
function showHelp() {
  console.log(`
📐 Quillworks Baseline Comparison Tool

Usage:
  npm run compare-baseline [options]

Options:
  --zoom=N             Set zoom level for this session (e.g., --zoom=150)
  --default-zoom=N     Set and save default zoom level
  --remember           Save current settings as default
  --help, -h           Show this help message

Examples:
  npm run compare-baseline                    # Use saved settings
  npm run compare-baseline --zoom=150         # Use 150% zoom for this session
  npm run compare-baseline --default-zoom=125 # Set persistent default zoom
  npm run compare-baseline --remember         # Save current settings
  
The tool will:
1. Check if Next.js dev server is running on localhost:3001
2. Wait for server readiness if needed
3. Open baseline HTML file in browser
4. Open live site in browser
5. Provide instructions for side-by-side comparison
`);
}

/**
 * Check if dev server is running
 */
function checkServerHealth() {
  return new Promise((resolve) => {
    const req = http.get(DEV_SERVER_URL, (res) => {
      resolve(res.statusCode === 200);
    });

    req.on('error', () => {
      resolve(false);
    });

    req.setTimeout(2000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

/**
 * Wait for server to be ready
 */
async function waitForServer(config) {
  if (!config.waitForServer) {
    return true;
  }

  console.log('🔍 Checking dev server status...');

  for (let i = 0; i < config.maxRetries; i++) {
    const isHealthy = await checkServerHealth();

    if (isHealthy) {
      console.log('✅ Dev server is ready');
      return true;
    }

    if (i === 0) {
      console.log('⏳ Dev server not ready, waiting...');
    }

    await new Promise((resolve) => setTimeout(resolve, config.retryDelay));
  }

  console.log(
    '❌ Dev server not responding. Please start it with: npm run dev'
  );
  return false;
}

/**
 * Open URL in default browser
 */
function openURL(url, zoom = 100) {
  const { platform } = process;
  let command;
  let args;

  if (platform === 'darwin') {
    // macOS
    command = 'open';
    args = [url];
  } else if (platform === 'win32') {
    // Windows
    command = 'start';
    args = ['', url];
  } else {
    // Linux
    command = 'xdg-open';
    args = [url];
  }

  try {
    spawn(command, args, { detached: true, stdio: 'ignore' });

    if (zoom !== 100) {
      console.log(
        `🔍 Opened at ${zoom}% zoom (you may need to adjust manually)`
      );
    }
  } catch (error) {
    console.error(`❌ Failed to open ${url}:`, error.message);
  }
}

/**
 * Main function
 */
async function main() {
  console.log('📐 Quillworks Baseline Comparison Tool\n');

  const config = loadConfig();
  const options = parseArgs();

  // Apply command line options
  const currentZoom = options.zoom || config.defaultZoom;

  if (options.defaultZoom) {
    config.defaultZoom = options.defaultZoom;
  }

  // Save configuration if requested
  if (options.saveConfig) {
    if (options.zoom) {
      config.defaultZoom = options.zoom;
    }
    saveConfig(config);
  }

  // Check if baseline file exists
  if (!fs.existsSync(BASELINE_PATH)) {
    console.error('❌ Baseline HTML file not found at:', BASELINE_PATH);
    console.log(
      '💡 Make sure the baseline file exists in src/tmp/generated.html'
    );
    process.exit(1);
  }

  // Wait for server if needed
  const serverReady = await waitForServer(config);

  if (!serverReady && config.waitForServer) {
    console.log('💡 You can disable server checking with --no-wait option');
    process.exit(1);
  }

  // Open baseline first (as per configuration)
  console.log('🎯 Opening baseline HTML reference...');
  const baselineURL = `file://${BASELINE_PATH}`;
  openURL(baselineURL, currentZoom);

  // Small delay before opening second tab
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Open live site
  console.log('🚀 Opening live development site...');
  openURL(DEV_SERVER_URL, currentZoom);

  // Provide instructions
  console.log(`
✅ Comparison setup complete!

📋 Manual QA Instructions:
1. 📄 Baseline HTML: file://${path.basename(BASELINE_PATH)}
2. 🌐 Live Site: ${DEV_SERVER_URL}
3. 🔍 Current zoom: ${currentZoom}%

🎯 Key areas to compare:
- Hero section typography (Instrument Serif font)
- StoryCards layout and spacing
- Color accuracy (#353535, #67705D)
- Icon alignment and sizing
- Button focus states and hover effects

💡 Tips:
- Use browser dev tools to inspect computed styles
- Take screenshots for documentation
- Pay attention to sub-pixel rendering differences
- Check responsive behavior at different breakpoints

Configuration: ${fs.existsSync(CONFIG_FILE) ? 'Custom' : 'Default'}
`);
}

// Run the script
if (require.main === module) {
  main().catch((error) => {
    console.error('❌ Script failed:', error.message);
    process.exit(1);
  });
}

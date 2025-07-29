#!/usr/bin/env bash

# Skip if env var set
if [[ "$SKIP_AGENT_HOOK" == "1" ]]; then exit 0; fi

# Create tmp directory if it doesn't exist
mkdir -p .tmp

# Run Playwright tests (using npx since no npm run test exists)
npx playwright test > .tmp/playwright.log 2>&1 || {
  echo "Playwright failures detected — invoking agent…"
  claude --run "@test-writer-fixer The Playwright run failed. Log:

$(cat .tmp/playwright.log)"
}

# Detect new/changed components in last commit
changed=$(git diff --name-only HEAD~1 HEAD | grep -E '^src/components/.*\.tsx$')
if [[ -n "$changed" ]]; then
  claude --run "@frontend-developer Create or update Storybook stories for:

$changed"
fi

exit 0
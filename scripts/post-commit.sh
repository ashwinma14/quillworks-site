#!/usr/bin/env bash

# Skip if env var set
if [[ "$SKIP_AGENT_HOOK" == "1" ]]; then exit 0; fi

# Create tmp directory if it doesn't exist
mkdir -p .tmp

# Run Playwright tests (using npx since no npm run test exists)
npx playwright test > .tmp/playwright.log 2>&1 || {
  echo "Playwright failures detected — invoking agent…"
  claude "@test-writer-fixer The Playwright run failed. Log:

$(cat .tmp/playwright.log)"
}

# Detect new/changed components in last commit with smart skip logic
changed=$(git diff --name-only HEAD~1 HEAD | grep -E '^src/components/.*\.tsx$')

# Filter out components with test, temp, or draft in filename
filtered_changed=""
while IFS= read -r line; do
  if [[ -n "$line" && ! "$line" =~ (test|temp|draft) ]]; then
    # Check if .stories.tsx file exists
    component_name=$(basename "$line" .tsx)
    story_file="${line%.tsx}.stories.tsx"
    
    if [[ ! -f "$story_file" ]]; then
      filtered_changed="$filtered_changed$line\n"
    fi
  fi
done <<< "$changed"

# Only invoke agent if there are components needing stories
if [[ -n "$filtered_changed" ]]; then
  echo "Creating Storybook stories for new components..."
  claude "@frontend-developer Create or update Storybook stories for:

$(echo -e "$filtered_changed")"
fi

exit 0
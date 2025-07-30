module.exports = {
  '*.{js,jsx,ts,tsx}': (files) => {
    // Filter out Storybook config files
    const filteredFiles = files.filter((file) => !file.includes('.storybook/'));
    if (filteredFiles.length === 0) return [];
    return [
      `prettier --write ${filteredFiles.join(' ')}`,
      `eslint --fix ${filteredFiles.join(' ')}`,
      `eslint ${filteredFiles.join(' ')}`,
    ];
  },
  '**/*.ts?(x)': (files) => {
    // Filter out Storybook config files for type checking
    const filteredFiles = files.filter((file) => !file.includes('.storybook/'));
    if (filteredFiles.length === 0) return [];
    return 'npm run check-types';
  },
  '*.json': ['prettier --write'],
};

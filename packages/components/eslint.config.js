import baseConfig from '../../eslint.config.mjs'

export default [
  ...baseConfig,
  
  // Storybook files - temporarily disable problematic rules
  {
    files: ['**/*.stories.{js,jsx,ts,tsx}'],
    rules: {
      // Disable react-refresh for story files
      'react-refresh/only-export-components': 'off',
    },
  },
]
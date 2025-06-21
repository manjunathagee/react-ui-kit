# Chromatic Integration

This project is integrated with [Chromatic](https://www.chromatic.com/) for visual testing and Storybook deployment.

## What is Chromatic?

Chromatic is a visual testing platform that captures screenshots of your UI components and detects visual changes. It automatically detects regressions and ensures your UI components look correct across different browsers and viewports.

## Project Information

- **Project Token**: *Stored securely in environment variables*
- **Storybook URL**: https://685615b4675020c9c11b09a7-crlraeskec.chromatic.com/
- **Chromatic Dashboard**: https://www.chromatic.com/build?appId=685615b4675020c9c11b09a7

## Running Chromatic

### Locally

```bash
# From the root directory
pnpm chromatic

# Or from the components package
cd packages/components
npm run chromatic
```

### Environment Variables

The project uses environment variables for secure token management:

```bash
# .env file (not committed to version control)
CHROMATIC_PROJECT_TOKEN=your_project_token_here
```

**Security Note**: The actual project token is stored in:
- Local `.env` file (ignored by git)
- GitHub repository secrets (for CI/CD)
- Never committed to version control

## GitHub Actions Integration

Chromatic runs automatically on:
- Push to `main` branch
- Pull requests to `main` branch

The workflow will:
1. Build all packages
2. Build Storybook
3. Upload to Chromatic for visual testing
4. Report results back to GitHub

## Configuration

Chromatic is configured via `packages/components/chromatic.config.json`:

- **exitZeroOnChanges**: Continues CI even with visual changes
- **onlyChanged**: Only tests stories that have changed
- **skip**: Skips dependabot PRs
- **pauseAnimationAtEnd**: Ensures animations are completed before capture

## Current Status

- ✅ 20 components detected
- ✅ 280 stories captured
- ⚠️ 2 component errors (see Chromatic dashboard for details)

## Troubleshooting

If you encounter component errors:

1. Check the [Chromatic dashboard](https://www.chromatic.com/build?appId=685615b4675020c9c11b09a7) for detailed error information
2. Ensure all stories render correctly in local Storybook
3. Check for console errors in the browser developer tools
4. Verify that all required dependencies are properly mocked in stories

## Best Practices

1. **Write comprehensive stories**: Include different states and variants
2. **Use consistent data**: Use static data in stories for consistent snapshots
3. **Handle dynamic content**: Mock dates, random data, and external APIs
4. **Test different viewports**: Include mobile and desktop variants
5. **Review changes**: Always review visual changes before approving them
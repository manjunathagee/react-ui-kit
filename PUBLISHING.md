# Publishing Guide

This guide explains how to publish React UI Kit packages to GitHub Package Registry.

## 📦 Package Configuration

All packages in this monorepo are configured to publish to GitHub Package Registry with the `@react-ui-kit` scope:

- `@react-ui-kit/components` - Main component library
- `@react-ui-kit/design-tokens` - Design system tokens
- `@react-ui-kit/utils` - Utility functions
- `@react-ui-kit/icons` - Icon components

## 🚀 Publishing Methods

### 1. Automated Publishing via GitHub Actions

#### Option A: Release Workflow (Recommended)

Trigger a complete release with version management:

```bash
# Go to GitHub Actions → Release Packages → Run workflow
# Choose release type: patch, minor, major, or prerelease
# Optionally enable dry run to test without publishing
```

**What it does:**
- ✅ Validates version doesn't already exist
- ✅ Runs full test suite and builds
- ✅ Updates package versions automatically
- ✅ Publishes to GitHub Package Registry
- ✅ Creates Git tags and GitHub releases
- ✅ Generates release notes

#### Option B: Publish Workflow

Publishes packages when versions change:

```bash
# Automatically triggers on:
# - Push to main with package.json changes
# - Manual workflow dispatch
```

### 2. Manual Publishing

#### Prerequisites

1. **GitHub Authentication**: Create a personal access token with `packages:write` permission
2. **Configure npm**: Set up GitHub Package Registry

```bash
# Configure npm for GitHub Package Registry
npm config set @react-ui-kit:registry https://npm.pkg.github.com

# Authenticate with your GitHub token
echo "//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN" >> ~/.npmrc
```

#### Publishing Steps

```bash
# 1. Ensure everything is built and tested
pnpm install
pnpm typecheck
pnpm lint
pnpm test
pnpm build

# 2. Dry run to verify everything looks good
pnpm publish-packages:dry-run

# 3. Publish all packages
pnpm publish-packages

# OR publish a specific package
pnpm publish-packages --package components
```

## 🔧 Package Registry Setup

### For Package Publishers

1. **Create GitHub Personal Access Token**:
   - Go to GitHub Settings → Developer settings → Personal access tokens
   - Create token with `packages:write` and `repo` permissions
   - Copy the token

2. **Configure Local Environment**:
   ```bash
   # Copy the example npmrc
   cp .npmrc.example ~/.npmrc

   # Edit ~/.npmrc and replace YOUR_GITHUB_TOKEN with your actual token
   ```

3. **Repository Secrets** (for GitHub Actions):
   - Go to repository Settings → Secrets and variables → Actions
   - `GITHUB_TOKEN` is automatically available
   - No additional secrets needed for GitHub Package Registry

### For Package Consumers

Users installing your packages need to configure their npm to use GitHub Package Registry:

```bash
# Configure npm to use GitHub Package Registry for @react-ui-kit scope
npm config set @react-ui-kit:registry https://npm.pkg.github.com

# For private repositories, authentication is required:
# npm login --scope=@react-ui-kit --registry=https://npm.pkg.github.com
```

## 📋 Version Management

### Semantic Versioning

This project follows [Semantic Versioning](https://semver.org/):

- **PATCH** (0.1.1): Bug fixes, patches
- **MINOR** (0.2.0): New features, backward compatible
- **MAJOR** (1.0.0): Breaking changes
- **PRERELEASE** (0.1.1-alpha.1): Testing versions

### Using Changesets

For manual version management:

```bash
# Create a changeset
pnpm changeset

# Version packages based on changesets
pnpm version-packages

# Publish packages
pnpm release
```

## 🔍 Verification

### Check Published Packages

```bash
# List all versions of a package
npm view @react-ui-kit/components versions --json

# View specific package info
npm view @react-ui-kit/components

# Search for packages
npm search @react-ui-kit
```

### Installation Test

```bash
# Create a test project
mkdir test-install && cd test-install
npm init -y

# Configure registry
npm config set @react-ui-kit:registry https://npm.pkg.github.com

# Install and test
npm install @react-ui-kit/components
node -e "console.log(require('@react-ui-kit/components'))"
```

## 🚨 Troubleshooting

### Common Issues

#### 1. Authentication Errors (403)

```bash
# Error: 403 Forbidden
# Solution: Check your GitHub token has packages:write permission
npm login --scope=@react-ui-kit --registry=https://npm.pkg.github.com
```

#### 2. Package Already Exists

```bash
# Error: Package version already exists
# Solution: Bump version and retry
npm version patch  # or minor/major
```

#### 3. Build Errors

```bash
# Ensure all packages build successfully
pnpm clean && pnpm build
```

#### 4. Registry Configuration

```bash
# Check current registry configuration
npm config list
npm config get @react-ui-kit:registry

# Reset if needed
npm config delete @react-ui-kit:registry
npm config set @react-ui-kit:registry https://npm.pkg.github.com
```

### GitHub Actions Debugging

1. **Check Workflow Logs**: Go to Actions tab → Select failed workflow
2. **Verify Permissions**: Ensure repository has packages:write permission
3. **Token Validation**: `GITHUB_TOKEN` should have required permissions

## 📚 Best Practices

### Before Publishing

- [ ] All tests pass (`pnpm test`)
- [ ] Code is linted (`pnpm lint`)
- [ ] TypeScript compiles (`pnpm typecheck`)
- [ ] Packages build successfully (`pnpm build`)
- [ ] Version numbers are appropriate
- [ ] CHANGELOG.md is updated (if using manual releases)

### Release Checklist

- [ ] Use semantic versioning
- [ ] Test installation of published packages
- [ ] Verify Storybook deployment
- [ ] Update documentation if needed
- [ ] Announce release (if significant)

### Security

- [ ] Never commit authentication tokens
- [ ] Use GitHub Secrets for CI/CD
- [ ] Regularly rotate access tokens
- [ ] Review package permissions

## 📖 Additional Resources

- [GitHub Packages Documentation](https://docs.github.com/en/packages)
- [npm Registry Configuration](https://docs.npmjs.com/cli/v7/using-npm/config)
- [Semantic Versioning](https://semver.org/)
- [Changesets Documentation](https://github.com/changesets/changesets)

## 🆘 Support

If you encounter issues:

1. Check this guide first
2. Review GitHub Actions logs
3. Test locally with dry run
4. Open an issue in the repository

---

**Note**: Replace `manjunathagee` in repository URLs with your actual GitHub username before publishing.

#!/usr/bin/env node

/**
 * Utility script for publishing packages to GitHub Package Registry
 * Usage: node scripts/publish-packages.js [--dry-run] [--package <package-name>]
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const packageFilter = args.includes('--package') ? args[args.indexOf('--package') + 1] : null;

console.log('🚀 React UI Kit Package Publisher');
console.log('==================================');

if (isDryRun) {
  console.log('🚫 DRY RUN MODE - No packages will be published');
}

if (packageFilter) {
  console.log(`📦 Publishing only: ${packageFilter}`);
}

console.log('');

// Check if we're authenticated with GitHub Package Registry
try {
  const npmrc = fs.readFileSync(path.join(process.env.HOME, '.npmrc'), 'utf8');
  if (!npmrc.includes('npm.pkg.github.com')) {
    console.log('❌ Not configured for GitHub Package Registry');
    console.log('Run: npm config set @react-ui-kit:registry https://npm.pkg.github.com');
    process.exit(1);
  }
} catch (error) {
  console.log('⚠️ No .npmrc found, GitHub Package Registry may not be configured');
}

// Get list of packages
const packagesDir = path.join(__dirname, '..', 'packages');
const packages = fs.readdirSync(packagesDir).filter(dir => {
  const packagePath = path.join(packagesDir, dir);
  return fs.statSync(packagePath).isDirectory() && 
         fs.existsSync(path.join(packagePath, 'package.json'));
});

console.log(`Found ${packages.length} packages:`);
packages.forEach(pkg => console.log(`  - ${pkg}`));
console.log('');

// Build all packages first
console.log('🔨 Building all packages...');
try {
  execSync('pnpm build', { 
    stdio: isDryRun ? 'pipe' : 'inherit',
    cwd: path.join(__dirname, '..')
  });
  console.log('✅ Build completed successfully');
} catch (error) {
  console.log('❌ Build failed');
  process.exit(1);
}

console.log('');

// Publish packages
let publishedCount = 0;
let failedCount = 0;

for (const pkg of packages) {
  if (packageFilter && pkg !== packageFilter) {
    continue;
  }

  const packagePath = path.join(packagesDir, pkg);
  const packageJsonPath = path.join(packagePath, 'package.json');
  const distPath = path.join(packagePath, 'dist');

  // Check if package has dist directory
  if (!fs.existsSync(distPath)) {
    console.log(`⚠️ Skipping ${pkg} - no dist directory found`);
    continue;
  }

  // Read package info
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const packageName = packageJson.name;
  const packageVersion = packageJson.version;

  console.log(`📦 ${isDryRun ? 'Would publish' : 'Publishing'} ${packageName}@${packageVersion}...`);

  try {
    const publishCommand = `pnpm publish${isDryRun ? ' --dry-run' : ''} --no-git-checks --access public`;
    
    const output = execSync(publishCommand, {
      cwd: packagePath,
      stdio: 'pipe',
      encoding: 'utf8'
    });

    if (isDryRun) {
      console.log(`✅ Dry run successful for ${packageName}`);
    } else {
      console.log(`✅ Successfully published ${packageName}@${packageVersion}`);
      publishedCount++;
    }

    // Show output for dry runs
    if (isDryRun && output.includes('tarball')) {
      const lines = output.split('\n').filter(line => 
        line.includes('tarball') || line.includes('size') || line.includes('files')
      );
      lines.forEach(line => console.log(`   ${line.trim()}`));
    }

  } catch (error) {
    const errorMessage = error.message || error.toString();
    
    if (errorMessage.includes('403') || errorMessage.includes('already exists')) {
      console.log(`⚠️ ${packageName}@${packageVersion} already exists or access denied`);
    } else {
      console.log(`❌ Failed to publish ${packageName}: ${errorMessage.split('\n')[0]}`);
      failedCount++;
    }
  }

  console.log('');
}

// Summary
console.log('📊 Publishing Summary');
console.log('====================');

if (isDryRun) {
  console.log('🚫 Dry run completed - no packages were actually published');
} else {
  console.log(`✅ Successfully published: ${publishedCount} packages`);
  if (failedCount > 0) {
    console.log(`❌ Failed to publish: ${failedCount} packages`);
  }
}

console.log('');

if (!isDryRun && publishedCount > 0) {
  console.log('🎉 Packages are now available on GitHub Package Registry!');
  console.log('');
  console.log('Installation instructions:');
  console.log('```bash');
  console.log('# Configure npm to use GitHub Package Registry');
  console.log('npm config set @react-ui-kit:registry https://npm.pkg.github.com');
  console.log('');
  console.log('# Install packages');
  packages.forEach(pkg => {
    if (!packageFilter || pkg === packageFilter) {
      const packageJson = JSON.parse(fs.readFileSync(
        path.join(packagesDir, pkg, 'package.json'), 'utf8'
      ));
      console.log(`npm install ${packageJson.name}`);
    }
  });
  console.log('```');
}
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkgPath = path.resolve(__dirname, '../package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

// Validate and parse any valid SemVer 2.0 version (used by Changesets):
// Supports standard versions (1.0.2), snapshots (0.0.0-snapshot-20260923),
// pre-releases (1.0.0-beta.0, 1.0.0-rc.1, 1.0.0-0), and metadata (+build).
const rawVersion = (pkg.version || '').trim().replace(/^v/, '');
const semverRegex = /^(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?(?:\+([0-9A-Za-z.-]+))?$/;
const match = rawVersion.match(semverRegex);

if (!match) {
  throw new Error(`[build:version] Invalid SemVer version in package.json: "${pkg.version}"`);
}

const [, majorStr, minorStr, patchStr, prerelease] = match;
const major = parseInt(majorStr, 10);
const minor = parseInt(minorStr, 10);
const patch = parseInt(patchStr, 10);
const prereleaseFormatted = prerelease != null ? JSON.stringify(prerelease) : 'null';

function updateFileVersion(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`[build:version] File does not exist: ${filePath}`);
  }

  const originalContent = fs.readFileSync(filePath, 'utf8');

  const replacements = [
    {
      name: 'Platform.Version',
      regex: /(get\s+Version\s*\(\)\s*\{\s*return\s*)[^;}\n]+([;\s]*\})/,
      replacement: `$1'${pkg.version}'$2`,
    },
    {
      name: 'ReactNativeVersion.major',
      regex: /(static\s+major\s*=\s*)\d+(\s*;)/,
      replacement: `$1${major}$2`,
    },
    {
      name: 'ReactNativeVersion.minor',
      regex: /(static\s+minor\s*=\s*)\d+(\s*;)/,
      replacement: `$1${minor}$2`,
    },
    {
      name: 'ReactNativeVersion.patch',
      regex: /(static\s+patch\s*=\s*)\d+(\s*;)/,
      replacement: `$1${patch}$2`,
    },
    {
      name: 'ReactNativeVersion.prerelease',
      regex: /(static\s+prerelease\s*=\s*)[^;]+(\s*;)/,
      replacement: `$1${prereleaseFormatted}$2`,
    },
  ];

  let updatedContent = originalContent;

  for (const { name, regex, replacement } of replacements) {
    if (!regex.test(updatedContent)) {
      throw new Error(`[build:version] Pattern not found for '${name}' in ${filePath}`);
    }
    updatedContent = updatedContent.replace(regex, replacement);
  }

  if (updatedContent !== originalContent) {
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`[build:version] Updated ${path.basename(filePath)} -> ${pkg.version}`);
  } else {
    console.log(`[build:version] ${path.basename(filePath)} is up to date (${pkg.version})`);
  }
}

const exportsDir = path.resolve(__dirname, '../exports');
updateFileVersion(path.join(exportsDir, 'index.js'));
updateFileVersion(path.join(exportsDir, 'index.cjs'));

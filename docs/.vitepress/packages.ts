export interface VersionInfo {
  version: string;
  label: string;
  isLatest: boolean;
  path: string;
}

export interface PackageMetadata {
  id: string;
  name: string;
  displayName: string;
  description: string;
  defaultVersion: string;
  versions: VersionInfo[];
  sidebarItems: {
    [version: string]: { text: string; link: string }[];
  };
}

export const packagesConfig: Record<string, PackageMetadata> = {
  'react-native-neutralinojs': {
    id: 'react-native-neutralinojs',
    name: 'react-native-neutralinojs',
    displayName: 'react-native-neutralinojs',
    description: 'Core CLI plugin and Neutralinojs runtime orchestrator for React Native.',
    defaultVersion: 'v2',
    versions: [
      {
        version: 'v2',
        label: 'v2 (latest)',
        isLatest: true,
        path: '/guide/react-native-neutralinojs/v2/',
      },
    ],
    sidebarItems: {
      v2: [
        { text: 'Overview', link: '/guide/react-native-neutralinojs/v2/' },
        { text: 'CLI Commands', link: '/guide/react-native-neutralinojs/v2/cli-commands' },
        { text: 'Configuration', link: '/guide/react-native-neutralinojs/v2/configuration' },
        { text: 'Troubleshooting', link: '/guide/react-native-neutralinojs/v2/troubleshooting' },
      ],
    },
  },
  'new-app-screen': {
    id: 'new-app-screen',
    name: '@react-native-neutralinojs/new-app-screen',
    displayName: '@react-native-neutralinojs/new-app-screen',
    description: 'Desktop-adapted template screens for React Native Neutralinojs.',
    defaultVersion: 'v1',
    versions: [
      {
        version: 'v1',
        label: 'v1 (latest)',
        isLatest: true,
        path: '/guide/new-app-screen/v1/',
      },
    ],
    sidebarItems: {
      v1: [{ text: 'Desktop UI & Screens', link: '/guide/new-app-screen/v1/' }],
    },
  },
};

/**
 * Resolves package and version information from a given route pathname.
 */
export function resolvePackageRoute(pathname: string): {
  pkg: PackageMetadata | null;
  version: string | null;
  subpath: string;
} {
  // Clean URL: strip base and trailing slashes or .html
  const cleanPath = pathname.replace(/^.*\/guide\//, '/guide/').replace(/\.html$/, '');

  const match = cleanPath.match(/^\/guide\/([^/]+)\/(v\d+)(\/.*)?$/);
  if (!match) {
    return { pkg: null, version: null, subpath: '' };
  }

  const [, pkgId, version, rest] = match;
  const pkg = packagesConfig[pkgId] || null;
  const subpath = rest ? rest.replace(/^\//, '') : '';

  return {
    pkg,
    version,
    subpath,
  };
}

/**
 * Generates the full guide sidebar with package sections and active versions.
 */
export function getGuideSidebar(activePkgId?: string, activeVersion?: string) {
  const coreVersion =
    activePkgId === 'react-native-neutralinojs' && activeVersion
      ? activeVersion
      : packagesConfig['react-native-neutralinojs'].defaultVersion;

  const newAppScreenVersion =
    activePkgId === 'new-app-screen' && activeVersion
      ? activeVersion
      : packagesConfig['new-app-screen'].defaultVersion;

  return [
    {
      text: 'Getting Started',
      items: [
        { text: 'Overview & Requirements', link: '/guide/getting-started' },
        { text: 'Installation', link: '/guide/installation' },
      ],
    },
    {
      text: 'react-native-neutralinojs',
      collapsed: false,
      items:
        packagesConfig['react-native-neutralinojs'].sidebarItems[coreVersion] ||
        packagesConfig['react-native-neutralinojs'].sidebarItems['v2'],
    },
    {
      text: '@react-native-neutralinojs/new-app-screen',
      collapsed: false,
      items:
        packagesConfig['new-app-screen'].sidebarItems[newAppScreenVersion] ||
        packagesConfig['new-app-screen'].sidebarItems['v1'],
    },
  ];
}

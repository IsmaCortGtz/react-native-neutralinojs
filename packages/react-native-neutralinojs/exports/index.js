export * from 'react-native-web/dist/index.js';

export const Platform = {
  OS: 'neu',
  select: (obj) => ('neu' in obj ? obj.neu : obj.default),
  get isTesting() {
    return process.env.NODE_ENV === 'test';
  },
  get Version() {
    return '0.0.0';
  }
};

class ReactNativeVersion {
  static major = 0;
  static minor = 1;
  static patch = 0;
  static prerelease = 'neutralino';
  static getVersionString() {
    return `${this.major}.${this.minor}.${this.patch}${this.prerelease != null ? `-${this.prerelease}` : ''}`;
  }
}

const version = {
  major: ReactNativeVersion.major,
  minor: ReactNativeVersion.minor,
  patch: ReactNativeVersion.patch,
  prerelease: ReactNativeVersion.prerelease,
};

export { ReactNativeVersion, version };
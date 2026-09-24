module.exports = require('react-native-web');

module.exports.Platform = {
  OS: 'neu',
  select: (obj) => ('neu' in obj ? obj.neu : obj.default),
  get isTesting() { return process.env.NODE_ENV === 'test'; },
  get Version() { return '1.0.2'; },
};

module.exports.ReactNativeVersion = class {
  static major = 1;
  static minor = 0;
  static patch = 2;
  static prerelease = null;
  static getVersionString() {
    return `${this.major}.${this.minor}.${this.patch}${this.prerelease != null ? `-${this.prerelease}` : ''}`;
  }
};

module.exports.version = {
  major: module.exports.ReactNativeVersion.major,
  minor: module.exports.ReactNativeVersion.minor,
  patch: module.exports.ReactNativeVersion.patch,
  prerelease: module.exports.ReactNativeVersion.prerelease,
};

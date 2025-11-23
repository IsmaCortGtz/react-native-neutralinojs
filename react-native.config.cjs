module.exports = {
  platforms: {
    neu: {
      dependencyConfig: () => ({}),
      projectConfig: () => ({
        sourceDir: 'neutralino'
      })
    }
  },
  commands: [
    {
      name: 'init-neu',
      func: require('./dist/cli/init-neu.js')
    },
    {
      name: 'update-neu',
      func: require('./dist/cli/update-neu.js')
    },
    {
      name: 'run-neu',
      func: require('./dist/cli/run-neu.js')
    },
    {
      name: 'build-neu',
      func: require('./dist/cli/build-neu.js')
    }
  ],
  healthChecks: [
    {
      label: 'Neutralino',
      healthchecks: require('./dist/cli/doctor.js')
    }
  ]
}
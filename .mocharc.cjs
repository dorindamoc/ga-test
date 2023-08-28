process.env.NODE_ENV = 'test'
process.env.TS_NODE_PROJECT = './tests/tsconfig.json'
process.env.TS_CONFIG_PATHS = true

module.exports = {
    extension: ['ts'],
    recursive: true,
    require: ['esbuild-runner/register', 'vite-register'],
    spec: ['tests/unittests/**/*.ts'],
    timeout: 10000,
    'watch-files': ['config', 'lib', 'products', 'translation'],
}

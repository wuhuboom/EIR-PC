module.exports = {
  presets: [
    ['@vue/cli-plugin-babel/preset'],
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['IE >= 11', 'Android >= 4.4'],
        },
      },
    ],
  ],
  plugins: [
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: true,
      },
      'vant',
    ],
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk',
      },
    ],
  ],
};

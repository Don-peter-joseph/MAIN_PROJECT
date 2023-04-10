const { getDefaultConfig } = require('@expo/metro-config');
const blacklist = require('metro-config/src/defaults/exclusionList');

module.exports = async () => {
  const defaultConfig = await getDefaultConfig(__dirname);
  return {
    ...defaultConfig,
    resolver: {
      ...defaultConfig.resolver,
      blacklistRE: blacklist([/#current-cloud-backend\/.*/]),
    },
    transformer: {
      ...defaultConfig.transformer,
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
    },
    // Customize your Metro configuration here.
  };
};



// const blacklist = require('metro-config/src/defaults/exclusionList');
// module.exports = {
//   resolver: {
//     blacklistRE: blacklist([/#current-cloud-backend\/.*/]),
//   },
//   transformer: {
//     getTransformOptions: async () => ({
//       transform: {
//         experimentalImportSupport: false,
//         inlineRequires: false,
//       },
//     }),
//   },
// };
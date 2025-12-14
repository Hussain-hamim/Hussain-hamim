module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Suppress all source map warnings
      if (!webpackConfig.ignoreWarnings) {
        webpackConfig.ignoreWarnings = [];
      }

      // Ignore source map warnings
      webpackConfig.ignoreWarnings.push(
        /Failed to parse source map/,
        /ENOENT: no such file or directory/,
        /source-map-loader/,
        {
          module: /node_modules\/@mediapipe/,
        }
      );

      // Modify source-map-loader rules to exclude @mediapipe
      const rules = webpackConfig.module.rules || [];
      
      rules.forEach((rule) => {
        if (rule.enforce === 'pre' && rule.use) {
          const useArray = Array.isArray(rule.use) ? rule.use : [rule.use];
          
          useArray.forEach((use) => {
            if (
              typeof use === 'object' &&
              use.loader &&
              (use.loader.includes('source-map-loader') || 
               (typeof use === 'string' && use.includes('source-map-loader')))
            ) {
              // Exclude @mediapipe from source map processing
              if (!rule.exclude) {
                rule.exclude = [];
              }
              
              const hasMediapipeExclude = rule.exclude.some(
                (exclude) => {
                  if (exclude instanceof RegExp) {
                    return exclude.toString().includes('@mediapipe');
                  }
                  if (typeof exclude === 'string') {
                    return exclude.includes('@mediapipe');
                  }
                  return false;
                }
              );

              if (!hasMediapipeExclude) {
                rule.exclude.push(/node_modules\/@mediapipe/);
              }

              // Configure loader to skip missing source maps
              if (typeof use === 'object') {
                if (!use.options) {
                  use.options = {};
                }
                use.options.filterSourceMappingUrl = () => 'skip';
              }
            }
          });
        }
      });

      return webpackConfig;
    },
  },
  // Suppress warnings overlay in browser
  devServer: {
    client: {
      overlay: {
        warnings: false,
        errors: true,
      },
    },
  },
};


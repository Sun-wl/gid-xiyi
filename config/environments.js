
export default {
  // ======================================================
  // Overrides when NODE_ENV === 'development'
  // ======================================================

  development: (config) => ({
    //compiler_public_path: `http://${config.server_host}:${config.server_port}/`,
    compiler_public_path: `/`,
    proxy: {
      enabled: true,
      options: {
        host: 'http://qa.gidoor.com:6060',
        match: /.*\/webservice\/.*/
      }
    }
  }),

  // ======================================================
  // Overrides when NODE_ENV === 'production'
  // ======================================================
  production: (config) => ({
    compiler_public_path: '/',
    compiler_fail_on_warning: false,
    compiler_hash_type: 'chunkhash',
    compiler_devtool: null,
    compiler_stats: {
      chunks: true,
      chunkModules: true,
      colors: true
    }
  })
}

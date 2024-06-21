module.exports = {
    apps: [
      {
        name: 'index',
        script: './dist/src/index.js',
        env: {
          NODE_ENV: 'production',
          PORT: process.env.PORT,
          MONGO_URI: process.env.MONGO_URI
        }
      }
    ]
  };
  
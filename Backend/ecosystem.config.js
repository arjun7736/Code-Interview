module.exports = {
    apps: [
      {
        name: 'my-app',
        script: 'src/index.ts',
        interpreter: 'ts-node',
        env: {
          NODE_ENV: 'production',
          MONGO_URI: 'mongodb://127.0.0.1:27017/Code-Interview',
          PORT: 3000
        }
      }
    ]
  };
  
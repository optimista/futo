const path = require('path');

module.exports = {
  images: { domains: ['firebasestorage.googleapis.com'] },
  webpack: config => {
    config.resolve.modules.push(path.resolve("./app"));
    return config;
  }
}

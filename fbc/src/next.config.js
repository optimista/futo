const path = require('path');

module.exports = {
  future: { webpack5: true },
  images: { domains: ['firebasestorage.googleapis.com'] },
  webpack: config => {
    config.resolve.modules.push(path.resolve("./app"));
    return config;
  }
}

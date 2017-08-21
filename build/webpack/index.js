const env = process.env.ENVIRONMENT || 'development';

module.exports = require(`./webpack.${env}`);

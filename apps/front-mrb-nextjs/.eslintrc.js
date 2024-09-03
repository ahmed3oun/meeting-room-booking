const { rules } = require('eslint-config-prettier');

module.exports = {
  extends: ['next/core-web-vitals'],
  rules: {
    'prettier/prettier': 'off',
  },
  // other configurations...
};

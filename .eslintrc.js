module.exports = {
  env: {
    es6: true,

    jest: true,

    node: true
  },

  extends: ['airbnb-base', 'prettier'],

  plugins: ['prettier'],

  parserOptions: {
    ecmaVersion: 2018,

    sourceType: 'module'
  },

  rules: {
    'prettier/prettier': 'error',

    'class-methods-use-this': 'off',

    camelcase: 'off',

    'new-cap': 1,

    'no-console': 'off',

    'no-param-reassign': ['error', { props: false }],

    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }]
  }
};

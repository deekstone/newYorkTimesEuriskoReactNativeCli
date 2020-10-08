module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'linebreak-style': 0,
    'object-curly-spacing': [0, 'always'],
    'react/jsx-filename-extension': [1, {extensions: ['.js', '.jsx']}],
    'no-underscore-dangle': [2, {allow: ['_id']}],
    'react/jsx-closing-bracket-location': [
      1,
      {selfClosing: 'line-aligned', nonEmpty: 'after-props'},
    ],
  },
};

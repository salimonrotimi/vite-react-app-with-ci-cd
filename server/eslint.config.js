// This eslint file is added by me
export default [
  {
    files: ['**/*.js'], // only check .js files in the server directory
    rules: {
      semi: 'error', // display error if semicolon is missing at the end of each code line.
      'no-unused-vars': 'warn', // warn if there are unused variables
    },
  },
];

module.exports = {
  env: {
    browser: true,
    jest: true,
  },
  extends: ['airbnb'],
  rules: {
    camelcase: 'off', // allow to keep legacy syntax like 'db_col_loop_and_update_other'
    'no-restricted-syntax': 'warn',
    'no-restricted-globals': 'warn',
    'max-len': 'off', // allow to have long comments and lines
    'import/extensions': 'off', // ignore unexpected use of file extension "js" for db_views
    'import/prefer-default-export': 'off',
    'import/no-relative-packages': 'off', // allow relative import like `../../../libs/sm`
    'import/no-extraneous-dependencies': 'off',
    'import/no-mutable-exports': 'warn',
    'import/no-cycle': 'warn',
    'import/no-import-module-exports': 'warn',
    'import/no-unresolved': 'warn',
    'import/no-named-as-default': 'warn',
    'import/no-named-as-default-member': 'warn',
    'no-underscore-dangle': 'off',
    'comma-dangle': 'off',
    'no-prototype-builtins': 'warn',
    'no-param-reassign': 'warn',
    eqeqeq: 'warn',
    'no-plusplus': 'warn',
    'brace-style': 'warn',
    'operator-linebreak': 'warn',
    'no-await-in-loop': 'warn',
    'no-use-before-define': 'warn',
    'no-shadow': 'warn',
    'no-useless-concat': 'warn',
    radix: 'warn',
    'prefer-destructuring': 'warn',
    'no-promise-executor-return': 'warn',
    'no-return-await': 'warn',
    'consistent-return': 'warn',
    'no-continue': 'warn',
    'no-empty': 'warn',
    'no-useless-escape': 'warn',
    'no-unused-vars': 'warn',
    'no-nested-ternary': 'warn',
    'guard-for-in': 'warn',
    'implicit-arrow-linebreak': 'warn',
    'prefer-regex-literals': 'warn',
    'no-lonely-if': 'warn',
    'no-buffer-constructor': 'warn',
  },
  ignorePatterns: [
    'account-backend/f-domains/odata/*', // ignore Parsing error: Unexpected character '@'
    'libs/log.js', // ignore Parsing error: Unexpected character '#'
    'resources/db_views.js', // ignore Parsing error
  ],
};

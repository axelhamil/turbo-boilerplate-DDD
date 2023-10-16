module.exports = {
  "env": {
    "jest": true,
    "node": true
  },
  "extends": [
    "turbo",
    "prettier",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  "ignorePatterns": [
    ".eslintrc.js",
    "**/.next/**",
    "**/build/**",
    "**/dist/**",
    "**/node_modules/**"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": ['./tsconfig.json'],
  },
  "plugins": [
    "@typescript-eslint",
    "simple-import-sort",
    "sort-keys-fix",
    "unused-imports"
  ],
  "root": true,
  "rules": {
    "@typescript-eslint/ban-ts-comment": 1,
    "@typescript-eslint/explicit-function-return-type": 1,
    "@typescript-eslint/explicit-module-boundary-types": 1,
    "@typescript-eslint/naming-convention": [
      1,
      {
        "custom": {
          "match": true,
          "regex": "^I[A-Z]"
        },
        "format": ["PascalCase"],
        "selector": "interface"
      }
    ],
    "@typescript-eslint/no-explicit-any": 1,
    "@typescript-eslint/no-inferrable-types": 0,
    "@typescript-eslint/prefer-nullish-coalescing": 1,
    "@typescript-eslint/prefer-optional-chain": 1,
    "@typescript-eslint/strict-boolean-expressions": 0,
    "comma-spacing": ['error', { 'after': true, 'before': false }],
    "eqeqeq": 1,
    "no-unused-vars": 1,
    "object-curly-spacing": ['error', 'always'],
    "semi": 2,
    "simple-import-sort/exports": 2,
    "simple-import-sort/imports": 2,
    "sort-keys": [1, "asc", { "caseSensitive": true, "minKeys": 2, "natural": false }],
    "sort-keys-fix/sort-keys-fix": 1,
    "unused-imports/no-unused-imports": 2,
    "unused-imports/no-unused-vars": [
      "warn",
      {
        "args": "after-used",
        "argsIgnorePattern": "^",
        "vars": "all",
        "varsIgnorePattern": "^"
      }
    ]
  }
};

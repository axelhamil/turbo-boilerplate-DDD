module.exports = {
  extends: ['@commitlint/config-conventional'],
  plugins: ['commitlint-plugin-function-rules'],
  rules: {
    'function-rules/header-max-length': [
      2,
      'always',
      (parsed) => {
        const headerLength = parsed.header.length;
        if (headerLength <= 72) {
          return [true];
        }
        return [
          false,
          `⛔️ Commit message is ${headerLength} characters long. It can not be longer than 72 characters!`,
        ];
      },
    ],
    'function-rules/type-enum': [
      2,
      'always',
      (parsed) => {
        const type = parsed.type;
        const allowedTypes = [
          'feat',
          'fix',
          'hotfix',
          'chore',
          'docs',
          'style',
          'refactor',
          'perf',
          'test',
        ];
        if (allowedTypes.includes(type)) {
          return [true];
        }
        return [
          false,
          `⛔️ Commit message type "${type}" is not allowed. It must be one of [${allowedTypes.join(
            ', ',
          )}]!`,
        ];
      },
    ],
    'subject-case': [0],
    'header-max-length': [0],
    'scope-empty': [0],
    'type-enum': [0],
  },
};

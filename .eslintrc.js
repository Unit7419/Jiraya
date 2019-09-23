module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    // 'plugin:@typescript-eslint/recommended',
    // 'prettier/@typescript-eslint',
    'prettier/flowtype',
    'prettier/react',
    'prettier/standard',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    useJSXTextNode: true,
    project: './tsconfig.json',
    tsconfigRootDir: './',
    ecmaFeatures: {
      jsx: true,
      legacyDecorators: true,
      experimentalObjectRestSpread: true,
    },
  },
  rules: {
    // https://stackoverflow.com/questions/44437203/how-do-i-resolve-eslint-import-no-named-as-default
    'import/no-named-as-default': 'off',
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.js', '.ts', '.tsx'],
      },
    ],
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: false,
      },
    ],
    'import/no-unresolved': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    // 'no-plusplus': ['error', {allowForLoopAfterthoughts: true}],
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
      },
    ],
    'no-void': 'off', // 允许使用void
    // 除了单行的方法，其他需要加空行
    'lines-between-class-members': ['error', 'always', {exceptAfterSingleLine: true}],
    // 'no-console': ['error', {allow: ['log', 'error', 'info']}],
    'one-var': 'off', // 不强制函数中的变量要么一起声明要么分开声明
    'no-new': 'off', // 不禁止使用 new
    radix: 'off', // 不强制在parseInt()使用基数参数
    'no-bitwise': 'off', // 可以使用按位运算符
    'arrow-parens': ['error', 'as-needed'],
    'prettier/prettier': 'error',
    // '@typescript-eslint/no-empty-interface': [
    // 	'error',
    // 	{
    // 		allowSingleExtends: true,
    // 	},
    // ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/prop-types': 'off',
    // '@typescript-eslint/explicit-member-accessibility': [
    // 	'error',
    // 	{ accessibility: 'no-public' },
    // ],
    '@typescript-eslint/interface-name-prefix': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}

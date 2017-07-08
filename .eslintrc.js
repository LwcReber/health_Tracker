// http://www.tuicool.com/articles/3uYnQ3B 配置参考文章
module.exports = {
  'root': true,
  // parser: 'babel-eslint',
  'parserOptions': {
    'ecmaVersion': 5,
    'sourceType': 'module'
  },
  'env': {
    'browser': true,
  },
  'extends': 'airbnb-base',
  'rules': {
    'arrow-parens': 0,
    'indent': ["error", 2], // tab 缩进 格数
    'no-var': 0,
    'space-before-function-paren': 0,
    'func-names': 0,
    'no-unused-vars': 0,
    'no-undef': 0,
    "wrap-iife": [0, "inside"],
    'prefer-arrow-callback': 0,
    'no-use-before-define': 0,
    'no-underscore-dangle': 0,
    'no-else-return': 0,
    'vars-on-top': 0,
    'no-restricted-syntax': 0,
    'no-restrictex': 0,
    'keyword-spacing': 1,
    'object-shorthand': 0,
    'comma-dangle': 0,
    'no-prototype-builtins': 0,
    'no-param-reassign': 0,
    'one-var': 0,
    'one-var-declaration-per-line': 0,
    'no-plusplus': 0, // ++ or --
    'consistent-return': 0,
    'linebreak-style': 0,
    'no-console': 1,
    'no-mixed-operators': 0,
    'no-alert': 0,
    'prefer-template': 0,
    'prefer-rest-params': 0,
    'no-unused-expressions': 0,
    "block-scoped-var": 0,//块语句中使用var
  }
}

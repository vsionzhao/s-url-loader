module.exports = {
  root: true, //此项是用来告诉eslint找当前配置文件不能往父级查找
  env: { //环配置 如 "browser": true, node: true,
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  parser: "babel-eslint",
  rules: {
    'array-callback-return': 1, // return 后面是否允许省略
    'consistent-return': 0, // 要求 return 语句要么总是指定返回的值，要么不指定
    'camelcase': 0, // 强制驼峰法命名
    'eqeqeq': 0, // 强制全等( === 和 !==)
    'func-names': 0, //函数表达式必须有名字
    "global-require": 0, // 取消对require的验证，使得可以使用require来加载图片的相对路径
    "import/no-unresolved": 0, // 取消自动解析路径，以此开启alias的别名路径设置
    'import/extensions': 0, // 取消对文件扩展名的验证
    'indent': 'off', // 缩进风格(强制使用一致的缩进)
    "linebreak-style": 0, // 取消换行符\n或\r\n的验证()
    "no-unused-vars": 1, // 禁止出现未使用过的变量
    "no-redeclare": 1, // 禁止多次声明同一变量
    'no-use-before-define': 0, // 禁止在变量定义之前使用它们
    "no-unused-expressions": 0, // 允许使用未使用过的表达式，以此来支持a && a()的代码形式
    'no-restricted-syntax': 1, // 禁用特定的语法
    'no-underscore-dangle': 0, // 允许在标识符中使用下划线
    'no-param-reassign': 0, // 禁止对 function 的参数进行重新赋值
    'no-nested-ternary': 0, // 禁止嵌套三元表达式
    'no-else-return': 0, // 禁止 if 语句中 return 语句之后有 else 块
    'no-shadow': [1, { // 外部作用域中的变量不能与它所包含的作用域中的变量或参数同名
      "allow": ["resolve", "reject", "done", "cb"]
    }],
    'prefer-rest-params': 1, // 要求使用剩余参数而不是 arguments
    'prefer-arrow-callback': 0, // 要求回调函数使用箭头函数
  },
  parserOptions: {
    "ecmaVersion": 8,
    "sourceType": "module",
    "ecmaFeatures": {"jsx": true, "experimentalObjectRestSpread": true, "modules": true}
  }
};

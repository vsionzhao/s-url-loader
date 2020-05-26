

# style-url-loader

将内联样式的图片转换成base64(暂时只支持html和vue文件)

## 使用

```console
$ npm install s-url-loader --save-dev
```

### vue-cli2或者html文件使用
**webpack.config.js**

```js
module.exports = {
  module: {
      rules: [
        {
          test: /\.(html)$/i,
          use: [
            {
              loader: "html-loader",
            },
            {
              loader: 's-url-loader'
            },
          ],
        },
        {
          test: /\.(vue)$/i,
          use: [
            {
              loader: 'vue-loader'
            },
            {
              loader: 's-url-loader',
            },
          ],
        }
      ],
  },
};
```

### vue-cli3中使用
**vue.config.js**
```javascript
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('s-url-loader')
      .loader('s-url-loader')
      .tap(options => {
        return {
          limit: 200 * 1024,
          ...options
        }
      })
  }
}
```

## 配置项

|             Name              |            Type             |        Default     | Description                                 |
| ---------------------------   | -------------------------   |--------------------| ------------------------------------------- |
|     **[`limit`](#limit)**     | `{Boolean\|Number\|String}` |        `8 * 1024`  | 匹配的图片最大的字节（小于此字节的图片不转换）    |
|  **[`include`](#include)**    |     `{String[]\|RegExp}`    |      `undefined`   | 需要转换的图片                                |
|  **[`exclude`](#exclude)**    |     `{String[]\|RegExp}`    |       `undefined`  | 不需要转换的图片                              |

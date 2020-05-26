const fs = require('fs');
const path = require('path');
const mineType = require('mime-types');
const loaderUtils = require('loader-utils')

const {shouldTransUrl} = require('./utils/shouldTransUrl');

const template = /<(html|template)([^>]*)>([\s\S]+)<\/\1>/gi
const UrlRegExp = /(background|background\-image)\s*:\s*url\s*\(\s*(('|"|&quot;)?)\s*([^\s]+)\2\s*\)/gim

const defaultsProp = {
  limit: 8 * 1024, // 单位b
  exclude: undefined, // 需要排除的url  可以是数组或正则
  include: undefined, // 需要转换的url  可以是数组或正则
}

const already = {}; // 已经解析成base64的图片，防止相同图片多次解析


module.exports = function (source) {
  const opts = loaderUtils.getOptions(this)
  const defaults = Object.assign({}, defaultsProp, opts)
  let _source = ''
  if (template.test(source)) {
    _source = source.match(template)[0]
    const urlRegExp = new RegExp(UrlRegExp.source, 'gim')
    if (urlRegExp.test(_source)) {
      return _source.replace(UrlRegExp, createUrlReplace(defaults));
    }
    return source
  }
  return source;
}

function shouldTransform(limit, size) {
  if (typeof limit === 'boolean') {
    return limit;
  }

  if (typeof limit === 'string') {
    return size <= parseInt(limit, 10);
  }

  if (typeof limit === 'number') {
    return size <= limit;
  }

  return true;
}

function createUrlReplace(defaults) {
  return function ($0, $1, $2, $3, $4) {
    if (!$4) return
    let image = `${$1}:url(${$4})`
    if (shouldTransUrl($4, defaults.include, defaults.exclude)){
      image = `${$1}:url(${base64img($4, defaults.limit)})`
    }
    return image;
  }
}

function base64img(file, limit){
  if (already[file]) {
    return already[file];
  }
  try {
    const filePath = path.join(process.cwd(), file.replace(/(\.\.?\/)+/gim,'/'));  // 保证访问的路径是项目路径
    const fileInfo = fs.statSync(path.resolve(filePath));
    if (shouldTransform(limit, fileInfo.size)){
      const fileData = fs.readFileSync( path.resolve(filePath));
      const base64 = Buffer.from(fileData).toString('base64');
      const base64Data = 'data:' + mineType.lookup(filePath) + ';base64,' + base64;
      already[file] = base64Data;
      return base64Data;
    }
    return file;
  }catch (e) {
    console.log('error', e)
    return file;
  }
}

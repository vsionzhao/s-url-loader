const isRegExp = function (value) {
  return value.constructor === RegExp
}

module.exports = {
  isRegExp
}

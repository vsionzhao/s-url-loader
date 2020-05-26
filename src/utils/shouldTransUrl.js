const {isRegExp} = require('./index');

/**
 * whether the URl is converted to base64
 * @param url
 * @param include
 * @param exclude
 */
const shouldTransUrl =  function (url, include, exclude) {
  if (include) {
    return ruleVote(include, url);
  }else if (exclude){
    return !ruleVote(exclude, url);
  }
  return true
}

function ruleVote(rule, value){
  if (rule) {
    if (isRegExp(rule) && rule.test(value)){
      return true
    } else if (Array.isArray(rule) && rule.includes(value)) {
      return true;
    }
  }
  return false;
}

module.exports = {
  shouldTransUrl
}

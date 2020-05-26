const regExpMap = {
  html: /(background|background\-image)\s*:\s*url\s*\(\s*(('|"|&quot;)?)\s*(data:[^\s]+base64,[^\s]+)\2\s*\)/gim,
  vue: /(('|"|&quot;)?)background(-image)?\1:\s*('|"|&quot;)url\s*(\(data:[^\s]+base64,[^\s]+\))\4/gim,
}

export default (assets, type = 'html') => {
  const regExp = regExpMap[type];
  const matcherResult = [];
  assets.forEach(v => {
    const result = v._cachedSource.match(regExp) || [];
    matcherResult.push(...result)
  })
  return matcherResult;
}

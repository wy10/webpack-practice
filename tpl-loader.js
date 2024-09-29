function tplLoader(source) {
  source = source.replace(/@gotoPage/g, "@login");
  return source;
}

module.exports = tplLoader;

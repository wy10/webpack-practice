class ReplaceAttributesPlugin {
  constructor(replaceMap) {
    this.replaceMap = replaceMap || {};
  }

  apply(compiler) {
    compiler.hooks.compile.tap(
      "ReplaceAttributesPlugin",
      (compilation, callback) => {
        // 遍历所有编译的文件
        for (const filename in compilation.assets) {
          console.log(filename, "xxxxxx");
          if (filename.endsWith(".vue")) {
            const asset = compilation.assets[filename];
            let source = asset.source();

            // 替换属性
            for (const [key, value] of Object.entries(this.replaceMap)) {
              const regex = new RegExp(
                `:${key}\\s*=\\s*['"]?([^'"]*)['"]?`,
                "g"
              );
              source = source.replace(regex, `:${key}="${value}"`);
            }

            // 更新资产
            compilation.assets[filename] = {
              source: () => source,
              size: () => source.length,
            };
          }
        }
        callback();
      }
    );
  }
}

module.exports = ReplaceAttributesPlugin;

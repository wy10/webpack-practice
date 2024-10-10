const fs = require("fs");
const path = require("path");

class RemoveUnusedFilesPlugin {
  constructor(options) {
    this.options = options || {};
    this.usedFiles = new Set();
  }

  apply(compiler) {
    // 在编译开始时收集所有引入的文件
    compiler.hooks.emit.tapAsync(
      "RemoveUnusedFilesPlugin",
      (compilation, callback) => {
        this.collectUsedFiles(compilation);
        callback();
      }
    );

    // 在编译完成后检查未使用的文件
    compiler.hooks.afterEmit.tapAsync(
      "RemoveUnusedFilesPlugin",
      (compilation, callback) => {
        this.checkUnusedFiles();
        callback();
      }
    );
  }

  collectUsedFiles(compilation) {
    // 遍历所有已编译的模块
    for (const module of compilation.modules) {
      if (module.resource && !module.resource.includes("node_modules")) {
        const relativePath = path.relative(process.cwd(), module.resource);
        this.usedFiles.add(relativePath);
      }
    }
  }

  checkUnusedFiles() {
    const dirToScan = this.options.dirToScan || "./src"; // 指定要扫描的目录
    const allFiles = this.getAllFiles(dirToScan);

    const unusedFiles = allFiles.filter((file) => {
      const relativePath = path.relative(process.cwd(), file);
      return !this.usedFiles.has(relativePath);
    });

    if (unusedFiles.length > 0) {
      console.warn("以下文件未被引入，请考虑移除：");
      unusedFiles.forEach((file) => {
        console.warn(`- ${file}`);
      });
    } else {
      console.log("所有文件均被引入。");
    }
  }

  getAllFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);

    list.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat && stat.isDirectory()) {
        results = results.concat(this.getAllFiles(filePath));
      } else {
        if (file.endsWith(".js") || file.endsWith(".vue")) {
          results.push(filePath);
        }
      }
    });

    return results;
  }
}

module.exports = RemoveUnusedFilesPlugin;

// const fs = require("fs");
// const path = require("path");
// const pathArr = [];

// function getRelativePath(relPath) {
//   let fullPath = path.resolve(__dirname, relPath);
//   const arr = fs.readdirSync(fullPath);
//   arr.forEach((item) => {
//     let info = fs.statSync(path.resolve(fullPath, item));
//     if (info.isDirectory()) {
//       getRelativePath(path.join(relPath, item));
//     } else {
//       if (item.endsWith(".vue") || item.endsWith(".js")) {
//         pathArr.push(path.resolve(fullPath, item));
//       }
//     }
//   });
// }

// getRelativePath("src");
// console.log(pathArr);

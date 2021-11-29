class MyWebpackPlugin {
  apply(compiler) {
    // run after exit.
    compiler.hooks.done.tap('My Plugin', (stats) => {
      console.log('MyWebpackPlugin worked')
    })

    // BannerPlugin
    compiler.hooks.emit.tapAsync('My Plugin', (compilation, callback) => {
      // console.log(
      //   "compilation.assets['main.bundle.js']",
      //   compilation.assets['main.bundle.js'].source()
      // )
      const source = compilation.assets['main.bundle.js'].source()
      compilation.assets['main.bundle.js'].srouce = () => {
        const banner = [
          `/**`,
          ` * 이것은 BannerPlugin이 처리한 결과입니다.`,
          ` * Build Date: ${new Date().toISOString().split('T')[0]}`,
          ` */`,
        ].join('\n')
        return banner + '\n\n' + source
      }

      callback()
    })
  }
}

module.exports = MyWebpackPlugin

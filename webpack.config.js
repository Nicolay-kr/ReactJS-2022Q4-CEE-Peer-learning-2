
const devConfig = require('./webpack.config.dev')
const prodConfig = require('./webpack.config.prod')

module.exports = (env) => {
    if(env.development){
      return devConfig
    }else{
      return prodConfig
    }
}
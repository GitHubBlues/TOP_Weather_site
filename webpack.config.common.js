const path = require('path');

module.exports = {
  entry: {
    index: [path.resolve(__dirname, "src", "index.js")],
        
  },

  module: {
   rules: [
     {
       test: /\.html$/i,
       use: ['html-loader'],
     },

   ],
  },

//  optimization: {
//    mergeDuplicateChunks: false,
//  }

//  optimization: {
//    runtimeChunk: 'single',
//  },
};


const path = require('path')

module.exports ={
    mode: 'development',
    entry:{ ProviderHub:'./src/pages/ProviderHub.js',
    ProviderSU:'./src/pages/ProviderSU.js',
    SignIn:'./src/pages/SignIn.js',
    RequestHub:'./src/pages/RequestHub.js',

    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),

    },
    watch: true
};
   

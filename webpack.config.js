// Минимальная настройка webpack чтобы создать модульный JS. Можно использовать в любом проекте
const path = require('path');

module.exports = {
    entry: {
        main: './src/main.js',
        goods: './src/goods.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'eval-source-map'
}
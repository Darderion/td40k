
const path = require('path');

module.exports = {
    entry: './scripts/main.js',
    output: {
        filename: 'super.js',
        path: path.resolve(__dirname, 'dist')
    }
};

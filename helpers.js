"use strict";

let path = require('path');
let _root = path.resolve(__dirname, '..');
function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [_root].concat(args));
}
function addHash(template, hash, isProd) {
    return isProd? template.replace(/\.[^.]+$/, `.[${hash}]$&`): template+'?hash=['+hash+']';
}
function rootNode(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return root.apply(path, ['node_modules'].concat(args));
}

function isDev() {
    const env = process.env.ENV;
    if (!env) return false;
    return env.trim() === 'dev';
}

exports.rootNode = rootNode;
exports.root = root;
exports.addHash = addHash;
exports.isDev = isDev;
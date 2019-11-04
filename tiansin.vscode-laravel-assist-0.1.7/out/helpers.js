"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function mkdirsSync(dirname) {
    if (fs_1.default.existsSync(dirname)) {
        return true;
    }
    else {
        if (mkdirsSync(path_1.default.dirname(dirname))) {
            fs_1.default.mkdirSync(dirname);
            return true;
        }
    }
}
exports.mkdirsSync = mkdirsSync;
function toInteger(num) {
    return num * 1 | 0 || 0;
}
exports.toInteger = toInteger;
function randomNumber(Min, Max) {
    const Range = Max - Min;
    const Rand = Math.random();
    return (Min + Math.round(Rand * Range));
}
exports.randomNumber = randomNumber;
function randomString(len) {
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let text = "";
    for (let i = 0; i < len; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
exports.randomString = randomString;
function stringToBoolean(src) {
    switch (src.toLowerCase().trim()) {
        case "true":
        case "yes":
        case "1":
        case "on": return true;
        case "false":
        case "no":
        case "0":
        case "off":
        case undefined:
        case null: return false;
        default: return Boolean(src);
    }
}
exports.stringToBoolean = stringToBoolean;
function deleteFile(dir, file) {
    return new Promise(function (resolve, reject) {
        let filePath = path_1.default.join(dir, file);
        fs_1.default.lstat(filePath, function (err, stats) {
            if (err) {
                return reject(err);
            }
            if (stats.isDirectory()) {
                resolve(deleteDirectory(filePath));
            }
            else {
                fs_1.default.unlink(filePath, function (err2) {
                    if (err2) {
                        return reject(err2);
                    }
                    resolve();
                });
            }
        });
    });
}
function deleteDirectory(dir) {
    return new Promise(function (resolve, reject) {
        fs_1.default.access(dir, function (err) {
            if (err) {
                return reject(err);
            }
            fs_1.default.readdir(dir, function (err2, files) {
                if (err2) {
                    return reject(err2);
                }
                Promise.all(files.map(function (file) {
                    return deleteFile(dir, file);
                })).then(function () {
                    fs_1.default.rmdir(dir, function (err3) {
                        if (err3) {
                            return reject(err3);
                        }
                        resolve();
                    });
                }).catch(reject);
            });
        });
    });
}
exports.deleteDirectory = deleteDirectory;
function walk(srcDir, callback) {
    fs_1.default.readdir(srcDir, function (err, files) {
        if (err) {
            throw new Error(err.message);
        }
        files.forEach(function (name) {
            const filePath = path_1.default.join(srcDir, name);
            const stat = fs_1.default.statSync(filePath);
            if (stat.isFile()) {
                callback(filePath, stat);
            }
            else if (stat.isDirectory()) {
                walk(filePath, callback);
            }
        });
    });
}
exports.walk = walk;
function tryParseJSON(jsonString) {
    try {
        let o = JSON.parse(jsonString);
        if (o && typeof o === "object") {
            return o;
        }
    }
    catch (e) { }
    return false;
}
exports.tryParseJSON = tryParseJSON;
function wordContains(word, str) {
    let reg = eval("/" + word + "/ig");
    return reg.test(str);
}
exports.wordContains = wordContains;
function trim(str, charList) {
    let whitespace = [
        ' ',
        '\n',
        '\r',
        '\t',
        '\f',
        '\x0b',
        '\xa0',
        '\u2000',
        '\u2001',
        '\u2002',
        '\u2003',
        '\u2004',
        '\u2005',
        '\u2006',
        '\u2007',
        '\u2008',
        '\u2009',
        '\u200a',
        '\u200b',
        '\u2028',
        '\u2029',
        '\u3000'
    ].join('');
    let l = 0;
    let i = 0;
    str += '';
    if (charList) {
        whitespace = (charList + '').replace(/([[\]().?/*{}+$^:])/g, '$1');
    }
    l = str.length;
    for (i = 0; i < l; i++) {
        if (whitespace.indexOf(str.charAt(i)) === -1) {
            str = str.substring(i);
            break;
        }
    }
    l = str.length;
    for (i = l - 1; i >= 0; i--) {
        if (whitespace.indexOf(str.charAt(i)) === -1) {
            str = str.substring(0, i + 1);
            break;
        }
    }
    return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
}
exports.trim = trim;
function isEmpty(v) {
    switch (typeof v) {
        case "undefined":
            return true;
        case "string":
            if (v.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length == 0)
                return true;
            break;
        case "boolean":
            if (!v)
                return true;
            break;
        case "number":
            if (0 === v || isNaN(v))
                return true;
            break;
        case "object":
            if (null === v || v.length === 0)
                return true;
            for (var i in v) {
                return false;
            }
            return true;
    }
    return false;
}
exports.isEmpty = isEmpty;
//# sourceMappingURL=helpers.js.map
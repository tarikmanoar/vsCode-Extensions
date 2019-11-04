"use strict";
const engine = require('php-parser');
const phpParser = new engine({
    parser: {
        extractDoc: true,
        php7: true,
        suppressErrors: true,
    },
    ast: {
        withPositions: true
    }
});
class Parser {
    static regexCallClass(classes) {
        var regexPattern = `(((${classes.join('|')})::)([@A-Za-z0-9_]+))((\\()((?:[^)(]+|\\((?:[^)(]+|\\([^)(]*\\))*\\))*)(\\)|$))`;
        for (var counter = 0; counter < 12; counter++) {
            regexPattern = regexPattern.replace("\\([^)(]*\\)", "\\((?:[^)(]+|\\([^)(]*\\))*(\\)|$)");
        }
        return new RegExp(regexPattern, "g");
    }
    static regexCallFunction(funcs) {
        var regexPattern = `(${funcs.join('|')})((\\()((?:[^)(]+|\\((?:[^)(]+|\\([^)(]*\\))*\\))*)(\\)|$))`;
        for (var counter = 0; counter < 12; counter++) {
            regexPattern = regexPattern.replace("\\([^)(]*\\)", "\\((?:[^)(]+|\\([^)(]*\\))*(\\)|$)");
        }
        return new RegExp(regexPattern, "g");
    }
}
Parser.phpParser = phpParser;
module.exports = Parser;
//# sourceMappingURL=parser.js.map
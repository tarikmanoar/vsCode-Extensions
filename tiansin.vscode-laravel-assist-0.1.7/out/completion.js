"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const vscode_1 = require("vscode");
const helpers_1 = require("./helpers");
const parser_1 = __importDefault(require("./parser"));
class Completion {
    constructor(c, f, b = {}) {
        this.funcItems = f;
        this.classItems = c;
        this.bladeItems = b;
    }
    allowCompletion(document, position) {
        let fullText = document.getText();
        return (this.testClass(document, position, fullText) ||
            this.testFunction(document, position, fullText) ||
            this.testBladeFunction(document, position, fullText));
    }
    testClass(document, current, content) {
        let result;
        let pattern = parser_1.default.regexCallClass(Object.keys(this.classItems));
        if (helpers_1.isEmpty(this.classItems))
            return false;
        while (result = pattern.exec(content)) {
            let start = document.positionAt(result.index);
            let end = document.positionAt(pattern.lastIndex);
            if (current.isAfterOrEqual(start) && current.isBeforeOrEqual(end)) {
                let items = this.classItems[result[3]];
                let funName = result[4];
                let argIndex = items[funName];
                let characters = " ".repeat(start.character) + result[0];
                let tokens = parser_1.default.phpParser.parseEval(characters);
                for (const i in tokens.children) {
                    let value = tokens.children[i];
                    let expression = value['expression'];
                    if (expression.kind === "call" && expression.what.kind === 'staticlookup') {
                        if (expression.what.offset.name === funName) {
                            argIndex = Array.isArray(argIndex) ? argIndex : [argIndex];
                            let expr = this.findCall(expression, argIndex, start, current);
                            if (expr)
                                return true;
                        }
                    }
                }
            }
        }
        return false;
    }
    testFunction(document, current, content) {
        let result;
        let pattern = parser_1.default.regexCallFunction(Object.keys(this.funcItems));
        if (helpers_1.isEmpty(this.funcItems))
            return false;
        while (result = pattern.exec(content)) {
            let start = document.positionAt(result.index);
            let end = document.positionAt(pattern.lastIndex);
            if (current.isAfterOrEqual(start) && current.isBeforeOrEqual(end)) {
                let funName = result[1];
                let argIndex = this.funcItems[funName];
                let characters = " ".repeat(start.character) + result[0];
                let tokens = parser_1.default.phpParser.parseEval(characters);
                for (const i in tokens.children) {
                    let value = tokens.children[i];
                    let expression = value['expression'];
                    if (expression.kind === "call" && expression.what.kind === 'classreference') {
                        if (expression.what.name === funName) {
                            argIndex = Array.isArray(argIndex) ? argIndex : [argIndex];
                            let expr = this.findCall(expression, argIndex, start, current);
                            if (expr)
                                return true;
                        }
                    }
                }
            }
        }
        return false;
    }
    testBladeFunction(document, current, content) {
        let result;
        let pattern = parser_1.default.regexCallFunction(Object.keys(this.bladeItems));
        if (helpers_1.isEmpty(this.bladeItems))
            return false;
        while (result = pattern.exec(content)) {
            let start = document.positionAt(result.index);
            let end = document.positionAt(pattern.lastIndex);
            if (current.isAfterOrEqual(start) && current.isBeforeOrEqual(end)) {
                let funName = result[1];
                let argIndex = this.bladeItems[funName];
                let characters = " ".repeat(start.character) + result[0];
                if (funName.startsWith('@')) {
                    const regex = new RegExp(funName, "gm");
                    funName = funName.replace('@', '_');
                    characters = characters.replace(regex, funName);
                }
                let tokens = parser_1.default.phpParser.parseEval(characters);
                for (const i in tokens.children) {
                    let value = tokens.children[i];
                    let expression = value['expression'];
                    if (expression.kind === "call" && expression.what.kind === 'classreference') {
                        if (expression.what.name === funName) {
                            argIndex = Array.isArray(argIndex) ? argIndex : [argIndex];
                            let expr = this.findCall(expression, argIndex, start, current);
                            if (expr)
                                return true;
                        }
                    }
                }
            }
        }
        return false;
    }
    findCall(expression, argIndex, start, current) {
        function findArgs(expr) {
            for (const key in expr.arguments) {
                if (~argIndex.indexOf(Number(key))) {
                    let val = expr.arguments[key];
                    if (val.kind === 'string') {
                        let loc = val.loc;
                        let p1 = new vscode_1.Position(start.line + loc.start.line - 1, loc.start.column - 1);
                        let p2 = new vscode_1.Position(start.line + loc.end.line - 1, loc.end.column - 1);
                        if (current.isAfterOrEqual(p1) && current.isBeforeOrEqual(p2)) {
                            return expr;
                        }
                    }
                    if (val.kind === 'call') {
                        return findArgs(val);
                    }
                }
            }
        }
        return findArgs(expression);
    }
}
module.exports = Completion;
//# sourceMappingURL=completion.js.map
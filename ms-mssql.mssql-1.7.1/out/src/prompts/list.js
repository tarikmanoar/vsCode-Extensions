'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_1 = require("./prompt");
const EscapeException_1 = require("../utils/EscapeException");
class ListPrompt extends prompt_1.default {
    constructor(question, vscodeWrapper, ignoreFocusOut) {
        super(question, vscodeWrapper, ignoreFocusOut);
    }
    render() {
        const choices = this._question.choices.reduce((result, choice) => {
            result[choice.name || choice] = choice.value || choice;
            return result;
        }, {});
        let options = this.defaultQuickPickOptions;
        options.placeHolder = this._question.message;
        return this._vscodeWrapper.showQuickPickStrings(Object.keys(choices), options)
            .then(result => {
            if (result === undefined) {
                throw new EscapeException_1.default();
            }
            return choices[result];
        });
    }
}
exports.default = ListPrompt;

//# sourceMappingURL=list.js.map

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Common_1 = require("../../Common");
class RouteList extends Common_1.default {
    static run() {
        return __awaiter(this, void 0, void 0, function* () {
            let command = `route:list`;
            this.execCmd(command, (info) => __awaiter(this, void 0, void 0, function* () {
                if (info.err) {
                    return this.showError('The route list could not be generated', info.err);
                }
                else {
                    let data = this.parseCliTable(info.stdout);
                    let panel = yield this.openVirtualHtmlFile('route-list', 'Route List', data.headers, data.rows, info.artisan.dir);
                    this.ping(panel, info.artisan.path);
                    panel.onDidDispose(() => clearInterval(this.timeout));
                }
            }));
        });
    }
    static ping(panel, root) {
        let running = false;
        this.timeout = setInterval(() => {
            if (running)
                return;
            running = true;
            this.execCmd('route:list', (info) => __awaiter(this, void 0, void 0, function* () {
                let data = this.parseCliTable(info.stdout);
                panel.webview.postMessage({ rows: data.rows });
                running = false;
            }), root);
        }, 5000);
    }
}
exports.default = RouteList;
//# sourceMappingURL=List.js.map
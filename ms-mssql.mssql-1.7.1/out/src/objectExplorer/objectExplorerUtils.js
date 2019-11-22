"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
const path = require("path");
const Constants = require("../constants/constants");
const LocalizedConstants = require("../constants/localizedConstants");
class ObjectExplorerUtils {
    static iconPath(label) {
        if (label) {
            if (label === Constants.disconnectedServerLabel) {
                // if disconnected
                label = `${Constants.serverLabel}_red`;
            }
            else if (label === Constants.serverLabel) {
                // if connected
                label += '_green';
            }
            return path.join(ObjectExplorerUtils.rootPath, `${label}.svg`);
        }
    }
    static getNodeUri(node) {
        const profile = node.connectionCredentials;
        return ObjectExplorerUtils.getNodeUriFromProfile(profile);
    }
    static getNodeUriFromProfile(profile) {
        const uri = `${profile.server}_${profile.database}_${profile.user}_${profile.profileName}`;
        return uri;
    }
    static getDatabaseName(node) {
        if (node.nodeType === Constants.serverLabel) {
            return node.connectionCredentials.database;
        }
        while (node) {
            if (node.nodeType === Constants.databaseString) {
                return node.label;
            }
            node = node.parentNode;
        }
        return LocalizedConstants.defaultDatabaseLabel;
    }
}
ObjectExplorerUtils.rootPath = path.join(__dirname, 'objectTypes');
exports.ObjectExplorerUtils = ObjectExplorerUtils;

//# sourceMappingURL=objectExplorerUtils.js.map

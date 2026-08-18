"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApiBaseUrl = getApiBaseUrl;
const PORT = 8000;
function getApiBaseUrl() {
    const codespaceName = process.env.CODESPACE_NAME;
    if (codespaceName) {
        return `https://${codespaceName}-${PORT}.app.github.dev`;
    }
    return `http://localhost:${PORT}`;
}

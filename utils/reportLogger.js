import fs from 'fs';
import path from 'path';
import stripAnsi from 'strip-ansi';
import { DATA_FOLDER } from '../config.js';

const LOGS_FOLDER = path.join(DATA_FOLDER, 'ReportsLog');

function ensurePluginLogFolder(pluginName) {
    const pluginFolder = path.join(LOGS_FOLDER, pluginName);
    if (!fs.existsSync(pluginFolder)) {
        fs.mkdirSync(pluginFolder, { recursive: true });
    }
    return pluginFolder;
}

function getLogFilePath(pluginName) {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    return path.join(ensurePluginLogFolder(pluginName), `report-${today}.log`);
}

export function logPluginReport(pluginName, message) {
    const logFile = getLogFilePath(pluginName);
    fs.appendFileSync(logFile, stripAnsi(message) + '\n');
}
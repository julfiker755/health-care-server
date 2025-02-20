"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customFormatTime = void 0;
const date_fns_1 = require("date-fns");
const customFormatTime = (date, time) => {
    const format = time.replace(/(\d)([APMapm]{2})$/, "$1 $2");
    const finalDateTime = (0, date_fns_1.parse)(`${date} ${format}`, "yyyy-MM-dd hh.mm a", new Date());
    return finalDateTime;
};
exports.customFormatTime = customFormatTime;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerDuplicateError = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const handlerDuplicateError = (err) => {
    const matchedArray = err.message.match(/"([^"]*)"/);
    const value = matchedArray ? matchedArray[1] : "Value";
    return {
        statusCode: 400,
        message: `${value} already exists!!`,
    };
};
exports.handlerDuplicateError = handlerDuplicateError;

"use strict";
exports.__esModule = true;
exports.errorHandlerMiddleware = void 0;
function errorHandlerMiddleware(err, req, res, next) {
    if (err.type) {
        return res.status(errorTypeToStatusCode(err.type)).send(err.message);
    }
    return res.sendStatus(500);
}
exports.errorHandlerMiddleware = errorHandlerMiddleware;
function errorTypeToStatusCode(errorType) {
    if (errorType === 'unprocessable entity')
        return 422;
    if (errorType === 'conflict')
        return 409;
    if (errorType === 'not_found')
        return 404;
    if (errorType === 'unauthorized')
        return 401;
    return 400;
}

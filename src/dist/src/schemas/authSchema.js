"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.signInSchema = exports.signUpSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.signUpSchema = joi_1["default"].object({
    email: joi_1["default"].string().email().required(),
    password: joi_1["default"].string().min(10).required()
});
exports.signInSchema = joi_1["default"].object({
    email: joi_1["default"].string().email().required(),
    password: joi_1["default"].string().min(7).required(),
    confirmPassword: joi_1["default"].string().valid(joi_1["default"].ref('password')).required()
});

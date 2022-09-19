"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var app_1 = __importDefault(require("./app"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var PORT = Number(process.env.PORT);
app_1["default"].listen(PORT, function () {
    console.log("Rodando server na porta ".concat(PORT));
});

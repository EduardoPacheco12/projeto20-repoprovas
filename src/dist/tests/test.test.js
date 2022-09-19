"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var supertest_1 = __importDefault(require("supertest"));
var app_1 = __importDefault(require("../src/app"));
var postgres_1 = require("../src/databases/postgres");
var authFactories_1 = require("./factories/authFactories");
var testFactories_1 = require("./factories/testFactories");
var agent = (0, supertest_1["default"])(app_1["default"]);
beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, postgres_1.client.$executeRaw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["TRUNCATE TABLE \"tests\" RESTART IDENTITY"], ["TRUNCATE TABLE \"tests\" RESTART IDENTITY"])))];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
describe('Test POST /repoprovas/tests/create', function () {
    it('Should return 201 if registered an test in the correct format', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, loginUserBody, login, token, test, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, authFactories_1.createUser)()];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, agent.post('/repoprovas/sign-up').send(user)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, authFactories_1.loginUser)(user)];
                case 3:
                    loginUserBody = _a.sent();
                    return [4 /*yield*/, agent.post('/repoprovas/sign-in').send(loginUserBody)];
                case 4:
                    login = _a.sent();
                    token = login.text;
                    return [4 /*yield*/, (0, testFactories_1.createTest)()];
                case 5:
                    test = _a.sent();
                    return [4 /*yield*/, agent
                            .post('/repoprovas/tests/create')
                            .set({ Authorization: "Bearer ".concat(token) })
                            .send(test)];
                case 6:
                    response = _a.sent();
                    expect(response.status).toEqual(201);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should return 401 if the token is invalid', function () { return __awaiter(void 0, void 0, void 0, function () {
        var test, token, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, testFactories_1.createTest)()];
                case 1:
                    test = _a.sent();
                    token = '';
                    return [4 /*yield*/, agent
                            .post('/repoprovas/tests/create')
                            .set({ Authorization: "Bearer ".concat(token) })
                            .send(test)];
                case 2:
                    response = _a.sent();
                    expect(response.status).toEqual(401);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should return 404 if it does not find registered category, professor or discipline', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, loginUserBody, login, token, test, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, authFactories_1.createUser)()];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, agent.post('/repoprovas/sign-up').send(user)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, authFactories_1.loginUser)(user)];
                case 3:
                    loginUserBody = _a.sent();
                    return [4 /*yield*/, agent.post('/repoprovas/sign-in').send(loginUserBody)];
                case 4:
                    login = _a.sent();
                    token = login.text;
                    return [4 /*yield*/, (0, testFactories_1.createTest)()];
                case 5:
                    test = _a.sent();
                    test.category = 'P1';
                    test.discipline = 'htrsjrjrsykm';
                    test.teacher = 'gkrweoktokh';
                    return [4 /*yield*/, agent
                            .post('/repoprovas/tests/create')
                            .set({ Authorization: "Bearer ".concat(token) })
                            .send(test)];
                case 6:
                    response = _a.sent();
                    expect(response.status).toEqual(404);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should return 422 if the body is sent incorrectly', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, loginUserBody, login, token, test, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, authFactories_1.createUser)()];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, agent.post('/repoprovas/sign-up').send(user)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, authFactories_1.loginUser)(user)];
                case 3:
                    loginUserBody = _a.sent();
                    return [4 /*yield*/, agent.post('/repoprovas/sign-in').send(loginUserBody)];
                case 4:
                    login = _a.sent();
                    token = login.text;
                    return [4 /*yield*/, (0, testFactories_1.createTest)()];
                case 5:
                    test = _a.sent();
                    test.category = '';
                    test.name = '';
                    test.pdfUrl = '';
                    test.teacher = '';
                    test.discipline = '';
                    return [4 /*yield*/, agent
                            .post('/repoprovas/tests/create')
                            .set({ Authorization: "Bearer ".concat(token) })
                            .send(test)];
                case 6:
                    response = _a.sent();
                    expect(response.status).toEqual(422);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('Test GET /repoprovas/tests/disciplines', function () {
    it('Should return 200 and a array of object if the get is done correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, loginUserBody, login, token, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, authFactories_1.createUser)()];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, agent.post('/repoprovas/sign-up').send(user)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, authFactories_1.loginUser)(user)];
                case 3:
                    loginUserBody = _a.sent();
                    return [4 /*yield*/, agent.post('/repoprovas/sign-in').send(loginUserBody)];
                case 4:
                    login = _a.sent();
                    token = login.text;
                    return [4 /*yield*/, agent
                            .get('/repoprovas/tests/disciplines')
                            .set({ Authorization: "Bearer ".concat(token) })
                            .send()];
                case 5:
                    response = _a.sent();
                    expect(response.status).toEqual(200);
                    expect(response.body).toBeInstanceOf(Array);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should return 401 if the token is invalid', function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = '';
                    return [4 /*yield*/, agent
                            .get('/repoprovas/tests/disciplines')
                            .set({ Authorization: "Bearer ".concat(token) })
                            .send()];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(401);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('Test GET /repoprovas/tests/teachers', function () {
    it('Should return 200 and a array of object if the get is done correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, loginUserBody, login, token, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, authFactories_1.createUser)()];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, agent.post('/repoprovas/sign-up').send(user)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, authFactories_1.loginUser)(user)];
                case 3:
                    loginUserBody = _a.sent();
                    return [4 /*yield*/, agent.post('/repoprovas/sign-in').send(loginUserBody)];
                case 4:
                    login = _a.sent();
                    token = login.text;
                    return [4 /*yield*/, agent
                            .get('/repoprovas/tests/teachers')
                            .set({ Authorization: "Bearer ".concat(token) })
                            .send()];
                case 5:
                    response = _a.sent();
                    expect(response.status).toEqual(200);
                    expect(response.body).toBeInstanceOf(Array);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should return 401 if the token is invalid', function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = '';
                    return [4 /*yield*/, agent
                            .get('/repoprovas/tests/disciplines')
                            .set({ Authorization: "Bearer ".concat(token) })
                            .send()];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(401);
                    return [2 /*return*/];
            }
        });
    }); });
});
afterEach(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, postgres_1.client.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
var templateObject_1;

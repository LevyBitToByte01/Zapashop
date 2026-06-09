"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    register(body, res) {
        const result = this.authService.register(body);
        this.setSessionCookie(res, result.token);
        return {
            success: true,
            message: 'Cuenta registrada correctamente.',
            user: result.user,
        };
    }
    login(body, res) {
        const result = this.authService.login(body);
        this.setSessionCookie(res, result.token);
        return {
            success: true,
            message: 'Inicio de sesión correcto.',
            user: result.user,
        };
    }
    logout(req, res) {
        const token = this.getSessionToken(req);
        this.authService.logout(token);
        this.clearSessionCookie(res);
        return {
            success: true,
            message: 'Sesión cerrada correctamente.',
        };
    }
    me(req) {
        const token = this.getSessionToken(req);
        const user = this.authService.getUserFromToken(token);
        return {
            authenticated: Boolean(user),
            user,
        };
    }
    setSessionCookie(res, token) {
        const maxAge = 7 * 24 * 60 * 60;
        res.setHeader('Set-Cookie', `zapashop_session=${token}; HttpOnly; Path=/; Max-Age=${maxAge}; SameSite=Lax`);
    }
    clearSessionCookie(res) {
        res.setHeader('Set-Cookie', 'zapashop_session=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax');
    }
    getSessionToken(req) {
        const raw = req.headers.cookie || '';
        const pairs = raw.split(';').map((item) => item.trim()).filter(Boolean);
        const sessionEntry = pairs.find((item) => item.startsWith('zapashop_session='));
        if (!sessionEntry)
            return null;
        return decodeURIComponent(sessionEntry.split('=').slice(1).join('='));
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "me", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('api/auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map
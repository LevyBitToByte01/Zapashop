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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path_1 = require("path");
const crypto_1 = require("crypto");
let AuthService = class AuthService {
    constructor() {
        this.dataDir = (0, path_1.join)(process.cwd(), 'data');
        this.usersPath = (0, path_1.join)(this.dataDir, 'users.json');
        this.sessionsPath = (0, path_1.join)(this.dataDir, 'sessions.json');
        this.passwordPepper = 'zapashop-demo-pepper-v1';
        this.ensureStorage();
    }
    ensureStorage() {
        if (!(0, fs_1.existsSync)(this.dataDir)) {
            (0, fs_1.mkdirSync)(this.dataDir, { recursive: true });
        }
        if (!(0, fs_1.existsSync)(this.usersPath)) {
            (0, fs_1.writeFileSync)(this.usersPath, '[]', 'utf8');
        }
        if (!(0, fs_1.existsSync)(this.sessionsPath)) {
            (0, fs_1.writeFileSync)(this.sessionsPath, '[]', 'utf8');
        }
        const users = this.readUsers();
        const adminEmail = 'admin@zapashop.com';
        const adminExists = users.some((user) => user.email === adminEmail);
        if (!adminExists) {
            users.push({
                id: this.makeId(),
                name: 'Administrador ZapaShop',
                email: adminEmail,
                phone: '0000000000',
                role: 'admin',
                passwordHash: this.hashPassword('admin123', adminEmail),
                createdAt: new Date().toISOString(),
            });
            this.writeUsers(users);
        }
    }
    makeId() {
        return (0, crypto_1.randomBytes)(12).toString('hex');
    }
    readJSON(filePath, fallback) {
        try {
            const raw = (0, fs_1.readFileSync)(filePath, 'utf8');
            return JSON.parse(raw);
        }
        catch {
            return fallback;
        }
    }
    writeJSON(filePath, value) {
        (0, fs_1.writeFileSync)(filePath, JSON.stringify(value, null, 2), 'utf8');
    }
    readUsers() {
        return this.readJSON(this.usersPath, []);
    }
    writeUsers(users) {
        this.writeJSON(this.usersPath, users);
    }
    readSessions() {
        const sessions = this.readJSON(this.sessionsPath, []);
        const now = Date.now();
        const validSessions = sessions.filter((session) => new Date(session.expiresAt).getTime() > now);
        if (validSessions.length !== sessions.length) {
            this.writeSessions(validSessions);
        }
        return validSessions;
    }
    writeSessions(sessions) {
        this.writeJSON(this.sessionsPath, sessions);
    }
    normalizeEmail(email) {
        return String(email || '').trim().toLowerCase();
    }
    hashPassword(password, email) {
        const salt = `${this.passwordPepper}:${this.normalizeEmail(email)}`;
        return (0, crypto_1.pbkdf2Sync)(password, salt, 120000, 64, 'sha512').toString('hex');
    }
    verifyPassword(password, email, hash) {
        const derived = Buffer.from(this.hashPassword(password, email), 'hex');
        const stored = Buffer.from(hash, 'hex');
        if (derived.length !== stored.length)
            return false;
        return (0, crypto_1.timingSafeEqual)(derived, stored);
    }
    sanitizeUser(user) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            createdAt: user.createdAt,
        };
    }
    register(input) {
        const name = String(input.name || '').trim();
        const email = this.normalizeEmail(input.email);
        const phone = String(input.phone || '').trim();
        const password = String(input.password || '');
        if (!name || !email || !phone || !password) {
            throw new common_1.BadRequestException('Nombre, correo, teléfono y contraseña son obligatorios.');
        }
        if (password.length < 6) {
            throw new common_1.BadRequestException('La contraseña debe tener al menos 6 caracteres.');
        }
        const users = this.readUsers();
        const exists = users.some((user) => user.email === email);
        if (exists) {
            throw new common_1.ConflictException('Ya existe una cuenta registrada con ese correo.');
        }
        const user = {
            id: this.makeId(),
            name,
            email,
            phone,
            role: 'user',
            passwordHash: this.hashPassword(password, email),
            createdAt: new Date().toISOString(),
        };
        users.push(user);
        this.writeUsers(users);
        const token = this.createSession(user.id);
        return { token, user: this.sanitizeUser(user) };
    }
    login(input) {
        const email = this.normalizeEmail(input.email);
        const password = String(input.password || '');
        if (!email || !password) {
            throw new common_1.BadRequestException('Correo y contraseña son obligatorios.');
        }
        const users = this.readUsers();
        const user = users.find((item) => item.email === email);
        if (!user || !this.verifyPassword(password, email, user.passwordHash)) {
            throw new common_1.UnauthorizedException('Credenciales inválidas.');
        }
        const token = this.createSession(user.id);
        return { token, user: this.sanitizeUser(user) };
    }
    createSession(userId) {
        const sessions = this.readSessions();
        const token = (0, crypto_1.randomBytes)(32).toString('hex');
        const now = new Date();
        const expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        sessions.push({
            token,
            userId,
            createdAt: now.toISOString(),
            expiresAt: expiresAt.toISOString(),
        });
        this.writeSessions(sessions);
        return token;
    }
    getUserFromToken(token) {
        if (!token)
            return null;
        const sessions = this.readSessions();
        const session = sessions.find((item) => item.token === token);
        if (!session)
            return null;
        const users = this.readUsers();
        const user = users.find((item) => item.id === session.userId);
        if (!user)
            return null;
        return this.sanitizeUser(user);
    }
    logout(token) {
        if (!token)
            return;
        const sessions = this.readSessions().filter((session) => session.token !== token);
        this.writeSessions(sessions);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AuthService);
//# sourceMappingURL=auth.service.js.map
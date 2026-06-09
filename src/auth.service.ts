import { Injectable, ConflictException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { pbkdf2Sync, randomBytes, timingSafeEqual } from 'crypto';

export type UserRole = 'admin' | 'user';

interface StoredUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  passwordHash: string;
  createdAt: string;
}

interface SessionRecord {
  token: string;
  userId: string;
  createdAt: string;
  expiresAt: string;
}

@Injectable()
export class AuthService {
  private readonly dataDir = join(process.cwd(), 'data');
  private readonly usersPath = join(this.dataDir, 'users.json');
  private readonly sessionsPath = join(this.dataDir, 'sessions.json');
  private readonly passwordPepper = 'zapashop-demo-pepper-v1';

  constructor() {
    this.ensureStorage();
  }

  private ensureStorage() {
    if (!existsSync(this.dataDir)) {
      mkdirSync(this.dataDir, { recursive: true });
    }

    if (!existsSync(this.usersPath)) {
      writeFileSync(this.usersPath, '[]', 'utf8');
    }

    if (!existsSync(this.sessionsPath)) {
      writeFileSync(this.sessionsPath, '[]', 'utf8');
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

  private makeId() {
    return randomBytes(12).toString('hex');
  }

  private readJSON<T>(filePath: string, fallback: T): T {
    try {
      const raw = readFileSync(filePath, 'utf8');
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  }

  private writeJSON(filePath: string, value: unknown) {
    writeFileSync(filePath, JSON.stringify(value, null, 2), 'utf8');
  }

  private readUsers() {
    return this.readJSON<StoredUser[]>(this.usersPath, []);
  }

  private writeUsers(users: StoredUser[]) {
    this.writeJSON(this.usersPath, users);
  }

  private readSessions() {
    const sessions = this.readJSON<SessionRecord[]>(this.sessionsPath, []);
    const now = Date.now();
    const validSessions = sessions.filter((session) => new Date(session.expiresAt).getTime() > now);
    if (validSessions.length !== sessions.length) {
      this.writeSessions(validSessions);
    }
    return validSessions;
  }

  private writeSessions(sessions: SessionRecord[]) {
    this.writeJSON(this.sessionsPath, sessions);
  }

  private normalizeEmail(email: string) {
    return String(email || '').trim().toLowerCase();
  }

  private hashPassword(password: string, email: string) {
    const salt = `${this.passwordPepper}:${this.normalizeEmail(email)}`;
    return pbkdf2Sync(password, salt, 120000, 64, 'sha512').toString('hex');
  }

  private verifyPassword(password: string, email: string, hash: string) {
    const derived = Buffer.from(this.hashPassword(password, email), 'hex');
    const stored = Buffer.from(hash, 'hex');
    if (derived.length !== stored.length) return false;
    return timingSafeEqual(derived, stored);
  }

  private sanitizeUser(user: StoredUser) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      createdAt: user.createdAt,
    };
  }

  register(input: { name: string; email: string; phone: string; password: string }) {
    const name = String(input.name || '').trim();
    const email = this.normalizeEmail(input.email);
    const phone = String(input.phone || '').trim();
    const password = String(input.password || '');

    if (!name || !email || !phone || !password) {
      throw new BadRequestException('Nombre, correo, teléfono y contraseña son obligatorios.');
    }

    if (password.length < 6) {
      throw new BadRequestException('La contraseña debe tener al menos 6 caracteres.');
    }

    const users = this.readUsers();
    const exists = users.some((user) => user.email === email);
    if (exists) {
      throw new ConflictException('Ya existe una cuenta registrada con ese correo.');
    }

    const user: StoredUser = {
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

  login(input: { email: string; password: string }) {
    const email = this.normalizeEmail(input.email);
    const password = String(input.password || '');

    if (!email || !password) {
      throw new BadRequestException('Correo y contraseña son obligatorios.');
    }

    const users = this.readUsers();
    const user = users.find((item) => item.email === email);
    if (!user || !this.verifyPassword(password, email, user.passwordHash)) {
      throw new UnauthorizedException('Credenciales inválidas.');
    }

    const token = this.createSession(user.id);
    return { token, user: this.sanitizeUser(user) };
  }

  private createSession(userId: string) {
    const sessions = this.readSessions();
    const token = randomBytes(32).toString('hex');
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

  getUserFromToken(token?: string | null) {
    if (!token) return null;

    const sessions = this.readSessions();
    const session = sessions.find((item) => item.token === token);
    if (!session) return null;

    const users = this.readUsers();
    const user = users.find((item) => item.id === session.userId);
    if (!user) return null;

    return this.sanitizeUser(user);
  }

  logout(token?: string | null) {
    if (!token) return;
    const sessions = this.readSessions().filter((session) => session.token !== token);
    this.writeSessions(sessions);
  }
}

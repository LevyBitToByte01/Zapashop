export type UserRole = 'admin' | 'user';
export declare class AuthService {
    private readonly dataDir;
    private readonly usersPath;
    private readonly sessionsPath;
    private readonly passwordPepper;
    constructor();
    private ensureStorage;
    private makeId;
    private readJSON;
    private writeJSON;
    private readUsers;
    private writeUsers;
    private readSessions;
    private writeSessions;
    private normalizeEmail;
    private hashPassword;
    private verifyPassword;
    private sanitizeUser;
    register(input: {
        name: string;
        email: string;
        phone: string;
        password: string;
    }): {
        token: string;
        user: {
            id: string;
            name: string;
            email: string;
            phone: string;
            role: UserRole;
            createdAt: string;
        };
    };
    login(input: {
        email: string;
        password: string;
    }): {
        token: string;
        user: {
            id: string;
            name: string;
            email: string;
            phone: string;
            role: UserRole;
            createdAt: string;
        };
    };
    private createSession;
    getUserFromToken(token?: string | null): {
        id: string;
        name: string;
        email: string;
        phone: string;
        role: UserRole;
        createdAt: string;
    };
    logout(token?: string | null): void;
}

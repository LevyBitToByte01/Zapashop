import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: {
        name: string;
        email: string;
        phone: string;
        password: string;
    }, res: Response): {
        success: boolean;
        message: string;
        user: {
            id: string;
            name: string;
            email: string;
            phone: string;
            role: import("./auth.service").UserRole;
            createdAt: string;
        };
    };
    login(body: {
        email: string;
        password: string;
    }, res: Response): {
        success: boolean;
        message: string;
        user: {
            id: string;
            name: string;
            email: string;
            phone: string;
            role: import("./auth.service").UserRole;
            createdAt: string;
        };
    };
    logout(req: Request, res: Response): {
        success: boolean;
        message: string;
    };
    me(req: Request): {
        authenticated: boolean;
        user: {
            id: string;
            name: string;
            email: string;
            phone: string;
            role: import("./auth.service").UserRole;
            createdAt: string;
        };
    };
    private setSessionCookie;
    private clearSessionCookie;
    private getSessionToken;
}

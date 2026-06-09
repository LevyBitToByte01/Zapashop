import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(
    @Body() body: { name: string; email: string; phone: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = this.authService.register(body);
    this.setSessionCookie(res, result.token);
    return {
      success: true,
      message: 'Cuenta registrada correctamente.',
      user: result.user,
    };
  }

  @Post('login')
  login(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = this.authService.login(body);
    this.setSessionCookie(res, result.token);
    return {
      success: true,
      message: 'Inicio de sesión correcto.',
      user: result.user,
    };
  }

  @Post('logout')
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const token = this.getSessionToken(req);
    this.authService.logout(token);
    this.clearSessionCookie(res);
    return {
      success: true,
      message: 'Sesión cerrada correctamente.',
    };
  }

  @Get('me')
  me(@Req() req: Request) {
    const token = this.getSessionToken(req);
    const user = this.authService.getUserFromToken(token);

    return {
      authenticated: Boolean(user),
      user,
    };
  }

  private setSessionCookie(res: Response, token: string) {
    const maxAge = 7 * 24 * 60 * 60;
    res.setHeader('Set-Cookie', `zapashop_session=${token}; HttpOnly; Path=/; Max-Age=${maxAge}; SameSite=Lax`);
  }

  private clearSessionCookie(res: Response) {
    res.setHeader('Set-Cookie', 'zapashop_session=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax');
  }

  private getSessionToken(req: Request) {
    const raw = req.headers.cookie || '';
    const pairs = raw.split(';').map((item) => item.trim()).filter(Boolean);
    const sessionEntry = pairs.find((item) => item.startsWith('zapashop_session='));
    if (!sessionEntry) return null;
    return decodeURIComponent(sessionEntry.split('=').slice(1).join('='));
  }
}

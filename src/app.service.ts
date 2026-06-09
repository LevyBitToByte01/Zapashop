import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      status: 'ok',
      service: 'zapashop-nestjs',
      timestamp: new Date().toISOString(),
    };
  }

  getInfo() {
    return {
      app: 'ZapaShop',
      framework: 'NestJS',
      description: 'Tienda web con panel de administración montada como frontend estático en NestJS.',
      endpoints: ['/api/health', '/api/info'],
    };
  }
}

import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHealth(): {
        status: string;
        service: string;
        timestamp: string;
    };
    getInfo(): {
        app: string;
        framework: string;
        description: string;
        endpoints: string[];
    };
}

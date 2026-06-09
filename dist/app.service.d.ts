export declare class AppService {
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

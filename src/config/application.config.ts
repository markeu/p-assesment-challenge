import 'dotenv/config';

export class ConfigService {
    constructor(private env: { [k: string]: string | undefined }) {}

    public getValue(key: string, throwOnMissing = true): string {
        const value = this.env[key];
        if (!value && throwOnMissing && this.isTesting()) {
            throw new Error(`config error - missing env.${key}`);
        }

        return value;
    }

    public getBoolean(key: string): boolean {
        const value = this.getValue(key);
        return value === 'true';
    }

    public ensureValues(keys: string[]): this {
        keys.forEach((k) => this.getValue(k, true));
        return this;
    }

    public getPort(): number {
        return Number(this.getValue('PORT', true));
    }

    public isProduction(): boolean {
        return this.getValue('NODE_ENV') === 'production';
    }
    public isTesting(): boolean {
        return this.getValue('NODE_ENV') === 'testing';
    }
}
export const configService: ConfigService = new ConfigService(process.env);
export default ConfigService;

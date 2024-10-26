import dotenv from 'dotenv';
import path from 'path';
const absolute_path: string = path.resolve('./src');
const env_path: string = path.join(absolute_path, '.env');
dotenv.config({path: env_path});

export class EnvConfig {
    static readonly PORT: number = Number(process.env.PORT) || 8000;
    static readonly JWT_SECRET: string = process.env.JWT_SECRET as string;
    static readonly JWT_LIFETIME: string = process.env.JWT_LIFETIME || "30m";
    static readonly MONGO_URI: string = process.env.MONGO_URI as string;
} 
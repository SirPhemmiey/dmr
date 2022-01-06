
import * as dotenv from 'dotenv';

dotenv.config();

export interface SetUpEnv {
    PORT: string,
    NODE_ENV: string,
    MYSQL_HOSTNAME: string,
    MYSQL_USER: string,
    MYSQL_DATABASE: string
    MYSQL_PASSWORD: string
}

export const getEnv = (): SetUpEnv  => {
  return {
    PORT: process.env.PORT ?? '3001',
    NODE_ENV: process.env.NODE_ENV || '',
    MYSQL_DATABASE: process.env.MYSQL_DATABASE ?? '',
    MYSQL_HOSTNAME: process.env.MYSQL_HOSTNAME ?? '',
    MYSQL_USER: process.env.MYSQL_USER?? '',
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD ?? ''
  }
}
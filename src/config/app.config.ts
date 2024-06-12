import { registerAs } from '@nestjs/config';
import { AppConfig } from './app-config.type';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import validateConfig from 'src/utils/validate-config';

class EnvironmentVariablesValidator {
  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  APP_PORT: number;
}

export default registerAs<AppConfig>('app', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    port: process.env.APP_PORT ? parseInt(process.env.APP_PORT, 10) : 3000,
  };
});

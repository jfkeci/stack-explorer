import { ConfigService } from '@nestjs/config';
import { Injectable, Inject } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TechEntity } from '../../../../resources/tech/entity/tech.entity';
import { RelatedTechEntity } from '../../../../resources/related-tech/entity/related-tech.entity';

export type DbType = 'mysql' | 'mariadb' | 'postgres';

export interface DbEnvConfig {
  type: DbType;
  url: string;
  logging: boolean;
  ssl: boolean;
  synchronize: boolean;
}

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    const environment = this.config.get<string>('app.env');
    const dbEnvConfig = this.config.get<DbEnvConfig>('db');

    return {
      ...dbEnvConfig,
      entities: [TechEntity, RelatedTechEntity],
      migrations: [
        `${__dirname}/../../../../**/**/migrations/*.migration{.ts,.js}`,
      ],
      migrationsTableName: 'blue_app_migrations',
      autoLoadEntities: true,
      extra: dbEnvConfig.ssl ? { ssl: { rejectUnauthorized: false } } : {},
      verboseRetryLog: environment === 'development' ? true : false,
    };
  }
}

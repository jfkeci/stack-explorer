export interface EnvConfig {
  app: {
    prefix: string;
    port: number;
    env: string;
    url: string;
  };
  db: {
    url: string;
    type: string;
    logging: boolean;
    ssl: boolean;
    synchronize: boolean;
  };
}

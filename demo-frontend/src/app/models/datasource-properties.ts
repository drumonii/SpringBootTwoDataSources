export interface DatasourceProperties {
  jdbcUrl: string;
  username: string;
  dialect: string;
  flywayPath: string;
  showSql: boolean;
  showStats: boolean;
}

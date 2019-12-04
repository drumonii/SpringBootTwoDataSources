export interface FlywayResponse {
  contexts: FlywayContexts;
}

export interface FlywayContexts {
  application: FlywayApplication;
}

export interface FlywayApplication {
  flywayBeans: FlywayBeans;
}

export interface FlywayBeans {
  primaryFlyway: FlywayMigrations;
  secondaryFlyway: FlywayMigrations;
}

export interface FlywayMigrations {
  migrations: FlywayMigration[];
}

export interface FlywayMigration {
  script: string;
  state: string;
  executionTime: number;
}

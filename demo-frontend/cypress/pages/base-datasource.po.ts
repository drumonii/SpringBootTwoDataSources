import { AppPage } from './app.po';

class NewEntityForm {

  getNameInput() {
    return cy.get('#name-input');
  }

  getNameValidationFeedback() {
    return cy.get('#name-validation-feedback');
  }

  getSubmitBtn() {
    return cy.get('#new-entity-btn');
  }

}

export class BaseDatasourcePage extends AppPage {

  constructor(destination: string) {
    super(destination);
  }

  getConfigPropsTable() {
    return cy.get('#config-props-table');
  }

  getFlywayMigrationsTable() {
    return cy.get('#flyway-migrations-table');
  }

  getNewEntityForm(): NewEntityForm {
    return new NewEntityForm();
  }

  getSavedEntities() {
    return cy.get('#saved-entities-datatable');
  }

}

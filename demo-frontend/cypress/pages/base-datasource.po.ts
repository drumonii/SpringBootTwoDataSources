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

  getFirstEntity() {
    return cy.get('#saved-entities-datatable > tbody > tr:nth-child(1) > td')
      .invoke('text')
  }

  sortDatatable() {
    return cy.get('.mat-sort-header-container').click();
  }

  paginateDatatable() {
    return cy.get('.mat-paginator-navigation-next').click();
  }

  firstPageOfDatatable() {
    return cy.get('.mat-paginator-navigation-first').click();
  }

  lastPageOfDatatable() {
    return cy.get('.mat-paginator-navigation-last').click();
  }

}

import { AppPage } from '../app.po';

export class HomePage extends AppPage {

  constructor() {
    super('/');
  }

  getDetails() {
    return cy.get('#project-details');
  }

  getSpringBootVersion() {
    return cy.get('#spring-boot-version');
  }

  getFeaturesList() {
    return cy.get('#project-features-list');
  }

}

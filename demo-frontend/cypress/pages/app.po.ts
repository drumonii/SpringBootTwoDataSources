export class AppPage {

  constructor(private destination: string) {}

  navigateTo(): void {
    cy.visit(this.destination)
  }

  getPageHeader() {
    return cy.get('#page-header-text');
  }

}

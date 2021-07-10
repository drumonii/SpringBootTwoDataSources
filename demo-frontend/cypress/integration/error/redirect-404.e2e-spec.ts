import { Redirect404Page } from '../../pages/error/redirect-404.po';

describe('redirection to / on 404', () => {
  let page: Redirect404Page;

  beforeEach(() => {
    page = new Redirect404Page();
    page.navigateTo();
  });

  it('should redirect to / on invalid route', () => {
    cy.url().should('equal', 'http://localhost:4200/');
  });

});

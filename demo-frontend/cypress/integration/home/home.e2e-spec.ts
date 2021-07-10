import { HomePage } from '../../pages/home/home.po';

describe('Home page', () => {
  let page: HomePage;

  beforeEach(() => {
    page = new HomePage();
    page.navigateTo();
  });

  it('should show the page header', () => {
    page.getPageHeader().should('have.text', 'Spring Boot with two DataSources Demonstration Project')
  });

  it('should show the project details', () => {
    page.getDetails().should('exist');
    page.getSpringBootVersion().should('exist');
  });

  it('should show the project features list', () => {
    page.getFeaturesList().should('exist');
  });

});

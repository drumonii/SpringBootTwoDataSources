import { SecondaryPage } from '../../pages/secondary/secondary.po';

describe('Secondary DataSource page', () => {
  let page: SecondaryPage;

  beforeEach(() => {
    page = new SecondaryPage();
    page.navigateTo();
  });

  it('should show the page header', () => {
    page.getPageHeader().should('have.text', 'Secondary DataSource');
  });

  it('should show the datasource config properties table', () => {
    page.getConfigPropsTable().should('exist');
  });

  it('should show the flyway migrations properties table', () => {
    page.getFlywayMigrationsTable().should('exist');
  });

  it('should save new primary entity', () => {
    const form = page.getNewEntityForm();

    const name = Math.random().toString(36);

    form.getNameInput().type(name);
    form.getSubmitBtn().click();

    form.getNameInput().clear();

    // try to create a duplicate with same name
    form.getNameInput().type(name);
    form.getSubmitBtn().click();
    form.getNameValidationFeedback().should('exist');
  });

  it('should show saved primary entities', () => {
    page.getSavedEntities().should('exist');
  });

});

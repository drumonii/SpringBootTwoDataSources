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

  it('should save new secondary entity', () => {
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

  it('should show saved secondary entities', () => {
    page.getSavedEntities().should('exist');
  });

  it('should sort the saved secondary entities', () => {
    page.getFirstEntity().then((initialEntity) => {
      page.sortDatatable();

      page.getFirstEntity().should('not.eq', initialEntity);
    });
  });

  it('should paginate the saved secondary entities', () => {
    page.getFirstEntity().then((initialEntity) => {
      page.paginateDatatable();

      page.getFirstEntity().should('not.eq', initialEntity);
    });
  });

  it('should paginate end pages of the saved secondary entities', () => {
    page.getFirstEntity().then((firstEntity) => {
      page.lastPageOfDatatable();
      page.getFirstEntity().should('not.eq', firstEntity);

      page.firstPageOfDatatable();
      page.getFirstEntity().should('eq', firstEntity);
    });
  });

});

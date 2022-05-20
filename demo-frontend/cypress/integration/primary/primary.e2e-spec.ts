import { PrimaryPage } from '../../pages/primary/primary.po';

describe('Primary DataSource page', () => {
  let page: PrimaryPage;

  beforeEach(() => {
    page = new PrimaryPage();
    page.navigateTo();
  });

  it('should show the page header', () => {
    page.getPageHeader().should('have.text', 'Primary DataSource');
  });

  it('should show the datasource config properties table', () => {
    page.getConfigPropsTable().should('exist')
  });

  it('should show the flyway migrations properties table', () => {
    page.getFlywayMigrationsTable().should('exist')
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
    form.getNameValidationFeedback().should('exist')
  });

  it('should show saved primary entities', () => {
    page.getSavedEntities().should('exist')
  });

  it('should sort the saved primary entities', () => {
    page.getFirstEntity().then((initialEntity) => {
      page.sortDatatable();

      page.getFirstEntity().should('not.eq', initialEntity);
    });
  });

  it('should paginate the saved primary entities', () => {
    page.getFirstEntity().then((initialEntity) => {
      page.paginateDatatable();

      page.getFirstEntity().should('not.eq', initialEntity);
    });
  });

  it('should paginate end pages of the saved primary entities', () => {
    page.getFirstEntity().then((firstEntity) => {
      page.lastPageOfDatatable();
      page.getFirstEntity().should('not.eq', firstEntity);

      page.firstPageOfDatatable();
      page.getFirstEntity().should('eq', firstEntity);
    });
  });

});
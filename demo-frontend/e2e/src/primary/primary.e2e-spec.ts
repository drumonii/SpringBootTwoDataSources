import { PrimaryPage } from './primary.po';

describe('Primary DataSource page', () => {
  let page: PrimaryPage;

  beforeEach(() => {
    page = new PrimaryPage();
    page.navigateTo();
  });

  afterEach(async () => {
    page.expectNoErrorLogs();
  });

  it('should show the page header', () => {
    expect(page.getPageHeader()).toBe('Primary DataSource');
  });

  it('should show the datasource config properties table', () => {
    expect(page.getConfigPropsTable().isPresent()).toBe(true);
  });

  it('should save new primary entity', () => {
    const form = page.getNewEntityForm();

    const name = Math.random().toString(36);

    form.getNameInput().sendKeys(name);
    form.getSubmitBtn().click();

    form.getNameInput().clear();

    // try to create a duplicate with same name
    form.getNameInput().sendKeys(name);
    form.getSubmitBtn().click();
    expect(form.getNameValidationFeedback().isPresent()).toBe(true);
  });

  it('should show saved primary entities', () => {
    expect(page.getSavedEntities().isPresent()).toBe(true);
  });

});

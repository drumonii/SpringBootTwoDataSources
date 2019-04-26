import { SecondaryPage } from './secondary.po';

describe('Secondary DataSource page', () => {
  let page: SecondaryPage;

  beforeEach(async () => {
    page = new SecondaryPage();
    await page.navigateTo();
  });

  afterEach(async () => {
    await page.expectNoErrorLogs();
  });

  it('should show the page header', async () => {
    expect(await page.getPageHeader()).toBe('Secondary DataSource');
  });

  it('should show the datasource config properties table', async () => {
    expect(await page.getConfigPropsTable().isPresent()).toBe(true);
  });

  it('should save new primary entity', async () => {
    const form = page.getNewEntityForm();

    const name = Math.random().toString(36);

    await form.getNameInput().sendKeys(name);
    await form.getSubmitBtn().click();

    await form.getNameInput().clear();

    // try to create a duplicate with same name
    await form.getNameInput().sendKeys(name);
    await form.getSubmitBtn().click();
    expect(await form.getNameValidationFeedback().isPresent()).toBe(true);
  });

  it('should show saved primary entities', async () => {
    expect(await page.getSavedEntities().isPresent()).toBe(true);
  });

});

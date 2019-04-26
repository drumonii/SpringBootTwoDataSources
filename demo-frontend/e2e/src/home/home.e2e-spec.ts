import { HomePage } from './home.po';

describe('Home page', () => {
  let page: HomePage;

  beforeEach(async () => {
    page = new HomePage();
    await page.navigateTo();
  });

  afterEach(async () => {
    await page.expectNoErrorLogs();
  });

  it('should show the page header', async () => {
    expect(await page.getPageHeader()).toBe('Spring Boot with two DataSources Demonstration Project');
  });

  it('should show the project details', async () => {
    expect(await page.getDetails().isPresent()).toBe(true);
    expect(await page.getSpringBootVersion().isPresent()).toBe(true);
  });

  it('should show the project features list', async () => {
    expect(await page.getFeaturesList().isPresent()).toBe(true);
  });

});

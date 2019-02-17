import { HomePage } from './home.po';

describe('Home page', () => {
  let page: HomePage;

  beforeEach(() => {
    page = new HomePage();
    page.navigateTo();
  });

  afterEach(async () => {
    page.expectNoErrorLogs();
  });

  it('should show the page header', () => {
    expect(page.getPageHeader()).toBe('Spring Boot with two DataSources Demonstration Project');
  });

  it('should show the project details', () => {
    expect(page.getDetails().isPresent()).toBe(true);
    expect(page.getSpringBootVersion().isPresent()).toBe(true);
  });

  it('should show the project features list', () => {
    expect(page.getFeaturesList().isPresent()).toBe(true);
  });

});

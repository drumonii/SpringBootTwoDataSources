import { browser, by, element, logging } from 'protractor';

export class AppPage {

  constructor(private destination: string) {}

  navigateTo(): Promise<any> {
    return browser.get(this.destination) as Promise<any>;
  }

  getPageHeader() {
    return element(by.css('#page-header-text')).getText();
  }

  async expectNoErrorLogs() {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    }));
  }

}

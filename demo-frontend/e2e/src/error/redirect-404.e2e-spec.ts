import { Redirect404Page } from './redirect-404.po';
import { browser } from 'protractor';

describe('redirection to / on 404', () => {
  let page: Redirect404Page;

  beforeEach(async () => {
    page = new Redirect404Page();
    await page.navigateTo();
  });

  it('should redirect to / on invalid route', async () => {
    expect(await browser.getCurrentUrl()).toBe('http://localhost:4201/');
  });

});

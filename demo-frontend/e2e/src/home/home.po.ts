import { by, element, ElementFinder } from 'protractor';

import { AppPage } from '../app.po';

export class HomePage extends AppPage {

  constructor() {
    super('/');
  }

  getDetails(): ElementFinder {
    return element(by.css('#project-details'));
  }

  getSpringBootVersion(): ElementFinder {
    return element(by.css('#spring-boot-version'));
  }

  getFeaturesList(): ElementFinder {
    return element(by.css('#project-features-list'));
  }

}

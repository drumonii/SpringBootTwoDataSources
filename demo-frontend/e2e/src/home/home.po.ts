import { by, element } from 'protractor';

import { AppPage } from '../app.po';

export class HomePage extends AppPage {

  constructor() {
    super('/');
  }

  getDetails() {
    return element(by.css('#project-details'));
  }

  getSpringBootVersion() {
    return element(by.css('#spring-boot-version'));
  }

  getFeaturesList() {
    return element(by.css('#project-features-list'));
  }

}

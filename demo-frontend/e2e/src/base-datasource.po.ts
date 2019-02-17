import { by, element } from 'protractor';

import { AppPage } from './app.po';

class NewEntityForm {

  getNameInput() {
    return element(by.css('#name-input'));
  }

  getNameValidationFeedback() {
    return element(by.css('#name-validation-feedback'));
  }

  getSubmitBtn() {
    return element(by.css('#new-entity-btn'));
  }

}

export class BaseDatasourcePage extends AppPage {

  constructor(destination: string) {
    super(destination);
  }

  getConfigPropsTable() {
    return element(by.css('#config-props-table'));
  }

  getNewEntityForm() {
    return new NewEntityForm();
  }

  getSavedEntities() {
    return element(by.css('#saved-entities-datatable'));
  }

}

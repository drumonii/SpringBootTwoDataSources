import { by, element, ElementFinder } from 'protractor';

import { AppPage } from './app.po';

class NewEntityForm {

  getNameInput(): ElementFinder {
    return element(by.css('#name-input'));
  }

  getNameValidationFeedback(): ElementFinder {
    return element(by.css('#name-validation-feedback'));
  }

  getSubmitBtn(): ElementFinder {
    return element(by.css('#new-entity-btn'));
  }

}

export class BaseDatasourcePage extends AppPage {

  constructor(destination: string) {
    super(destination);
  }

  getConfigPropsTable(): ElementFinder {
    return element(by.css('#config-props-table'));
  }

  getFlywayMigrationsTable(): ElementFinder {
    return element(by.css('#flyway-migrations-table'));
  }

  getNewEntityForm(): NewEntityForm {
    return new NewEntityForm();
  }

  getSavedEntities(): ElementFinder {
    return element(by.css('#saved-entities-datatable'));
  }

}

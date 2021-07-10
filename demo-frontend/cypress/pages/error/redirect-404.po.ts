import { AppPage } from '../app.po';

export class Redirect404Page extends AppPage {

  constructor() {
    super('/does-not-exist');
  }

}

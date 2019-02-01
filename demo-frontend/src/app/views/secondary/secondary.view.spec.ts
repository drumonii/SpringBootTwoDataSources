import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { By } from '@angular/platform-browser';

import { DataSourcePropertiesComponent } from '@components/data-source-properties.component';

import { SecondaryModule } from './secondary.module';
import { SecondaryView } from './secondary.view';
import { SecondaryService } from './secondary.service';

describe('SecondaryView', () => {
  let component: SecondaryView;
  let fixture: ComponentFixture<SecondaryView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SecondaryModule]
    })
    .compileComponents();
  }));

  beforeEach(inject([SecondaryService], (secondaryService: SecondaryService) => {
    fixture = TestBed.createComponent(SecondaryView);
    component = fixture.componentInstance;

    spyOn(secondaryService, 'getSecondaryDataSourceEnv');

    fixture.detectChanges();
  }));

  it('should get the datasource properties', inject([SecondaryService], (secondaryService: SecondaryService) => {
    expect(fixture.debugElement.query(By.directive(DataSourcePropertiesComponent))).toBeTruthy('datasource props component');
    expect(secondaryService.getSecondaryDataSourceEnv).toHaveBeenCalled();
  }));
});

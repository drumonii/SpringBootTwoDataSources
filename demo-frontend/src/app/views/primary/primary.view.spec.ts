import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

import { DataSourcePropertiesComponent } from '@components/data-source-properties.component';

import { PrimaryModule } from './primary.module';
import { PrimaryView } from './primary.view';
import { PrimaryService } from './primary.service';

describe('PrimaryView', () => {
  let component: PrimaryView;
  let fixture: ComponentFixture<PrimaryView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, PrimaryModule]
    })
    .compileComponents();
  }));

  beforeEach(inject([PrimaryService], (primaryService: PrimaryService) => {
    fixture = TestBed.createComponent(PrimaryView);
    component = fixture.componentInstance;

    spyOn(primaryService, 'getPrimaryDataSourceEnv');

    fixture.detectChanges();
  }));

  it('should get the datasource properties', inject([PrimaryService], (primaryService: PrimaryService) => {
    expect(fixture.debugElement.query(By.directive(DataSourcePropertiesComponent))).toBeTruthy('datasource props component');
    expect(primaryService.getPrimaryDataSourceEnv).toHaveBeenCalled();
  }));
});

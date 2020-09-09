import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

import { of } from 'rxjs';

import { DatatableModule } from '@components/datatable.module';
import { DatatableComponent } from '@components/datatable.component';
import { BaseEntity } from '@models/base-entity';

describe('DatatableComponent', () => {
  let component: DatatableComponent;
  let fixture: ComponentFixture<DatatableComponent>;

  const entities: BaseEntity[] = [
    {
      id: 7,
      name: 'Alayna'
    },
    {
      id: 20,
      name: 'Autumn'
    },
    {
      id: 23,
      name: 'Bethel'
    },
    {
      id: 9,
      name: 'Breanne'
    },
    {
      id: 10,
      name: 'Brittney'
    },
    {
      id: 29,
      name: 'Clelia'
    },
    {
      id: 25,
      name: 'Detra'
    },
    {
      id: 17,
      name: 'Doria'
    },
    {
      id: 8,
      name: 'Eleanora'
    },
    {
      id: 15,
      name: 'Emanuel'
    },
    {
      id: 13,
      name: 'Enola'
    },
    {
      id: 4,
      name: 'Eura'
    },
    {
      id: 22,
      name: 'Evelina'
    },
    {
      id: 2,
      name: 'Isidro'
    },
    {
      id: 16,
      name: 'Jani'
    },
    {
      id: 14,
      name: 'Jenette'
    },
    {
      id: 27,
      name: 'Joesph'
    },
    {
      id: 3,
      name: 'Kaitlyn'
    },
    {
      id: 12,
      name: 'Lasonya'
    },
    {
      id: 18,
      name: 'Latina'
    }
  ];

  beforeEach(async ()  => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, DatatableModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatableComponent);
    component = fixture.componentInstance;

    component.data$ = of(entities);
    component.resultsLength = entities.length;
    component.isLoadingResults = false;

    spyOn(component.getDataEvent, 'emit');

    fixture.detectChanges();
  });

  describe('page change', () => {

    it('should emit datatable request', () => {
      const nextPageBtn = fixture.debugElement.query(By.css('.mat-paginator-navigation-next'));
      nextPageBtn.triggerEventHandler('click', null);

      fixture.detectChanges();

      expect(component.getDataEvent.emit).toHaveBeenCalledWith({
        page: 1,
        size: 10,
        sorts: [ 'name,asc' ]
      });
    });

  });

  describe('sort change', () => {

    xit('should emit datatable request', () => {
      const sortBtn = fixture.debugElement.query(By.css('.mat-sort-header-button')); // TODO: not sure why this doesn't exist in the test
      sortBtn.triggerEventHandler('click', null);

      fixture.detectChanges();

      expect(component.getDataEvent.emit).toHaveBeenCalledWith({
        page: 0,
        size: 10,
        sorts: [ 'name,desc' ]
      });
    });

  });

});

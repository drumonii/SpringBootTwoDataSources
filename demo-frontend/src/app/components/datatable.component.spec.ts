import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { DatatableModule } from '@components/datatable.module';
import { DatatableComponent } from '@components/datatable.component';

describe('DatatableComponent', () => {
  let component: DatatableComponent;
  let fixture: ComponentFixture<DatatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, DatatableModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatableComponent);
    component = fixture.componentInstance;

    spyOn(component.getDataEvent, 'emit');
  });

  describe('page change', () => {

    it('should emit datatable request', () => {
      component.paginator.pageIndex = 1;

      component.paginator.page.subscribe(pageEvent => {
        expect(component.getDataEvent.emit).toHaveBeenCalledWith({
          page: pageEvent.pageIndex,
          size: pageEvent.pageSize,
          sorts: [ 'name,asc' ]
        });
      });
    });

  });

  describe('sort change', () => {

    it('should emit datatable request', () => {
      component.sort.direction = 'desc';

      component.sort.sortChange.subscribe(sort => {
        expect(component.getDataEvent.emit).toHaveBeenCalledWith({
          page: 1,
          size: 10,
          sorts: [ `${sort.active},${sort.directioon}` ]
        });
      });
    });

  });

});

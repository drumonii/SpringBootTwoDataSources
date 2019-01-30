import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryModule } from './primary.module';
import { PrimaryView } from './primary.view';

describe('PrimaryComponent', () => {
  let component: PrimaryView;
  let fixture: ComponentFixture<PrimaryView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PrimaryModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimaryView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

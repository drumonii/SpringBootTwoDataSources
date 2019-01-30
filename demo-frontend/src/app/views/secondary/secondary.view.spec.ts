import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryModule } from './secondary.module';
import { SecondaryView } from './secondary.view';

describe('SecondaryComponent', () => {
  let component: SecondaryView;
  let fixture: ComponentFixture<SecondaryView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SecondaryModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondaryView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

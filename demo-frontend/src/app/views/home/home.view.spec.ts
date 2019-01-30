import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeModule } from './home.module';
import { HomeView } from './home.view';

describe('HomeComponent', () => {
  let component: HomeView;
  let fixture: ComponentFixture<HomeView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HomeModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

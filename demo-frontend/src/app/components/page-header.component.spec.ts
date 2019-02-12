import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PageHeaderModule } from '@components/page-header.module';
import { PageHeaderComponent } from '@components/page-header.component';

describe('ViewHeaderComponent', () => {
  let component: PageHeaderComponent;
  let fixture: ComponentFixture<PageHeaderComponent>;

  const pageHeader = 'Hello World!';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PageHeaderModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageHeaderComponent);
    component = fixture.componentInstance;

    component.pageHeader = pageHeader;

    fixture.detectChanges();
  });

  it('should show the page header', () => {
    const pageHeaderText = fixture.debugElement.query(By.css('.page-header h1'));
    expect(pageHeaderText.nativeElement.textContent.trim()).toBe(pageHeader);
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterLinkWithHref } from '@angular/router';
import { By } from '@angular/platform-browser';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should show the header links', () => {
    const homeLink = fixture.debugElement.query(By.css('#home-link'));
    expect(homeLink.nativeElement.textContent.trim()).toBe('Spring Boot Two DataSources');
    expect(homeLink.injector.get(RouterLinkWithHref).href).toBe('/');

    const primaryLink = fixture.debugElement.query(By.css('#primary-link'));
    expect(primaryLink.nativeElement.textContent.trim()).toBe('Primary');
    expect(primaryLink.injector.get(RouterLinkWithHref).href).toBe('/primary');

    const secondaryLink = fixture.debugElement.query(By.css('#secondary-link'));
    expect(secondaryLink.nativeElement.textContent.trim()).toBe('Secondary');
    expect(secondaryLink.injector.get(RouterLinkWithHref).href).toBe('/secondary');
  });
});

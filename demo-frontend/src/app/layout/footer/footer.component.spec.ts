import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show the GitHub link', () => {
    const gitHubLink = fixture.debugElement.query(By.css('#github-link'));
    expect(gitHubLink.nativeElement.textContent.trim()).withContext('GitHub link text').toBe('GitHub');
    expect(gitHubLink.nativeElement.href).withContext('GitHub href').toBe('https://github.com/drumonii/SpringBootTwoDataSources');
  });
});

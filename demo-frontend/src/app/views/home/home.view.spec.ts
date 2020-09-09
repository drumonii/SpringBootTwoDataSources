import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

import { of } from 'rxjs';

import { PageHeaderComponent } from '@components/page-header.component';

import { HomeModule } from './home.module';
import { HomeView } from './home.view';
import { HomeService } from './home.service';

describe('HomeComponent', () => {
  let component: HomeView;
  let fixture: ComponentFixture<HomeView>;

  const springBootVersion = '2.1.2.RELEASE';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HomeModule]
    })
    .compileComponents();
  });

  beforeEach(inject([HomeService], (homeService: HomeService) => {
    fixture = TestBed.createComponent(HomeView);
    component = fixture.componentInstance;

    spyOn(homeService, 'getSpringBootVersion').and.returnValue(of(springBootVersion));

    fixture.detectChanges();
  }));

  it('should show demo project overview', () => {
    const projectOverview = fixture.debugElement.query(By.directive(PageHeaderComponent));
    const projectOverviewHeader = projectOverview.injector.get(PageHeaderComponent);
    expect(projectOverviewHeader.pageHeader)
      .toBe('Spring Boot with two DataSources Demonstration Project', 'project overview text');

    const projectDetails = fixture.debugElement.query(By.css('#project-details'));
    expect(projectDetails.nativeElement.textContent.trim())
      .toBe(`This project demonstrates how to use two DataSources with Spring Boot ${springBootVersion}`, 'project overview details');

    const projectFeaturesList = fixture.debugElement.query(By.css('#project-features-list'));
    expect(projectFeaturesList).toBeTruthy('project features list');
    expect(projectFeaturesList.children.length).toBe(4, 'number of project features list items');
  });
});

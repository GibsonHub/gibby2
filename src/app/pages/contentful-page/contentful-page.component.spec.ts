import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentfulPageComponent } from './contentful-page.component';

describe('ContentfulPageComponent', () => {
  let component: ContentfulPageComponent;
  let fixture: ComponentFixture<ContentfulPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentfulPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentfulPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

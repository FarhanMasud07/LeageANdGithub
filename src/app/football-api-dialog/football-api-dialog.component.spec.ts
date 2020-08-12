import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballApiDialogComponent } from './football-api-dialog.component';

describe('FootballApiDialogComponent', () => {
  let component: FootballApiDialogComponent;
  let fixture: ComponentFixture<FootballApiDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootballApiDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballApiDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

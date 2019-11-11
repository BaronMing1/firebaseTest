import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectionCardListComponent } from './direction-card-list.component';

describe('DirectionCardListComponent', () => {
  let component: DirectionCardListComponent;
  let fixture: ComponentFixture<DirectionCardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectionCardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectionCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

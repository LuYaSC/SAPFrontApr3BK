import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSapgComponent } from './dashboard-sapg.component';

describe('DashboardSapgComponent', () => {
  let component: DashboardSapgComponent;
  let fixture: ComponentFixture<DashboardSapgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardSapgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardSapgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

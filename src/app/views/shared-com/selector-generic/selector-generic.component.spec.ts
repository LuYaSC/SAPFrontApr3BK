import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorGenericComponent } from './selector-generic.component';

describe('SelectorGenericComponent', () => {
  let component: SelectorGenericComponent;
  let fixture: ComponentFixture<SelectorGenericComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectorGenericComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectorGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

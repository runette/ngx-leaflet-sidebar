import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSidebarControlComponent } from './ngx-sidebar-control.component';

describe('NgxSidebarControlComponent', () => {
  let component: NgxSidebarControlComponent;
  let fixture: ComponentFixture<NgxSidebarControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxSidebarControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSidebarControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

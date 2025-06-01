import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDetalleComponent } from './menu-detalle.component';

describe('MenuDetalleComponent', () => {
  let component: MenuDetalleComponent;
  let fixture: ComponentFixture<MenuDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

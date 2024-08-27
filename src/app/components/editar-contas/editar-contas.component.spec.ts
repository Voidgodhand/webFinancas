import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarContasComponent } from './editar-contas.component';

describe('EditarContasComponent', () => {
  let component: EditarContasComponent;
  let fixture: ComponentFixture<EditarContasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarContasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarContasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

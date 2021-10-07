import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProizvodListaComponent } from './proizvod-lista.component';

describe('ProizvodListaComponent', () => {
  let component: ProizvodListaComponent;
  let fixture: ComponentFixture<ProizvodListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProizvodListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProizvodListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

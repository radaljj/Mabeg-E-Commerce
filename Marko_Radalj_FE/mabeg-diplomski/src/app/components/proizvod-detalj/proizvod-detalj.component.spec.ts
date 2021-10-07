import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProizvodDetaljComponent } from './proizvod-detalj.component';

describe('ProizvodDetaljComponent', () => {
  let component: ProizvodDetaljComponent;
  let fixture: ComponentFixture<ProizvodDetaljComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProizvodDetaljComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProizvodDetaljComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

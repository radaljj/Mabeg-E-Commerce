import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProizvodKategorijaMeniComponent } from './proizvod-kategorija-meni.component';

describe('ProizvodKategorijaMeniComponent', () => {
  let component: ProizvodKategorijaMeniComponent;
  let fixture: ComponentFixture<ProizvodKategorijaMeniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProizvodKategorijaMeniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProizvodKategorijaMeniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

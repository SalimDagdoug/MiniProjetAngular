import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProduitComponent } from './update-produit.component';

describe('UpdateProduitComponent', () => {
  let component: UpdateProduitComponent;
  let fixture: ComponentFixture<UpdateProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateProduitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollecteFormComponent } from './collecte-form.component';

describe('CollecteFormComponent', () => {
  let component: CollecteFormComponent;
  let fixture: ComponentFixture<CollecteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollecteFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollecteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

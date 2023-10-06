import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesMovieComponent } from './detalles-movie.component';

describe('DetallesMovieComponent', () => {
  let component: DetallesMovieComponent;
  let fixture: ComponentFixture<DetallesMovieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetallesMovieComponent]
    });
    fixture = TestBed.createComponent(DetallesMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

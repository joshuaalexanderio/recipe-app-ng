import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDrawer } from './recipe-drawer';

describe('RecipeDrawer', () => {
  let component: RecipeDrawer;
  let fixture: ComponentFixture<RecipeDrawer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeDrawer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeDrawer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

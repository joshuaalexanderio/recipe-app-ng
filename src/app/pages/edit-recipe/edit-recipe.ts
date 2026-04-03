import { Component, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RecipeApi } from '../../services/recipe-api';
import { Recipe } from '../../models/recipe';
import { LucideAngularModule, X } from 'lucide-angular';

@Component({
  selector: 'app-edit-recipe',
  imports: [FormsModule, LucideAngularModule],
  templateUrl: './edit-recipe.html',
  styleUrl: '../add-recipe/add-recipe.scss',
})
export class EditRecipe implements OnInit {
  isLoading = signal(true);
  recipe = signal<Recipe>({
    id: 0, name: '', description: '', recipeUrl: '', favorite: false, recipeIngredients: []
  });

  constructor(
    private recipeApi: RecipeApi,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.recipeApi.fetchRecipe(id).subscribe({
      next: (recipe) => {
        this.recipe.set(recipe);
        this.isLoading.set(false);
      },
      error: () => this.router.navigate(['/'])
    });
  }

  cancel() {
    this.router.navigate(['/']);
  }

  saveRecipe(recipe: Recipe) {
    this.recipeApi.updateRecipe(recipe).subscribe({
      next: () => this.router.navigate(['/'])
    });
  }

  deleteIngredient(index: number) {
    this.recipe.update(current => ({
      ...current,
      recipeIngredients: current.recipeIngredients
        .filter((_, i) => i !== index)
        .map((ingredient, i) => ({ ...ingredient, orderIndex: i }))
    }));
  }

  addIngredient() {
    this.recipe.update(current => ({
      ...current,
      recipeIngredients: [
        ...current.recipeIngredients,
        { id: 0, name: '', quantity: '', unit: '', orderIndex: current.recipeIngredients.length, recipe: current }
      ]
    }));
  }

  protected readonly X = X;
}

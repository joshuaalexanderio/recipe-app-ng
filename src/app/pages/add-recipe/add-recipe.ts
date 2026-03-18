import {Component, signal, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {RecipeApi} from '../../services/recipe-api';
import {Recipe} from '../../models/recipe';
import {LucideAngularModule, Trash2, X} from 'lucide-angular';

@Component({
  selector: 'app-add-recipe',
  imports: [FormsModule, LucideAngularModule],
  templateUrl: './add-recipe.html',
  styleUrl: './add-recipe.scss',
})
export class AddRecipe implements OnInit {
  recipeUrl = signal('');
  isLoading = signal(false);
  recipe = signal<Recipe>({
    id: 0,
    name: '',
    description: '',
    recipeUrl: '',
    favorite: false,
    recipeIngredients: [],
    user: {
      id: 1,
      name: "",
      email: ""
    }
  });

  constructor(
    private recipeApi: RecipeApi,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  importFromUrl() {
    if (!this.recipeUrl()) return;

    this.isLoading.set(true);
    this.recipeApi.importRecipe(this.recipeUrl()).subscribe({
      next: (importedRecipe) => {
        const currentUser = this.recipe().user;
        this.recipe.set({
          ...importedRecipe,
          user: currentUser
        });
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Import failed:', err);
        this.isLoading.set(false);
      }
    });
  }

  cancel() {
    this.router.navigate(['/']);
  }

  saveRecipe(recipe: Recipe) {
    this.recipeApi.saveRecipe(recipe).subscribe({
      next: (recipe) => {
        this.router.navigate(['/']);
      }
    })
  }

  deleteIngredient(index: number) {
    this.recipe.update(current => ({
      ...current,
      recipeIngredients: current.recipeIngredients
      .filter((_, i) => i !== index)
      .map((ingredient, i) => ({
        ...ingredient,
        orderIndex: i  // Reindex after deletion
      }))
    }));
  }

  addIngredient() {
    this.recipe.update(current => {
      const newOrderIndex = current.recipeIngredients.length;
      return {
        ...current,
        recipeIngredients: [
          ...current.recipeIngredients,
          {
            id: 0,  // Backend will assign on save
            name: '',
            quantity: '',
            unit: '',
            orderIndex: newOrderIndex,
            recipe: current
          }
        ]
      };
    });
  }

  protected readonly X = X;
  protected readonly Trash2 = Trash2;
}

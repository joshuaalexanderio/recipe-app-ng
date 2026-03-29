import {Component, computed, OnInit, signal} from '@angular/core';
import { RecipeCard} from '../recipe-card/recipe-card';
import { RecipeApi } from '../../services/recipe-api';
import {Recipe} from '../../models/recipe';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {NgClass} from '@angular/common';
import {RecipeDrawerComponent} from '../../recipe-drawer/recipe-drawer';

@Component({
  selector: 'app-recipe-list',
  imports: [RecipeCard, DragDropModule, NgClass, RecipeDrawerComponent],
  templateUrl: './recipe-list.html',
  standalone: true,
})
export class RecipeList implements OnInit {

  selectedRecipe = signal<Recipe | null>(null);

  onRecipeSelected(recipe: Recipe) {
    const current = this.selectedRecipe();
    this.selectedRecipe.set(current?.id === recipe.id ? null : recipe);
  }
  
  closeDrawer() {
    this.selectedRecipe.set(null);
  }
  recipes = signal<Recipe[]>([]);

  sortedRecipes = computed(() => {
    return [...this.recipes()].sort((a, b) => {
      // Favorites first (true > false)
      if (a.favorite && !b.favorite) return -1;
      if (!a.favorite && b.favorite) return 1;
      return a.name.localeCompare(b.name);
    });
  });
  handleFavoriteToggled(updatedRecipe: Recipe) {
    this.recipes.update(recipes =>
      recipes.map(r => r.id === updatedRecipe.id ? updatedRecipe : r)
    );
  }
  handleRecipeDeleted(recipeId: number) {
    // Replace recipes list with all except deleted recipe
    this.recipes.update(recipes =>
      recipes.filter(r => r.id !== recipeId)
    );
  }
  handleRecipeIngredientDeleted(recipeId: number, recipeIngredientId: number) {
    this.recipeApi.deleteRecipeIngredient(recipeIngredientId).subscribe(() => {
      this.recipes.update(recipes =>
        this.removeIngredientFromRecipe(recipes, recipeId, recipeIngredientId)
      );
      this.selectedRecipe.update(r =>
        r?.id === recipeId ? (this.recipes().find(r => r.id === recipeId) ?? null) : r
      );
    });
  }
  private removeIngredientFromRecipe(recipes: Recipe[], recipeId: number, ingredientId: number): Recipe[] {
    return recipes.map(recipe => {
      if (recipe.id !== recipeId) return recipe;

      return {
        ...recipe,
        recipeIngredients: recipe.recipeIngredients.filter(ri => ri.id !== ingredientId)
      };
    });
  }

  constructor(private recipeApi: RecipeApi) {}

  ngOnInit() {
    console.log("Initialized")
    this.recipeApi.fetchRecipes().subscribe({
      next: (recipes) => {
        console.log("recipes loaded: ", recipes);
        this.recipes.set(recipes);
      },
      error: (err) => {
        console.error("Error loading recipes:", err);
      }
    });
  }

}

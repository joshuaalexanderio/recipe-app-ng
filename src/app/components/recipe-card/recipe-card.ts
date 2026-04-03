import {Recipe} from '../../models/recipe';
import {Component, EventEmitter, inject, Input, OnInit, Output, signal} from '@angular/core';
import {
  LucideAngularModule,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Star,
  Trash2,
  Pencil,
  ChevronLeft
} from 'lucide-angular';
import {RecipeApi} from '../../services/recipe-api';
import {RecipeIngredient} from '../../models/recipeIngredient';
import {TodoistStore} from '../../stores/todoist.store';
import {Router} from '@angular/router';
@Component({
  selector: 'app-recipe-card',
  imports: [LucideAngularModule],
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.css',
})
export class RecipeCard implements OnInit {
  @Input() recipe!: Recipe;
  @Input() active = false;
  @Output() recipeSelected = new EventEmitter<Recipe>();
  @Output() favoriteToggled = new EventEmitter<Recipe>();
  @Output() recipeDeleted = new EventEmitter<number>();
  @Output() recipeIngredientDeleted = new EventEmitter<RecipeIngredient>();

  readonly ChevronDown = ChevronDown;
  readonly ChevronUp = ChevronUp;
  readonly ChevronRight = ChevronRight;
  readonly Star = Star;
  constructor(private recipeApiService: RecipeApi, private router: Router) {}
  private todoistStore = inject(TodoistStore);

  isExpanded = signal(false);
  selectedIngredients = signal<Set<number>>(new Set());

  isFavorite = signal<boolean>(false);

  editRecipe() {
    this.router.navigate(['/edit', this.recipe.id]);
  }

  toggleFavorite() {
    const newFavoriteStatus = !this.isFavorite();
    this.isFavorite.set(newFavoriteStatus);

    this.recipeApiService.updateFavorite(this.recipe.id, newFavoriteStatus)
      .subscribe({
        next: (updatedRecipe) => {
          this.recipe = updatedRecipe;
          this.favoriteToggled.emit(updatedRecipe);
          console.log('Favorite updated successfully');
        },
        error: (err) => {
          this.isFavorite.set(!newFavoriteStatus); // Rollback on error
          console.error('Failed to update favorite:', err);
        }
      });
  }

  deleteRecipe() {
    if (confirm('Are you sure you want to delete this recipe?')) {
      this.recipeApiService.deleteRecipe(this.recipe.id)
      .subscribe({
        next: () => {
          console.log("Recipe deleted successfully");
          this.recipeDeleted.emit(this.recipe.id);
        },
        error: (err) => {
          console.error('Failed to delete recipe:', err);
        }
      });
    }

  }

  deleteRecipeIngredient(recipeIngredientId: number) {
    const ingredient = this.recipe.recipeIngredients.find(ri => ri.id === recipeIngredientId);

    if (ingredient) {
      this.recipeApiService.deleteRecipeIngredient(recipeIngredientId).subscribe({
        next: () => {
          console.log("Recipe ingredient deleted successfully");
          this.recipeIngredientDeleted.emit(ingredient);
        },
        error: (err) => {
          console.error('Failed to delete recipe ingredient:', err);
        }
      });
    }
  }
  toggleIngredientSelection(id: number) {
    const current = new Set(this.selectedIngredients());
    if (current.has(id)) {
      current.delete(id);
    } else {
      current.add(id);
    }
    this.selectedIngredients.set(current);
  }

  ngOnInit() {
    this.isFavorite.set(this.recipe.favorite);
    console.log('Recipe card ngOnInit:', this.recipe);
  }

  protected readonly Trash2 = Trash2;
  protected readonly Pencil = Pencil;
  protected readonly ChevronLeft = ChevronLeft;
}

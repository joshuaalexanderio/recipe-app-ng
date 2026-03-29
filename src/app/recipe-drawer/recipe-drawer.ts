import { Component, Input, Output, EventEmitter, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../models/recipe';
import { RecipeIngredient } from '../models/recipeIngredient';
import { TodoistStore } from '../stores/todoist.store';
import { LucideAngularModule, Trash2 } from 'lucide-angular';

@Component({
  selector: 'app-recipe-drawer',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './recipe-drawer.html',
  styleUrl: './recipe-drawer.scss'
})
export class RecipeDrawerComponent {
  @Input({ required: true }) recipe!: Recipe;
  @Output() closed = new EventEmitter<void>();
  @Output() ingredientDeleted = new EventEmitter<number>();

  protected todoistStore = inject(TodoistStore);

  readonly Trash2 = Trash2;

  readonly loading = this.todoistStore.loading;
  readonly error = this.todoistStore.error;
  connected = this.todoistStore.connected;
  projects = this.todoistStore.projects;
  selectedProjectId = this.todoistStore.selectedProjectId;

  checkedIds = signal<Set<number>>(new Set());

  selectedIngredients = computed(() =>
    this.recipe.recipeIngredients.filter(i => this.checkedIds().has(i.id))
  );

  selectProject(projectId: string) {
    this.todoistStore.setSelectedProject(projectId);
  }

  toggleCheck(id: number) {
    this.checkedIds.update(set => {
      const next = new Set(set);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  isChecked(id: number): boolean {
    return this.checkedIds().has(id);
  }

  formatIngredient(ingredient: RecipeIngredient): string {
    return [ingredient.quantity, ingredient.unit, ingredient.name]
    .filter(Boolean)
    .join(' ');
  }

  sendAllToTodoist() {
    const ids = this.recipe.recipeIngredients.map(i => i.id);
    this.todoistStore.sendToShoppingList(
      this.recipe.id,
      ids,
      this.todoistStore.selectedProjectId()
    );
  }

  sendSelectedToTodoist() {
    const ids = Array.from(this.checkedIds());
    if (ids.length > 0) {
      this.todoistStore.sendToShoppingList(
        this.recipe.id,
        ids,
        this.todoistStore.selectedProjectId()
      );
    }
  }
}

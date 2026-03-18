import { Routes } from '@angular/router';
import { RecipeList } from './components/recipe-list/recipe-list';
import { AddRecipe } from './pages/add-recipe/add-recipe';

export const routes: Routes = [
  { title: 'Recipe Raccoon', path: '', component: RecipeList },
  { title: 'Add recipe', path: 'add', component: AddRecipe },
];

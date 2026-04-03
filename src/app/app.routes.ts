import { Routes } from '@angular/router';
import { RecipeList } from './components/recipe-list/recipe-list';
import { AddRecipe } from './pages/add-recipe/add-recipe';
import { EditRecipe } from './pages/edit-recipe/edit-recipe';
import { Login } from './pages/login/login';
import { authGuard, noAuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', title: 'Login', component: Login, canActivate: [noAuthGuard] },
  { path: '', title: 'Recipe Raccoon', component: RecipeList, canActivate: [authGuard] },
  { path: 'add', title: 'Add recipe', component: AddRecipe, canActivate: [authGuard] },
  { path: 'edit/:id', title: 'Edit recipe', component: EditRecipe, canActivate: [authGuard] },
];

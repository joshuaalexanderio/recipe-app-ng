import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RecipeApi {
  private readonly apiUrl = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) {}

  fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl}/recipes`);
  }

  fetchRecipe(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.apiUrl}/recipes/${id}`);
  }

  updateFavorite(recipeId: number, isFavorite: boolean): Observable<Recipe> {
    return this.http.put<Recipe>(`${this.apiUrl}/recipes/${recipeId}`, { favorite: isFavorite });
  }

  importRecipe(recipeURL: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.apiUrl}/recipes/import?recipeURL=${recipeURL}`);
  }

  saveRecipe(recipe: Recipe) {
    return this.http.post<Recipe>(`${this.apiUrl}/recipes`, recipe);
  }

  deleteRecipe(recipeID: number) {
    return this.http.delete(`${this.apiUrl}/recipes/${recipeID}`);
  }

  deleteAllRecipes(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/recipes`);
  }

  updateRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.put<Recipe>(`${this.apiUrl}/recipes/${recipe.id}`, recipe);
  }

  deleteRecipeIngredient(recipeIngredientId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/recipeIngredients/${recipeIngredientId}`);
  }
}

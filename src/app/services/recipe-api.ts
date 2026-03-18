import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeApi {
  private readonly apiUrl = 'http://localhost:8080/api';
  private getAuthHeaders() {
    return {
      'Authorization': 'Basic ' + btoa('user:password')
    };
  }

  constructor(private http: HttpClient) {}

  fetchRecipes(): Observable<Recipe[]> {
    const headers = {
      'Authorization': 'Basic ' + btoa('user:password')
    };
    return this.http.get<Recipe[]>(
      `${this.apiUrl}/recipes`,
      { headers }
    );
  }

  updateFavorite(recipeId: number, isFavorite: boolean): Observable<Recipe> {
    return this.http.put<Recipe>(
      `${this.apiUrl}/recipes/${recipeId}`,
      { favorite: isFavorite },
      { headers: this.getAuthHeaders() }
    );
  }

  importRecipe(recipeURL: string): Observable<Recipe> {
    return this.http.get<Recipe>(
      `${this.apiUrl}/recipes/import?recipeURL=${recipeURL}`,
      { headers: this.getAuthHeaders() }
    )
  }

  saveRecipe(recipe: Recipe) {
    return this.http.post<Recipe>(
      `${this.apiUrl}/recipes`,
      recipe,
      { headers: this.getAuthHeaders() }
    )
  }
  deleteRecipe(recipeID: number) {
    return this.http.delete(
      `${this.apiUrl}/recipes/${recipeID}`,
      { headers: this.getAuthHeaders() }
    )
  }
  deleteAllRecipes(): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/recipes`,
      { headers: this.getAuthHeaders() }
    );
  }
  deleteRecipeIngredient(recipeIngredientId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/recipeIngredients/${recipeIngredientId}`,
      { headers: this.getAuthHeaders() }
    );
  }
}

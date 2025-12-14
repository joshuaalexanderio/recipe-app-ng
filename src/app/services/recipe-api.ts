import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Recipe} from '../models/recipe';
@Injectable({
  providedIn: 'root',
})
export class RecipeApi {
  constructor(private http: HttpClient) {
  }

  fetchRecipes(): Observable<Recipe[]> {
    const headers = {
      'Authorization': 'Basic ' + btoa('user:password')
    };

    return this.http.get<Recipe[]>('http://localhost:8080/api/recipes', {headers});
  }
}
